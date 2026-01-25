import { Routes } from '@angular/router';

import { HomeComponent } from './app/containers/home/home.component';
import { TourDetailComponent } from './app/containers/tours/detail/detail.component';
import { SeriesDetailComponent } from './app/containers/series/detail/detail.component';
import { MatchDetailComponent } from './app/containers/matches/detail/detail.component';
import { PlayerStatsComponent } from './app/containers/players/stats/stats.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'browse', component: HomeComponent },
    { path: 'tours/detail', component: TourDetailComponent },
    { path: 'series/detail', component: SeriesDetailComponent },
    { path: 'matches/detail', component: MatchDetailComponent },
    { path: 'players/stats', component: PlayerStatsComponent }
];

