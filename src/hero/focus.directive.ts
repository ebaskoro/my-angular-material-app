import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    Renderer
} from '@angular/core';


/**
 * focus attribute directive.
 *
 */
@Directive({
    selector: '[focus]'
})
export class FocusDirective implements OnInit {

    /**
     * Gets the indicator whether the element is currently focused.
     *
     */
    @Input("focus")
    isFocused: boolean;


    /**
     * Creates a focus attribute directive.
     *
     * @param {ElementRef} hostElement Host element.
     * @param {Renderer} renderer Renderer.
     */
    constructor(
        private readonly hostElement: ElementRef,
        private readonly renderer: Renderer) {
    }


    ngOnInit(): void {
        if (this.isFocused) {
            const renderElement = this.hostElement.nativeElement;
            this.renderer
                .invokeElementMethod(renderElement, 'focus');
        }
    }

}
