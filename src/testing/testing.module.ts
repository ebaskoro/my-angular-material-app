import { NgModule } from '@angular/core';

import { MockHeroesComponent } from './heroes.component';

import { MockFocusDirective } from './focus.directive';


@NgModule({
    declarations: [
        MockFocusDirective,
        MockHeroesComponent
    ],
    exports: [
        MockFocusDirective,
        MockHeroesComponent
    ]
})
export class TestingModule {
}
