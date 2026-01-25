import { Component, Input } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-pagination-box',
    templateUrl: './pagination-box.component.html',
    styleUrls: ['./pagination-box.component.css'],
    imports: [MatButtonModule, CommonModule]
})
export class PlayerStatsPaginationBoxComponent {
    @Input() page: number = 1
    @Input() totalCount: number = 0
    @Input() limit: number = 10
    @Input() goToPage!: (page: number) => void

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
}