import { Component } from '@angular/core';
import { formatDateTimeString } from '../../../utils';
import { getById } from '../../../endpoints/series'
import {Router} from "@angular/router";

@Component({
    selector: 'app-series-detail',
    templateUrl: './detail.component.html'
})
export class SeriesDetailComponent {
    constructor(private router: Router) { }

    series: any = {}
    loaded: boolean = false

    async ngOnInit(): Promise<void> {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlSearchParams.get('id') ?? '0', 10);
        const seriesResponse = await getById(id);
        this.series = seriesResponse.data.data;
        this.loaded = true;
    }

    getFormattedDate(dateTimeString: string): string {
        return formatDateTimeString(dateTimeString);
    }

    renderWinner(match: any): string {
        let result = '';

        if (match.winner) {
            result += match.winner.name + " won";

            if (match.winMarginType) {
                result += " by " + match.winMargin + " " + this.getWinMargin(match.winMargin, match.winMarginType.name);
            }

            if ('Super Over' === match.resultType.name) {
                result += ' (Super Over)';
            }
        } else {
            if (match.resultType.name === 'Tie') {
                result = 'Match Tied';
            } else if(match.resultType.name === 'Draw') {
                result = 'Match Drawn';
            } else if(match.resultType.name === 'Washed Out') {
                result = 'Match Washed Out';
            }
        }

        return result;
    }

    getWinMargin(winMargin: number, winMarginType: string): string {
        let margin = winMarginType.toLowerCase();

        if (winMargin > 1) {
            margin += 's';
        }

        return margin;
    }

    renderStadiumDetails(stadium: any): string {
        return stadium.name + ', ' + stadium.country.name;
    }

    handleMatchClick(id: number) {
        this.router.navigate(['/matches/detail'], { queryParams: { id: id } });
    }
}
