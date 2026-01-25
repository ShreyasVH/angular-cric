import { Component, Input } from "@angular/core";
import { ColumnDef } from '../stats.component';
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-stats-table',
    templateUrl: './stats-table.component.html',
    styleUrls: ['./stats-table.component.css'],
    imports: [MatTableModule, CommonModule]
})
export class PlayerStatsTableComponent {
    @Input() columns: Record<string, ColumnDef[]> = {}
    @Input() selectedFilters: any = {}
    @Input() stats: any = {}
    @Input() sortMap: any = {}
    @Input() handleSort!: (key: any, type: string) => void
    @Input() onValueClick!: (key: any, id: any) => void

    getSortSymbol(key: any) {
        return (this.sortMap[key] === 'asc') ? '\u0020\u2191' : '\u0020\u2193';
    }

    getDisplayColumns (type: string): string[] {
        return this.columns[type].map(c => c.key);
    }

    isSortActive (key: any) {
        return this.sortMap.hasOwnProperty(key);
    }

    handleValueClick (key: any, id: any) {
        this.onValueClick && this.onValueClick(key, id);
    }
}