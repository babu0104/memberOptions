import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer } from '@angular/core';
import * as _ from 'underscore';
@Directive({
    selector: '[isGreater]',
})
export class isGreaterDirective {
    @Input('isGreater') secondValue: string;
    @Input('invalidThresholdForm') invalidThresholdForm: boolean;
    @Output() invalidThresholdFormStatus: EventEmitter<any> = new EventEmitter();
    private el: ElementRef;
    constructor(private _el: ElementRef, public renderer: Renderer) {
        this.el = this._el;
    }
    @HostListener('focus', ['$event']) onFocus(e) {
        this.renderer.setElementClass(this._el.nativeElement, 'invalid-input', false);
        return;
    }
    @HostListener('blur', ['$event']) onblur(e) {
        const firstValue = this._el.nativeElement.value;
        if ((firstValue !== "") && (!_.isUndefined(this.secondValue))) {
            if (parseInt(firstValue) > parseInt(this.secondValue)) {
                this.renderer.setElementClass(this._el.nativeElement, 'invalid-input', true);
                this.invalidThresholdForm = true;
            } else {
                this.renderer.setElementClass(this._el.nativeElement, 'invalid-input', false);
                this.invalidThresholdForm = false;
            }
        }
        this.invalidThresholdFormStatus.emit(this.invalidThresholdForm);
        return;
    }
}