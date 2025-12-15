import { Component } from "@angular/core";
import { copyObject } from "../../../utils";
import { getStats } from '../../../endpoints/players';
import { getAllTeams } from '../../../endpoints/teams';
import { getAllStadiums } from '../../../endpoints/stadiums';
import { FILTER_TYPE } from "../../../constants";
import { FiltersContentComponent } from "../../filters/filters-content.component";
import { MatDialogRef } from "@angular/material/dialog";
import { LoaderService } from '../../../components/loader/loader.service';

interface ColumnDef {
    displayKey: string;
    key: string;
    sortable?: boolean;
}

@Component({
    selector: 'app-player-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class PlayerStatsComponent {
    options: any = {
        type: {
            displayName: 'Type',
            type: FILTER_TYPE.RADIO,
            values: [
                {
                    id: 'batting',
                    name: 'Batting'
                },
                {
                    id: 'bowling',
                    name: 'Bowling'
                },
                {
                    id: 'fielding',
                    name: 'Fielding'
                }
            ]
        },
        gameType: {
            displayName: 'Game Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '1',
                    name: 'ODI'
                },
                {
                    id: '2',
                    name: 'TEST'
                },
                {
                    id: '3',
                    name: 'T20'
                }
            ]
        },
        teamType: {
            displayName: 'Team Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '1',
                    name: 'INTERNATIONAL'
                },
                {
                    id: '2',
                    name: 'DOMESTIC'
                },
                {
                    id: '3',
                    name: 'FRANCHISE'
                }
            ]
        },
        year: {
            displayName: 'Year',
            type: FILTER_TYPE.RANGE
        },
        number: {
            displayName: 'Position',
            type: FILTER_TYPE.CHECKBOX,
            values: [...Array(11).keys()].map(i => ({ id: String(i + 1), name: i + 1 }))
        },
    }
    loaded: boolean = false
    filterOpen: boolean = false
    selectedFiltersTemp: any = {
        'type': 'batting'
    }
    selectedFilters: any = {
        'type': 'batting'
    }
    stats: any[] = []
    totalCount: number = 0
    page: number = 1
    sortMap: any = {
        'runs': 'desc'
    }
    limit: number = 10
    columns: Record<string, ColumnDef[]> = {
        batting: [
            {
                displayKey: 'Name',
                key: 'name',
                sortable: false
            },
            {
                displayKey: 'Innings',
                key: 'innings',
                sortable: true
            },
            {
                displayKey: 'Runs',
                key: 'runs',
                sortable: true
            },
            {
                displayKey: 'Balls',
                key: 'balls',
                sortable: true
            },
            {
                displayKey: 'Not Outs',
                key: 'notOuts',
                sortable: true
            },
            {
                displayKey: 'Highest',
                key: 'highest',
                sortable: true
            },
            {
                displayKey: '4s',
                key: 'fours',
                sortable: true
            },
            {
                displayKey: '6s',
                key: 'sixes',
                sortable: true
            },
            {
                displayKey: '50s',
                key: 'fifties',
                sortable: true
            },
            {
                displayKey: '100s',
                key: 'hundreds',
                sortable: true
            }
        ],
        bowling: [
            {
                displayKey: 'Name',
                key: 'name',
                sortable: false
            },
            {
                displayKey: 'Innings',
                key: 'innings',
                sortable: true
            },
            {
                displayKey: 'Wickets',
                key: 'wickets',
                sortable: true
            },
            {
                displayKey: 'Runs',
                key: 'runs',
                sortable: true
            },
            {
                displayKey: 'Balls',
                key: 'balls',
                sortable: true
            },
            {
                displayKey: 'Maidens',
                key: 'maidens',
                sortable: true
            },
            {
                displayKey: 'fifers',
                key: 'fifers',
                sortable: true
            },
            {
                displayKey: 'Ten Wickets',
                key: 'tenWickets',
                sortable: true
            }
        ],
        fielding: [
            {
                displayKey: 'Name',
                key: 'name',
                sortable: false
            },
            {
                displayKey: 'Fielder Catches',
                key: 'fielderCatches',
                sortable: true
            },
            {
                displayKey: 'Keeper Catches',
                key: 'keeperCatches',
                sortable: true
            },
            {
                displayKey: 'Stumpings',
                key: 'stumpings',
                sortable: true
            },
            {
                displayKey: 'Run Outs',
                key: 'runOuts',
                sortable: true
            }
        ]
    }

    Object: any = Object

    dialogRef?: MatDialogRef<FiltersContentComponent>;

    constructor(private loader: LoaderService) {}

    async ngOnInit(): Promise<void> {
        Promise.all([
            this.updateData(1, this.sortMap),
            getAllTeams(),
            getAllStadiums()
        ]).then(([_, allTeams, allStadiums]) => {
            const updatedFilterOptions = copyObject(this.options);

            updatedFilterOptions['team'] = {
                displayName: 'Team',
                type: FILTER_TYPE.CHECKBOX,
                values: allTeams.map(team => ({
                    id: JSON.stringify(team.id),
                    name: team.name
                }))
            };

            updatedFilterOptions['opposingTeam'] = {
                displayName: 'Opposing Team',
                type: FILTER_TYPE.CHECKBOX,
                values: allTeams.map(team => ({
                    id: JSON.stringify(team.id),
                    name: team.name
                }))
            };

            updatedFilterOptions['stadium'] = {
                displayName: 'Stadium',
                type: FILTER_TYPE.CHECKBOX,
                values: allStadiums.map(stadium => ({
                    id: JSON.stringify(stadium.id),
                    name: stadium.name
                }))
            };

            this.options = updatedFilterOptions;
        });
    }

    onDialogOpened(ref: MatDialogRef<FiltersContentComponent>) {
        this.dialogRef = ref;
    }

    async updateData(selectedPage: number, sortMap: any) {
        this.loader.show();

        const payload: any = {
            type: 'batting',
            filters: {},
            rangeFilters: {},
            count: this.limit,
            offset: (selectedPage - 1) * this.limit,
            sortMap
        };

        const rangeFilterKeys: string[] = [
            'year'
        ];

        const allowedSortKeys: any = {
            'batting': [
                'runs',
                'innings',
                'balls',
                'notOuts',
                'highest',
                'fours',
                'sixes',
                'fifties',
                'hundreds'
            ],
            'bowling': [
                'wickets',
                'innings',
                'runs',
                'balls',
                'maidens',
                'fifers',
                'tenWickets'
            ],
            'fielding': [
                'fielderCatches',
                'keeperCatches',
                'stumpings',
                'runOuts'
            ]
        };

        for (const [key, values] of Object.entries(this.selectedFiltersTemp)) {
            if (key === 'type') {
                payload.type = values;
                if (!allowedSortKeys[payload.type].includes(Object.keys(sortMap)[0])) {
                    sortMap = {
                        [allowedSortKeys[payload.type][0]]: 'desc'
                    };
                    payload.sortMap = sortMap;
                }
            } else if (rangeFilterKeys.indexOf(key) !== -1) {
                payload.rangeFilters[key] = values;
            } else {
                payload.filters[key] = values;
            }
        }

        getStats(payload).then(statsResponse => {
            this.stats = statsResponse.data.data.stats;
            this.totalCount = statsResponse.data.data.count;
            this.selectedFilters = copyObject(this.selectedFiltersTemp);
            this.page = selectedPage;
            this.sortMap = sortMap;
            this.loaded = true;
            this.hideFilters();
            this.loader.hide();
        });
    }

    hideFilters () {
        this.dialogRef?.close()
    }

    handleApplyFilters = () => {
        this.updateData(1, this.sortMap);
    }

    handleFilterEvent = (event: any) => {
        // let tempFilters = copyObject(this.selectedFiltersTemp);
        let tempFilters = this.selectedFiltersTemp;
        switch (event.filterType) {
            case FILTER_TYPE.CHECKBOX: {
                const key = event.filterKey;
                const id = event.optionId;
                const checked = event.checked;

                if (checked) {
                    if (tempFilters.hasOwnProperty(key)) {
                        tempFilters[key].push(id);
                    } else {
                        tempFilters[key] = [
                            id
                        ];
                    }
                } else {
                    let index = tempFilters[key].indexOf(id);
                    tempFilters[key].splice(index, 1);
                }
                if (tempFilters[key].length === 0) {
                    delete tempFilters[key];
                }
                break;
            }
            case FILTER_TYPE.RADIO: {
                const key = event.filterKey;
                const id = event.optionId;

                tempFilters[key] = id;
                break;
            }
            case FILTER_TYPE.RANGE: {
                const key = event.filterKey;
                const type = event.rangeType;
                if (!tempFilters.hasOwnProperty(key)) {
                    tempFilters[key] = {};
                }
                tempFilters[key][type] = event.target.value;
                break;
            }
        }

        // this.selectedFiltersTemp = tempFilters;
    }

    isSortActive (key: any) {
        return this.sortMap.hasOwnProperty(key);
    }

    getSortSymbol(key: any) {
        return (this.sortMap[key] === 'asc') ? '\u0020\u2191' : '\u0020\u2193';
    }

    handleSort (key: any, type: string) {
        const columnConfig = this.columns[type].filter(column => key === column.key);
        if (columnConfig.length === 1 && columnConfig[0].sortable) {
            const order = ((this.sortMap.hasOwnProperty(key) && this.sortMap[key] === 'desc') ? 'asc' : 'desc');
            this.updateData(1, {
                [key]: order
            });
        }
    };

    goToPage (page: number) {
        this.updateData(page, this.sortMap);
    };

    getTotalPages(): number {
        return (((this.totalCount - (this.totalCount % this.limit)) / this.limit) + (((this.totalCount % this.limit) === 0) ? 0 : 1));
    };

    getPageRange (): number[] {
        let range = [];
        for (let i = Math.max(1, this.page - 2); i <= Math.min(this.getTotalPages(), this.page + 2); i++) {
            range.push(i);
        }

        return range;
    };

    getDisplayColumns (type: string): string[] {
        return this.columns[type].map(c => c.key);
    };

    handleClearFilter = (key: string) => {
        let tempFilters = this.selectedFiltersTemp;

        delete tempFilters[key];

        // this.selectedFiltersTemp = tempFilters;
    };

    handleClearAllFilters = () => {
        let tempFilters = this.selectedFiltersTemp;

        for (const key of Object.keys(tempFilters)) {
            if (key !== 'type') {
                delete tempFilters[key];
            }
        }

        // this.selectedFiltersTemp = tempFilters;
    };
}