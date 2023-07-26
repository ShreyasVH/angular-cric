import { Component } from '@angular/core';
import { formatDateTimeString } from '../../../utils';
import { getById} from '../../../endpoints/tours'

@Component({
    selector: 'app-tour-detail',
    templateUrl: './detail.component.html'
})
export class TourDetailComponent {
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
}
