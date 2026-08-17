import { Component, inject } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-theme-selector',
    templateUrl: './theme-selector.html',
    imports: [MatSlideToggleModule, MatButtonModule, MatSlideToggleModule, MatSlideToggleModule],
})
export default class ThemeSelectorComponent {
    readonly themeService = inject(ThemeService);

    constructor() {
        // this.themeService.initializeTheme();
    }
}