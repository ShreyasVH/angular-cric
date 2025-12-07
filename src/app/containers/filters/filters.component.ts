import { Component, inject, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FiltersContentComponent } from './filters-content.component';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html'
})
export class FiltersComponent {
    @Input() options: any = {}
    @Input() selected: any = {}

    @Input() onFiltersApply!: () => void
    @Input() onEvent!: (event: any) => void

    @Output() dialogOpened = new EventEmitter<MatDialogRef<FiltersContentComponent>>();

    readonly dialog = inject(MatDialog);

    showFilters () {
        console.log('showing');

        const ref = this.dialog.open(FiltersContentComponent, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            panelClass: 'full-screen-dialog',
            data: {
                options: this.options,
                selected: this.selected
            }
        });

        ref.componentInstance.onFiltersApply = this.onFiltersApply;
        ref.componentInstance.onEvent = this.onEvent;

        this.dialogOpened.emit(ref);
    }

    // hideFilters () {
    //     console.log('hiding');
    //
    //     this.dialog.closeAll();
    // }
}