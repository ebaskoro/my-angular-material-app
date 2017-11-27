import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { TestingModule } from '../testing/testing.module';

import { AppComponent } from './app.component';


describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    TestingModule
                ],
                declarations: [
                    AppComponent
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
            })
            .catch(reason => {
                console.error(`Unable to compile components ${reason}`);
            });
    }));

    it('should create the component', async(() => {
        const target = fixture.debugElement.componentInstance;

        expect(target).toBeDefined();
    }));

});
