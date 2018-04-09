import { Injectable } from '@angular/core';
import * as _ from 'underscore';
// import {SelectItem} from './common/modal/selectitem';
@Injectable()
export class Util {
    public setContinueVal = (stopRefreshTokenSetInterval) => {
        return stopRefreshTokenSetInterval ? false : true;
    }
    public showSignInLink() {
        const dom = document.getElementById('sigin-link');
        if (!_.isNull(dom)) {
            dom.setAttribute('style', 'display:inline-block');
        } else {
            return;
        }     
    }
    public hideSignInLink() {
        const dom = document.getElementById('sigin-link');
        if (!_.isNull(dom)) {
            dom.setAttribute('style', 'display:none');
        } else {
            return;
        }
    }
    public clearLocalStorage() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        localStorage.removeItem('isAuthenticated');
        return;
    }
    public onFocus(targetVal: any, selectedDom: any, key: number) {
        let finalVal: any;
        const format: any = 'dd/mm/yyyy';
        const match = new RegExp(format
            .replace(/(\w+)\W(\w+)\W(\w+)/, '^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*')
            .replace(/d|m|y/g, '\\d'));
        const replace = '$1/$2/$3$4'
            .replace(/\//g, format.match(/\W/));
        if (key === 8 || key === 46) {
            return false;
        } else {
            finalVal = targetVal.replace(/(^|\W)(?=\d\W)/g, '$10')   // padding
                .replace(match, replace)             // fields
                .replace(/(\W)+/g, '$1').replace(/[^\0-9]/ig, '');
            selectedDom.querySelector(':focus').value = finalVal;
            selectedDom.querySelector(':focus').setAttribute('maxlength', '10');
        }

    }
}
