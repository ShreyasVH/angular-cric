import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDetails } from '../../../endpoints/players';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
    selector: 'app-player-details',
    templateUrl: './details.component.html',
    imports: [CommonModule, MatCardModule, BaseChartDirective]
})
export class PlayerDetailsComponent {

    loaded = signal<boolean>(false);
    details = signal<any>({});

    async ngOnInit(): Promise<void> {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlSearchParams.get('id') ?? '0', 10);
        console.log(id);

        const playerDetailsResponse = await getDetails(id);
        this.details.set(playerDetailsResponse.data.data);

        this.loaded.set(true);
    }

    getBattingGameTypes = () => {
        return Object.keys(this.details().battingStats);
    }

    getDismissalModeGameTypes = () => {
        return Object.keys(this.details().dismissalStats);
    }

    getChartOptions = (gameType: any): ChartConfiguration<'doughnut'>['options'] => ({
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            title: {
                display: true,
                text: gameType,
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    });

    formatDismissalStatsForRender = (stats: any): any => {
        const colorMap: any = {
            Bowled: {
                backgroundColor: '#a6cee3'
            },
            Caught: {
                backgroundColor: '#1f78b4'
            },
            LBW: {
                backgroundColor: '#b2df8a'
            },
            'Run Out': {
                backgroundColor: '#33a02c'
            },
            Stumped: {
                backgroundColor: '#fb9a99'
            },
            'Hit Twice': {
                backgroundColor: '#e31a1c'
            },
            'Hit Wicket': {
                backgroundColor: '#fdbf6f'
            },
            'Obstructing the Field': {
                backgroundColor: '#ff7f00'
            },
            'Timed Out': {
                backgroundColor: '#cab2d6'
            },
            'Handled the Ball': {
                backgroundColor: '#6a3d9a'
            }
        };

        let labels: any[] = [];
        let data: any[] = [];
        let backgroundColors: any[] = [];
        let hoverBackgroundColors: any[] = [];
        for (const [dismissal, count] of Object.entries(stats)) {
            labels.push(dismissal);
            data.push(count);
            backgroundColors.push(colorMap[dismissal].backgroundColor);
            hoverBackgroundColors.push(colorMap[dismissal].hoverBackgroundColor);
        }

        return (
            {
                labels,
                datasets: [
                    {
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: hoverBackgroundColors,
                        data
                    }
                ]
            }
        );
    }

    public column1Fields: any[] = [
        {
            key: 'innings',
            displayName: 'Innings'
        },
        {
            key: 'runs',
            displayName: 'Runs'
        },
        {
            key: 'balls',
            displayName: 'Balls'
        },
        {
            key: 'average',
            displayName: 'Average'
        },
        {
            key: 'strikeRate',
            displayName: 'Strike Rate'
        },
        {
            key: 'notOuts',
            displayName: 'Not Outs'
        },
        {
            key: 'highest',
            displayName: 'Highest'
        }
    ];

    public column2Fields: any = [
        {
            key: 'catches',
            displayName: 'Catches',
            statsType: 'fieldingStats'
        },
        {
            key: 'wickets',
            displayName: 'Wickets',
            statsType: 'bowlingStats'
        },
        {
            key: 'balls',
            displayName: 'Balls',
            statsType: 'bowlingStats'
        },
        {
            key: 'runs',
            displayName: 'Runs',
            statsType: 'bowlingStats'
        },
        {
            key: 'fifers',
            displayName: 'Fifers',
            statsType: 'bowlingStats'
        },
        {
            key: 'economy',
            displayName: 'Economy',
            statsType: 'bowlingStats'
        }
    ];

    formatValue = (value: any, field: any): any => {
        let formattedValue;

        switch (field) {
            case 'average':
            case 'strikeRate':
                formattedValue = value !== null ? value.toFixed(2) : '-';
                break;
            case 'economy':
                formattedValue = value !== null ? value.toFixed(2) : '-';
                break
            default:
                formattedValue = value;
        }

        return formattedValue;
    };

    getWrappedValue = (details: any, statType: any, gameType: any, key: any): any => {
        let value = '-';

        if(details.hasOwnProperty(statType) && details[statType].hasOwnProperty(gameType) && details[statType][gameType].hasOwnProperty(key)) {
            value = this.formatValue(details[statType][gameType][key], key);
        }

        return value;
    };

    getDateOfBirth = (dateOfBirthString: any): string => {
        const dateOfBirth = new Date(dateOfBirthString);
        return ("0" + dateOfBirth.getDate()).slice(-2) + '/' + ("0" + (dateOfBirth.getMonth() + 1)).slice(-2) + '/' + dateOfBirth.getFullYear();
    };

}