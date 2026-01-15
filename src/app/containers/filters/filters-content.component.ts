import { Component, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FILTER_TYPE } from '../../constants';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@Component({
    selector: 'app-filters-content',
    templateUrl: './filters-content.component.html',
    styleUrls: ['./filters-content.component.css'],
    imports: [MatFormFieldModule, MatCheckboxModule, MatRadioModule, MatExpansionModule, MatDialogModule, MatIconModule, MatToolbarModule, CommonModule, MatButtonModule, MatInputModule]
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