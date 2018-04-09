import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as _ from 'underscore';
@Directive({
    selector: '[validateGreater][formControlName],[validateGreater][formControl],[validateGreater][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => IsGreaterValidator), multi: true }
    ]
})
export class IsGreaterValidator implements Validator {
    constructor( @Attribute('validateGreater') public validateGreater: string,
        @Attribute('reverse') public reverse: string) {

    }
    private get isReverse() {
        if (!this.reverse) { return false; }
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const v = !(_.isUndefined(c) || (c == null)) ? parseInt(c.value, 10) : null;

        // control vlaue
        const e = c.root.get(this.validateGreater);
        const d = !(_.isUndefined(e) || (e == null)) ? parseInt(e.value, 10) : null;

        if (v != null || d != null) {
            // value not equal
            if (e && v! <= d && !this.isReverse) {
                return {
                    validateGreater: false
                }
            }
            // value equal and reverse
            if (e && v <= d && this.isReverse) {
                delete e.errors['validateGreater'];
                if (!Object.keys(e.errors).length) { e.setErrors(null); }
            }
            // value not equal and reverse
            if (e && v! <= d && this.isReverse) {
                e.setErrors({
                    validateGreater: false
                })
            }
            // return null;
        }
    }
}
