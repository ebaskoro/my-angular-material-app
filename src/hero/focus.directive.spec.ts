import { Component } from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FocusDirective } from './focus.directive';


describe('Focus directory', () => {

    @Component({
        template: `<input type="text" [focus]=isFocused />`
    })
    class TargetComponent {

        isFocused = false;

    }

    let fixture: ComponentFixture<TargetComponent>;
    let component: TargetComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FocusDirective,
                TargetComponent
            ]
        });

        fixture = TestBed.createComponent(TargetComponent);
        component = fixture.componentInstance;
    });

    describe('when isFocused is false', () => {

        it('should not focus the element', () => {
            component.isFocused = false;
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('input')).nativeElement;

            expect(document.activeElement).not.toBe(input);
        });

    });

    describe('when isFocused is true', () => {

        it('should focus the element', () => {
            component.isFocused = true;
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('input')).nativeElement;

            expect(document.activeElement).toBe(input);
        });

    });

});
