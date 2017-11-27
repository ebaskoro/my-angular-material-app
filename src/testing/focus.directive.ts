import {
    Directive,
    Input
} from '@angular/core';


@Directive({
    selector: '[focus]'
})
export class MockFocusDirective {

    @Input("focus")
    isFocused: boolean;

}
