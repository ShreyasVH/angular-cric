import { Component, inject, DestroyRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderDialogComponent } from './loader-dialog.component';
import { EventBusService } from '../../event-bus.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent {

    readonly dialog = inject(MatDialog);
    private bus = inject(EventBusService);
    private destroyRef = inject(DestroyRef);

    constructor() {
        this.bus.on('LOADER_SHOW')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(e => {
                console.log('showing in loader');
                this.handleOpenDialog()
            });

        this.bus.on('LOADER_HIDE')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.handleCloseDialog());
    }

    handleOpenDialog() {
        const ref = this.dialog.open(LoaderDialogComponent, {
            panelClass: 'custom-dialog-surface',
            disableClose: true
        });

        ref.backdropClick().subscribe(() => {
            this.closeDialog()
        });
    }

    handleCloseDialog() {
        this.dialog.closeAll();
    }

    openDialog() {
        this.bus.emit({ type: 'LOADER_SHOW', payload: { text: 'Loading…' } });
    }

    closeDialog() {
        this.bus.emit({ type: 'LOADER_HIDE', payload: { text: 'Loading…' } });
    }

}
