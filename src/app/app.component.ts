import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppBarComponent} from "./components/app-bar/app-bar.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ThemeService} from "./theme.service";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, AppBarComponent, LoaderComponent, MatSidenavModule, MatListModule, RouterLink, MatIconModule]
})
export class AppComponent {
  readonly themeService = inject(ThemeService);

  constructor() {
    this.themeService.initializeTheme();
  }
}
