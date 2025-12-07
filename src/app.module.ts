import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeComponent } from './app/containers/home/home.component';
import { TourDetailComponent } from './app/containers/tours/detail/detail.component';
import { SeriesDetailComponent } from './app/containers/series/detail/detail.component';
import { MatchDetailComponent } from './app/containers/matches/detail/detail.component';
import { AppBarComponent } from './app/components/app-bar/app-bar.component';
import { PlayerStatsComponent } from './app/containers/players/stats/stats.component';
import { FiltersComponent } from './app/containers/filters/filters.component';
import { FiltersContentComponent } from './app/containers/filters/filters-content.component';
import { LoaderComponent } from './app/components/loader/loader.component';
import { LoaderDialogComponent } from './app/components/loader/loader-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppBarComponent,
    TourDetailComponent,
    SeriesDetailComponent,
    MatchDetailComponent,
    PlayerStatsComponent,
    FiltersComponent,
    FiltersContentComponent,
    LoaderComponent,
    LoaderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
