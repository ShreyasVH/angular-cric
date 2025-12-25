import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html'
})
export class FiltersComponent {
    @Input() showFilters!: () => void
}