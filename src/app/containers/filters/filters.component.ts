import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html'
})
export class FiltersComponent {
    @Input() options: any = {}
    @Input() selected: any = {}

    @Input() onFiltersApply!: () => void
    @Input() onEvent!: (event: any) => void
    @Input() showFilters!: () => void
    @Input() clearFilter!: (key: string) => void
    @Input() clearAllFilters!: () => void
}