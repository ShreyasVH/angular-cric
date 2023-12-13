import { Component } from '@angular/core';
import { formatDateTimeString } from '../../../utils';
import { getMatch } from '../../../endpoints/matches'
import {Router} from "@angular/router";

@Component({
    selector: 'app-match-detail',
    templateUrl: './detail.component.html'
})
export class MatchDetailComponent {
    constructor(private router: Router) { }

    match: any = {}
    loaded: boolean = false
    scoreColumns: any = ['Batsman', 'Dismissal', 'Runs', 'Balls', 'Fours', 'Sixes']
    figureColumns: any = ['Bowler', 'Overs', 'Maidens', 'Runs', 'Wickets']

    async ngOnInit(): Promise<void> {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlSearchParams.get('id') ?? '0', 10);
        const matchResponse = await getMatch(id);
        this.match = matchResponse.data.data;
        this.loaded = true;
    }

    handleSeriesClick(id: number) {
        this.router.navigate(['/series/detail'], { queryParams: { id: id } });
    }

    handlePlayerClick(playerId: number) {
        console.log(playerId);
    }

    getTeams() {
        return [
            this.match.team1,
            this.match.team2
        ];
    }

    getTossMarkup() {
        let markup = 'NA';

        if (this.match.tossWinner) {
            markup = this.match.tossWinner.name + ' won the toss and chose to ' + ((this.match.tossWinner.id === this.match.batFirst.id) ? 'bat' : 'bowl');
        }
        return markup;
    }

    getWinMargin(winMargin: number, winMarginType: string) {
        let margin = winMarginType.toLowerCase();

        if (winMargin > 1) {
            margin += 's';
        }

        return margin;
    }

    getResultMarkup() {
        let result = '';

        if (this.match.winner) {
            result += this.match.winner.name + " won";

            if (this.match.winMarginType) {
                result += " by " + this.match.winMargin + " " + this.getWinMargin(this.match.winMargin, this.match.winMarginType.name);
            }

            if ('Super Over' === this.match.resultType.name) {
                result += ' (Super Over)';
            }
        } else {
            if (this.match.resultType.name === 'Tie') {
                result = 'Match Tied';
            } else if(this.match.resultType.name === 'Draw') {
                result = 'Match Drawn';
            } else if(this.match.resultType.name === 'Washed Out') {
                result = 'Match Washed Out';
            }
        }
        return result;
    }

    getMatchStartTime () {
        let date = new Date(this.match.startTime);
        let options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return date.toLocaleDateString('en-GB', options);
    }

    getPlayerLabel(currentPlayer: any) {
        let text = currentPlayer.name;

        let roles = [];

        let isCaptain = false;
        for (const player of this.match.captains) {
            if (currentPlayer.id === player.id) {
                isCaptain = true;
                break;
            }
        }

        if (isCaptain) {
            roles.push('c');
        }

        let isWicketKeeper = false;
        for (const player of this.match.wicketKeepers) {
            if (currentPlayer.id === player.id) {
                isWicketKeeper = true;
                break;
            }
        }

        if (isWicketKeeper) {
            roles.push('wk');
        }

        if (roles.length > 0) {
            text += ' ( ' + roles.join(' & ') + ' ) ';
        }

        return text;
    }

    getInningsTitle (innings: number, gameType: string) {
        const teamName = this.getPlayerTeam(this.match.battingScores.filter((score: any) => score.innings === innings)[0].player.id).name;
        return teamName + ' Innings' + ((gameType === 'Test') ? ' ' + (Math.round(innings / 2)) : '');
    }

    getPlayerTeam(playerId: number): any {
        const teamMap = {
            [this.match.team1.id]: this.match.team1,
            [this.match.team2.id]: this.match.team2
        };

        let team = {};

        for (const [teamId, players] of Object.entries(this.match.players) as any) {
            const playerIds = players.map((player: any) => player.id);
            if (playerIds.includes(playerId)) {
                team = teamMap[teamId];
                break;
            }
        }

        return team;
    }

    getTotalInningsCount () {
        let totalInnings = 0;

        for (const score of this.match.battingScores) {
            if (score.innings > totalInnings) {
                totalInnings = score.innings;
            }
        }

        return totalInnings;
    }

    getScoresForInnings(innings: number) {
        return this.match.battingScores.filter((s: any) => s.innings === innings);
    }

    getFiguresForInnings(innings: number) {
        return this.match.bowlingFigures.filter((b: any) => b.innings === innings);
    }

    getExtrasText(innings: number) {
        let total = 0;
        let extras: any = {
            b: 0,
            lb: 0,
            w: 0,
            nb: 0,
            p: 0
        };

        for (const extra of this.match.extras) {
            if (innings === extra.innings) {
                let typeString = '';
                let type = extra.type.name;
                let typeParts = type.split(' ');
                for (const part of typeParts) {
                    typeString += part.toLowerCase()[0];
                }

                extras[typeString] = extra.runs;
                total += extra.runs;
            }
        }

        let typeArray: string[] = [];
        for (let type in extras) {
            let runs = extras[type];
            typeArray.push(type + " " + runs);
        }

        return total + '(' + typeArray.join(', ') + ')';
    }

    getTotalText(innings: number) {
        let runs = 0;
        let wickets = 0;
        let balls = 0;

        for (const battingScore of this.match.battingScores) {
            if (innings === battingScore.innings) {
                runs += battingScore.runs;

                if (battingScore.dismissalMode) {
                    wickets++;
                }
            }
        }

        for (const extra of this.match.extras) {
            if (innings === extra.innings) {
                runs += extra.runs;
            }
        }

        for (const bowlingFigure of this.match.bowlingFigures) {
            if (innings === bowlingFigure.innings) {
                balls += bowlingFigure.balls;
            }
        }

        return (runs + ' - ' + wickets + ' ( ' +  this.getOverDetails(balls) + ' ) ');
    }

    getOverDetails(balls: number) {
        return (Math.floor(balls / 6) + '.' + (balls % 6));
    }
}
