import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';

import { environment } from '../environments/environment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HeroesComponent } from './heroes.component';

import { HeroService } from './hero.service';

import { FocusDirective } from './focus.directive';


/**
 * Hero module.
 *
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        environment.production ? [] : InMemoryWebApiModule.forRoot(InMemoryDataService),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    declarations: [
        FocusDirective,
        HeroesComponent
    ],
    providers: [
        HeroService
    ],
    exports: [
        HeroesComponent
    ]
})
export class HeroModule {
}
