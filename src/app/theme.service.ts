import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly document = inject(DOCUMENT);

    get mode(): ThemeMode {
        return this.document.documentElement.classList.contains('dark-theme')
            ? 'dark'
            : 'light';
    }

    setTheme(mode: ThemeMode): void {
        const html = this.document.documentElement;

        html.classList.toggle('dark-theme', mode === 'dark');
    }

    toggleTheme(): void {
        this.setTheme(this.mode === 'dark' ? 'light' : 'dark');
    }

    initializeTheme(): void {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        this.setTheme(prefersDark ? 'dark' : 'light');
    }
}