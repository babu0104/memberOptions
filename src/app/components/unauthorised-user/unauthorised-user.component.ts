import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'underscore';
// tslint:disable-next-line:max-line-length
import { UnauthorisedUserType00, UnauthorisedUserType01, UnauthorisedUserType02, UnauthorisedUserType03, UnauthorisedUserType04, UnauthorisedUserType05, UnauthorisedUserType06, UnauthorisedUserType07, UnauthorisedUserType08, UnauthorisedUserType09 } from 'app/_models/threshold/unauthorisedUserType';
import { ThresholdService } from '../../_services/threshold.service';
import { Threshold } from '../../_models/threshold/threshold';
import { UuType } from '../../_models/threshold/uuType';
import { UuDeCode } from '../../_constants/uuDeCode';
@Component({
    selector: 'app-unauthorised-user',
    templateUrl: './unauthorised-user.component.html',
    styleUrls: ['./unauthorised-user.component.scss'],
    providers: [ThresholdService],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UnauthorisedUserComponent implements OnInit {
    @Input() invalidThresholdForm;
    @Output() invalidThresholdFormStatus: EventEmitter<any> = new EventEmitter();
    limited = true;
    extended = false;
    componentName = '';
    totalBucket = 2;
    uuType00: Array<UuType>;
    uuType01: Array<UuType>;
    uuType02: Array<UuType>;
    uuType03: Array<UuType>;
    uuType04: Array<UuType>;
    uuType05: Array<UuType>;
    uuType06: Array<UuType>;
    uuType07: Array<UuType>;
    uuType08: Array<UuType>;
    uuType09: Array<UuType>;
    finalUuType = [];
    unauthorisedUserType00: UnauthorisedUserType00;
    unauthorisedUserType01: UnauthorisedUserType01;
    unauthorisedUserType02: UnauthorisedUserType02;
    unauthorisedUserType03: UnauthorisedUserType03;
    unauthorisedUserType04: UnauthorisedUserType04;
    unauthorisedUserType05: UnauthorisedUserType05;
    unauthorisedUserType06: UnauthorisedUserType06;
    unauthorisedUserType07: UnauthorisedUserType07;
    unauthorisedUserType08: UnauthorisedUserType08;
    unauthorisedUserType09: UnauthorisedUserType09;
    unauthorisedUserTypes = [];
    titles = [
        { 'title': 'Type 00 - Card reported loss, with loss' },
        { 'title': 'Type 01 - Card reported stolen, with loss' },
        { 'title': 'Type 02 - Card not received, with loss' },
        { 'title': 'Type 03 - Fradulent application, with loss' },
        { 'title': 'Type 04 - Counterfeit card, with loss' },
        { 'title': 'Type 05 - ADDRESS Change/account takeover, with loss' },
        { 'title': 'Type 06 - Telemarketing/no sales draft, with loss' },
        { 'title': 'Type 07 - Fradulent application, before loss (consumer contacted)' },
        { 'title': 'Type 08 - Suspicious application, before loss (cannot verify data)' },
        { 'title': 'Type 09 - Bust Out' }
    ];
    threshold = new Threshold();
    tempThreshold: any;
    listThresholdDataArray = [];
    tempResult: any;
    constructor(
        private thresholdService: ThresholdService
    ) { }
    ngOnInit() {
        this.unauthorisedUserType00 = new UnauthorisedUserType00();
        this.unauthorisedUserType01 = new UnauthorisedUserType01();
        this.unauthorisedUserType02 = new UnauthorisedUserType02();
        this.unauthorisedUserType03 = new UnauthorisedUserType03();
        this.unauthorisedUserType04 = new UnauthorisedUserType04();
        this.unauthorisedUserType05 = new UnauthorisedUserType05();
        this.unauthorisedUserType06 = new UnauthorisedUserType06();
        this.unauthorisedUserType07 = new UnauthorisedUserType07();
        this.unauthorisedUserType08 = new UnauthorisedUserType08();
        this.unauthorisedUserType09 = new UnauthorisedUserType09();

        this.unauthorisedUserType03.period2High = 1462;
        this.unauthorisedUserType05.period2High = 1462;
        this.unauthorisedUserType07.period2High = 1462;
        this.unauthorisedUserType08.period2High = 1462;
        this.unauthorisedUserType09.period2High = 1462;
    }
    getInvalidThresholdFormStatus = ($event) => {
        this.invalidThresholdForm = $event;
        this.invalidThresholdFormStatus.emit(this.invalidThresholdForm);
    }
    appendToForm = (result, totalBucket, limited, extended, componentName) => {
        let thresholdData;
        this.tempResult = result;
        this.componentName = componentName;
        this.limited = limited;
        this.extended = extended;
        this.totalBucket = totalBucket; // update totalBucket if 2 or 4
        if (this.componentName === 'threshold') {
            thresholdData = result.icsThresholdDataDto;
        }
        if (this.componentName === 'retrothreshold') {
            thresholdData = result.icsRetroThresholdDataDto;
        }
        let thresholdUuData;
        this.uuType00 = [];
        this.uuType00 = [];
        this.uuType01 = [];
        this.uuType02 = [];
        this.uuType03 = [];
        this.uuType04 = [];
        this.uuType05 = [];
        this.uuType06 = [];
        this.uuType07 = [];
        this.uuType08 = [];
        this.uuType09 = [];
        if (thresholdData != null) {
            if (this.componentName === 'threshold') {
                thresholdUuData = thresholdData.listThresholdUuData;
            }
            if (this.componentName === 'retrothreshold') {
                thresholdUuData = thresholdData.listRetroThresholdUuData;
            }
            // tslint:disable-next-line:max-line-length
            this.uuType00 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus00) || (node.uuDeCode === UuDeCode.uua00) || (node.uuDeCode === UuDeCode.uup00)); });
            // tslint:disable-next-line:max-line-length
            this.uuType01 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus01) || (node.uuDeCode === UuDeCode.uua01) || (node.uuDeCode === UuDeCode.uup01)); });
            // tslint:disable-next-line:max-line-length
            this.uuType02 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus02) || (node.uuDeCode === UuDeCode.uua02) || (node.uuDeCode === UuDeCode.uup02)); });
            // tslint:disable-next-line:max-line-length
            this.uuType03 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus03) || (node.uuDeCode === UuDeCode.uua03) || (node.uuDeCode === UuDeCode.uup03)); });
            // tslint:disable-next-line:max-line-length
            this.uuType04 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus04) || (node.uuDeCode === UuDeCode.uua04) || (node.uuDeCode === UuDeCode.uup04)); });
            // tslint:disable-next-line:max-line-length
            this.uuType05 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus05) || (node.uuDeCode === UuDeCode.uua05) || (node.uuDeCode === UuDeCode.uup05)); });
            // tslint:disable-next-line:max-line-length
            this.uuType06 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus06) || (node.uuDeCode === UuDeCode.uua06) || (node.uuDeCode === UuDeCode.uup06)); });
            // tslint:disable-next-line:max-line-length
            this.uuType07 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus07) || (node.uuDeCode === UuDeCode.uua07) || (node.uuDeCode === UuDeCode.uup07)); });
            // tslint:disable-next-line:max-line-length
            this.uuType08 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus08) || (node.uuDeCode === UuDeCode.uua08) || (node.uuDeCode === UuDeCode.uup08)); });
            // tslint:disable-next-line:max-line-length
            this.uuType09 = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.uus09) || (node.uuDeCode === UuDeCode.uua09) || (node.uuDeCode === UuDeCode.uup09)); });
            this.finalUuType = [];
            this.unauthorisedUserTypes = [];
            // tslint:disable-next-line:max-line-length
            this.finalUuType.push(this.uuType00, this.uuType01, this.uuType02, this.uuType03, this.uuType04, this.uuType05, this.uuType06, this.uuType07, this.uuType08, this.uuType09);
            // tslint:disable-next-line:max-line-length
            this.unauthorisedUserTypes.push(this.unauthorisedUserType00, this.unauthorisedUserType01, this.unauthorisedUserType02, this.unauthorisedUserType03, this.unauthorisedUserType04, this.unauthorisedUserType05, this.unauthorisedUserType06, this.unauthorisedUserType07, this.unauthorisedUserType08, this.unauthorisedUserType09);
            this.clearAllUnauthorisedUserTypesData(); // Clearing Unauthorised User data
            for (let i = 0; i < this.finalUuType.length; i++) {
                this.bindUnauthorisedUseData(this.finalUuType[i], this.unauthorisedUserTypes[i], i);
            }
        } else {
            this.limited = true;
            this.clearAllUnauthorisedUserTypesData(); // Clearing Unauthorised User data
        }
    }
    clearAllUnauthorisedUserTypesData = () => {
        for (let i = 0; i < this.unauthorisedUserTypes.length; i++) {
            this.unauthorisedUserTypes[i].clear();
        }
    }
    // Binding Unauthorised Use data to ngModel
    bindUnauthorisedUseData = (currentUuType, currentUnAuthorisedUserType, currentIndex) => {
        if (currentUuType.length !== 0) {
            this.bindCurrentUnauthorisedUseData(currentUuType, currentUnAuthorisedUserType, currentIndex);
        } else {
            currentUnAuthorisedUserType.clear();
        }
    }
    bindCurrentUnauthorisedUseData(currentUuType, currentUnAuthorisedUserType, currentIndex) {
        const uuDeCodes = this.getUuDeCodes(currentIndex);
        const uuDeCodeSSn = uuDeCodes[0];
        const uuDeCodeAddress = uuDeCodes[1];
        const uuDeCodePhone = uuDeCodes[2];
        for (let j = 0; j < this.totalBucket; j++) {
            const bucket = j + 1;
            switch (bucket) {
                case 1:
                    for (let i = 0; i < currentUuType.length; i++) {
                        if (!_.isUndefined(currentUuType[i]) && (currentUuType[i].bucket === bucket)) {
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1Low = !_.isUndefined(currentUuType[i].lowDay) ? currentUuType[i].lowDay : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1High = !_.isUndefined(currentUuType[i].highDay) ? currentUuType[i].highDay : null;
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1Low = !_.isUndefined(currentUuType[i].applVelocityLow) ? currentUuType[i].applVelocityLow : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1High = !_.isUndefined(currentUuType[i].applVelocityHigh) ? currentUuType[i].applVelocityHigh : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeSSn) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1Ssn = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeAddress) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1Address = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodePhone) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period1Phone = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                        }
                    }
                    break;
                case 2:
                    for (let i = 0; i < currentUuType.length; i++) {
                        if (!_.isUndefined(currentUuType[i]) && (currentUuType[i].bucket === bucket)) {
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2Low = !_.isUndefined(currentUuType[i].lowDay) ? currentUuType[i].lowDay : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2High = !_.isUndefined(currentUuType[i].highDay) ? currentUuType[i].highDay : null;
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2Low = !_.isUndefined(currentUuType[i].applVelocityLow) ? currentUuType[i].applVelocityLow : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2High = !_.isUndefined(currentUuType[i].applVelocityHigh) ? currentUuType[i].applVelocityHigh : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeSSn) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2Ssn = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeAddress) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2Address = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodePhone) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period2Phone = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < currentUuType.length; i++) {
                        if (!_.isUndefined(currentUuType[i]) && (currentUuType[i].bucket === bucket)) {
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3Low = !_.isUndefined(currentUuType[i].lowDay) ? currentUuType[i].lowDay : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3High = !_.isUndefined(currentUuType[i].highDay) ? currentUuType[i].highDay : null;
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3Low = !_.isUndefined(currentUuType[i].applVelocityLow) ? currentUuType[i].applVelocityLow : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3High = !_.isUndefined(currentUuType[i].applVelocityHigh) ? currentUuType[i].applVelocityHigh : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeSSn) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3Ssn = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeAddress) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3Address = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodePhone) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period3Phone = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                        }
                    }
                    break;
                case 4:
                    for (let i = 0; i < currentUuType.length; i++) {
                        if (!_.isUndefined(currentUuType[i]) && (currentUuType[i].bucket === bucket)) {
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4Low = !_.isUndefined(currentUuType[i].lowDay) ? currentUuType[i].lowDay : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4High = !_.isUndefined(currentUuType[i].highDay) ? currentUuType[i].highDay : null;
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4Low = !_.isUndefined(currentUuType[i].applVelocityLow) ? currentUuType[i].applVelocityLow : null;
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4High = !_.isUndefined(currentUuType[i].applVelocityHigh) ? currentUuType[i].applVelocityHigh : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeSSn) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4Ssn = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodeAddress) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4Address = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                            if (currentUuType[i].uuDeCode === uuDeCodePhone) {
                                // tslint:disable-next-line:max-line-length
                                currentUnAuthorisedUserType.period4Phone = !_.isUndefined(currentUuType[i].thresholdValue) ? currentUuType[i].thresholdValue : null;
                            }
                        }
                    }
                    break;
                default:
                    return;
            }
        }
    }
    getUuDeCodes = (currentIndex) => {
        let uuDeCodeSSn;
        let uuDeCodeAddress;
        let uuDeCodePhone;
        switch (currentIndex) {
            case 0:
                uuDeCodeSSn = UuDeCode.uus00;
                uuDeCodeAddress = UuDeCode.uua00;
                uuDeCodePhone = UuDeCode.uup00;
                break;
            case 1:
                uuDeCodeSSn = UuDeCode.uus01;
                uuDeCodeAddress = UuDeCode.uua01;
                uuDeCodePhone = UuDeCode.uup01;
                break;
            case 2:
                uuDeCodeSSn = UuDeCode.uus02;
                uuDeCodeAddress = UuDeCode.uua02;
                uuDeCodePhone = UuDeCode.uup02;
                break;
            case 3:
                uuDeCodeSSn = UuDeCode.uus03;
                uuDeCodeAddress = UuDeCode.uua03;
                uuDeCodePhone = UuDeCode.uup03;
                break;
            case 4:
                uuDeCodeSSn = UuDeCode.uus04;
                uuDeCodeAddress = UuDeCode.uua04;
                uuDeCodePhone = UuDeCode.uup04;
                break;
            case 5:
                uuDeCodeSSn = UuDeCode.uus05;
                uuDeCodeAddress = UuDeCode.uua05;
                uuDeCodePhone = UuDeCode.uup05;
                break;
            case 6:
                uuDeCodeSSn = UuDeCode.uus06;
                uuDeCodeAddress = UuDeCode.uua06;
                uuDeCodePhone = UuDeCode.uup06;
                break;
            case 7:
                uuDeCodeSSn = UuDeCode.uus07;
                uuDeCodeAddress = UuDeCode.uua07;
                uuDeCodePhone = UuDeCode.uup07;
                break;
            case 8:
                uuDeCodeSSn = UuDeCode.uus08;
                uuDeCodeAddress = UuDeCode.uua08;
                uuDeCodePhone = UuDeCode.uup08;
                break;
            case 9:
                uuDeCodeSSn = UuDeCode.uus09;
                uuDeCodeAddress = UuDeCode.uua09;
                uuDeCodePhone = UuDeCode.uup09;
                break;
            default:
                return;
        }
        return [uuDeCodeSSn, uuDeCodeAddress, uuDeCodePhone];
    }
    saveUnauthorisedUserData = (componentName) => {
        this.componentName = componentName;
        this.unauthorisedUserTypes = [];
        this.listThresholdDataArray = [];
        // tslint:disable-next-line:max-line-length
        this.unauthorisedUserTypes.push(this.unauthorisedUserType00, this.unauthorisedUserType01, this.unauthorisedUserType02, this.unauthorisedUserType03, this.unauthorisedUserType04, this.unauthorisedUserType05, this.unauthorisedUserType06, this.unauthorisedUserType07, this.unauthorisedUserType08, this.unauthorisedUserType09);
        for (let i = 0; i < this.unauthorisedUserTypes.length; i++) {
            this.saveEachUnauthorisedUserData(this.unauthorisedUserTypes[i], i);
        }
        return this.listThresholdDataArray;
    }
    saveEachUnauthorisedUserData = (currentUnauthorisedUserType, currentIndex) => {
        if (!_.isEmpty(currentUnauthorisedUserType)) {
            this.totalBucket = 2; // 2 or 4 based on limited or extended
            for (let i = 0; i < this.totalBucket; i++) {
                const bucket = i + 1;
                switch (bucket) {
                    case 1:
                        if (currentUnauthorisedUserType.period1Ssn != null) {
                            const uuDeCode = 'UUS0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period1Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                        }
                        if (currentUnauthorisedUserType.period1Address != null) {
                            const uuDeCode = 'UUA0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period1Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                        }
                        if (currentUnauthorisedUserType.period1Phone != null) {
                            const uuDeCode = 'UUP0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period1Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu1 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period1High, currentUnauthorisedUserType.period1Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu1);
                            }
                        }
                        break;
                    case 2:
                        if (currentUnauthorisedUserType.period2Ssn != null) {
                            const uuDeCode = 'UUS0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period2Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                        }
                        if (currentUnauthorisedUserType.period2Address != null) {
                            const uuDeCode = 'UUA0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period2Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                        }
                        if (currentUnauthorisedUserType.period2Phone != null) {
                            const uuDeCode = 'UUP0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period2Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu2 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu2);
                            }
                        }
                        break;
                    case 3:
                        if (currentUnauthorisedUserType.period3Ssn != null) {
                            const uuDeCode = 'UUS0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period3Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                        }
                        if (currentUnauthorisedUserType.period3Address != null) {
                            const uuDeCode = 'UUA0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period3Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                        }
                        if (currentUnauthorisedUserType.period3Phone != null) {
                            const uuDeCode = 'UUP0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period3Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu3 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period2High, currentUnauthorisedUserType.period2Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu3);
                            }
                        }
                        break;
                    case 4:
                        if (currentUnauthorisedUserType.period4Ssn != null) {
                            const uuDeCode = 'UUS0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period4Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                        }
                        if (currentUnauthorisedUserType.period4Address != null) {
                            const uuDeCode = 'UUA0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period4Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                        }
                        if (currentUnauthorisedUserType.period4Phone != null) {
                            const uuDeCode = 'UUP0' + currentIndex;
                            const thresHoldOption = currentUnauthorisedUserType.period4Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const uu4 = this.thresholdService.createListRetroThresholdDataNode(uuDeCode, bucket, currentUnauthorisedUserType.period3High, currentUnauthorisedUserType.period3Low, thresHoldOption, '');
                                this.listThresholdDataArray.push(uu4);
                            }
                        }
                        break;
                    default:
                        return;
                }
            }
        }
    }
    cancelUnauthorisedUserData = () => {
        this.appendToForm(this.tempResult, this.totalBucket, this.limited, this.extended, this.componentName);
    }
}
