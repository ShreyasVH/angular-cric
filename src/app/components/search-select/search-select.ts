import { Component, Input, signal } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { search } from '../../endpoints/players';

@Component({
    selector: 'app-search-select',
    templateUrl: './search-select.html',
    styleUrls: ['./search-select.css'],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        CommonModule
    ]
})
export default class SearchSelect {
    value: string = '';
    open = signal(false);
    options = signal<any[]>([]);

    @Input() onSelect!: (event: any, item: any) => void

    async searchItems  (keyword:string) {
        let choices: Array<any> = [];

        const response = await search(keyword);
        const data = response.data.data;
        choices = data.items;

        return choices;
    }

    async handleChange (event:any)  {
        event.preventDefault();

        const keyword = event.target.value;
        this.value = keyword;
        if (keyword.length >= 2) {
            this.options.set(await this.searchItems(keyword));
            this.open.set(true);
        } else {
            this.open.set(false);
            this.options.set([]);
        }
    }

    handleSelect (event:any, item:any) {
        this.onSelect && this.onSelect(event, item);
        this.open.set(false);
        this.value = '';
        this.options.set([]);
    };

}
