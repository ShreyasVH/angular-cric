import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppBarComponent} from "./components/app-bar/app-bar.component";
import {LoaderComponent} from "./components/loader/loader.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, AppBarComponent, LoaderComponent]
})
export class AppComponent { }
