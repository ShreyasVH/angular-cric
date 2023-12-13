import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { HomeComponent } from './app/containers/home/home.component';
import { TourDetailComponent } from './app/containers/tours/detail/detail.component';
import { SeriesDetailComponent } from './app/containers/series/detail/detail.component';
import { MatchDetailComponent } from './app/containers/matches/detail/detail.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'browse', component: HomeComponent },
    { path: 'tours/detail', component: TourDetailComponent },
    { path: 'series/detail', component: SeriesDetailComponent },
    { path: 'matches/detail', component: MatchDetailComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
