import {Component, OnChanges, signal, SimpleChanges} from '@angular/core';
import { formatDateTimeString } from '../../utils';
import { getAllYears, getToursForYear } from '../../endpoints/tours'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

const urlSearchParams = new URLSearchParams(window.location.search);
const yearParam = urlSearchParams.get('year');
const selectedYear = yearParam ? parseInt(yearParam, 10) : (new Date()).getFullYear();

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class HomeComponent {
    constructor(private router: Router, private route: ActivatedRoute) { }

    years = signal<number[]>([]);
    year: number = selectedYear
    pageSize: number = 25
    totalPages: number = 1
    page: number = 1
    tours = signal<any>([]);

    async ngOnInit(): Promise<void> {
        const yearsResponse = await getAllYears();
        this.years.set(yearsResponse.data.data);

        this.route.queryParamMap.pipe(
            switchMap(async (params: ParamMap) => {
                const year = params.get('year');
                const selectedYear = year ? parseInt(year, 10) : (new Date()).getFullYear();

                const toursResponse = await getToursForYear(selectedYear, 1, this.pageSize);
                this.handleDataUpdate(toursResponse, 1);
                this.year = selectedYear;

                return of(null);
            })
        ).subscribe();

        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    getFormattedDate(dateTimeString: string): string {
        return formatDateTimeString(dateTimeString);
    }

    handleDataUpdate (toursResponse: any, page: number) {
        const toursData = toursResponse.data.data;

        if (page === 1) {
            const totalCount = toursData.totalCount;
            this.totalPages = Math.ceil(totalCount / this.totalPages);
            this.tours.set(toursData.items);
        } else {
            this.tours.update(t => t.concat(toursData.items));
        }

    }

    handleYearClick(year: number) {
        this.router.navigate(['/browse'], { queryParams: { year: year } });
    }

    handleTourClick(id: number) {
        this.router.navigate(['/tours/detail'], { queryParams: { id: id } });
    }

    async handleScroll() {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            if (this.tours.length > 0 && this.page < this.totalPages) {
                this.page = this.page + 1;
                const toursResponse = await getToursForYear(this.year, this.page, this.pageSize);
                this.handleDataUpdate(toursResponse, this.page);
            }
        }

    }
}
