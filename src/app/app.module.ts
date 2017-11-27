import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeroModule } from '../hero/hero.module';

import { AppComponent } from './app.component';


@NgModule({
    imports: [
        BrowserModule,
        HeroModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
