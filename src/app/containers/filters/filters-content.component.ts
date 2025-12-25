import {Component, inject, Input} from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FILTER_TYPE } from '../../constants';


@Component({
    selector: 'app-filters-content',
    templateUrl: './filters-content.component.html',
    styleUrls: ['./filters-content.component.css']
})
export class FiltersContentComponent {
    data = inject<{ options: any, selected: any }>(MAT_DIALOG_DATA);
    @Input() onFiltersApply!: () => void;
    @Input() onEvent!: (event: any) => void;
    @Input() onHideFilters!: () => void;
    @Input() clearFilter!: (key: string) => void;
    @Input() clearAllFilters!: () => void;

    get options() {
        return this.data.options;
    }

    get selected() {
        return this.data.selected;
    }

    Object: any = Object;

    hideFilters () {
        this.onHideFilters && this.onHideFilters();
    }

    getFilterOptions () {
        return this.options;
    }

    isRadioFilter (key: any): Boolean {
        return this.options.hasOwnProperty(key) && this.options[key].type === FILTER_TYPE.RADIO;
    }

    isCheckboxFilter (key: any): Boolean {
        return this.options.hasOwnProperty(key) && this.options[key].type === FILTER_TYPE.CHECKBOX;
    }

    isCheckboxChecked (key: any, id: any): boolean {
        return this.selected.hasOwnProperty(key) && this.selected[key].indexOf(id) !== -1;
    }

    isRangeFilter (key: any): Boolean {
        return this.options.hasOwnProperty(key) && this.options[key].type === FILTER_TYPE.RANGE;
    }

    applyFilters (): void {
        this.onFiltersApply && this.onFiltersApply();
    }

    handleEvent (event: any): void {
        this.onEvent && this.onEvent(event);
    }

    isFilterSelected (key: any) {
        return this.selected.hasOwnProperty(key) && 0 !== this.selected[key].length
    }

    handleClearFilter (key: string): void {
        this.clearFilter && this.clearFilter(key);
    }

    handleClearAllFilters (): void {
        this.clearAllFilters && this.clearAllFilters();
    }

    isAnyFilterSelected () {
        return Object.keys(this.selected).filter(k => k !== 'type').length > 0
    }
}