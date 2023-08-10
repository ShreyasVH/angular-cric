import { Component } from '@angular/core';
import { formatDateTimeString } from '../../../utils';
import { getById} from '../../../endpoints/tours'
import { Router } from "@angular/router";

@Component({
    selector: 'app-tour-detail',
    templateUrl: './detail.component.html'
})
export class TourDetailComponent {
    constructor(private router: Router) { }

    tour: any = {}

    async ngOnInit(): Promise<void> {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlSearchParams.get('id') ?? '0', 10);
        const tourResponse = await getById(id);
        this.tour = tourResponse.data.data;
    }

    getFormattedDate(dateTimeString: string): string {
        return formatDateTimeString(dateTimeString);
    }

    handleSeriesClick(id: number) {
        this.router.navigate(['/series/detail'], { queryParams: { id: id } });
    }
}
