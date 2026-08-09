import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import SearchSelect from '../search-select/search-select';
import { Router } from "@angular/router";

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    styleUrls: ['./app-bar.component.css'],
    imports: [MatIconModule, MatToolbarModule, MatButtonModule, SearchSelect]
})
export class AppBarComponent {
    constructor(private router: Router) { }

    handlePlayerSelect = (event: any, item: any) => {
        this.router.navigate(['/players/details'], { queryParams: { id: item.id } });
    }
}
