import { Component, Input } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    imports: [MatIconModule, MatButtonModule]
})
export class FiltersComponent {
    @Input() showFilters!: () => void
}