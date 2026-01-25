import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    imports: [MatIconModule, MatToolbarModule, MatButtonModule]
})
export class AppBarComponent { }
