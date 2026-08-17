import { Component, Input } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import SearchSelect from '../search-select/search-select';
import { Router } from "@angular/router";
import ThemeSelector from '../theme-selector/theme-selector';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    styleUrls: ['./app-bar.component.css'],
    imports: [MatIconModule, MatToolbarModule, MatButtonModule, SearchSelect, ThemeSelector]
})
export class AppBarComponent {
    @Input() drawer!: MatSidenav;

    constructor(private router: Router) { }

    handlePlayerSelect = (event: any, item: any) => {
        this.router.navigate(['/players/details'], { queryParams: { id: item.id } });
    }
}
