import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'underscore';
import { ApplicationVelocity } from 'app/_models/threshold/applicationVelocity';
import { ThresholdService } from '../../_services/threshold.service';
import { Threshold } from '../../_models/threshold/threshold';
import { UuType } from '../../_models/threshold/uuType';
import { UuDeCode } from '../../_constants/uuDeCode';
import { extend } from 'webdriver-js-extender';
@Component({
    selector: 'app-application-velocity',
    templateUrl: './application-velocity.component.html',
    styleUrls: ['./application-velocity.component.scss'],
    providers: [ThresholdService],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ApplicationVelocityComponent implements OnInit {
    @Input() invalidThresholdForm;
    @Output() invalidThresholdFormStatus: EventEmitter<any> = new EventEmitter();
    limited = true;
    extended = false;
    totalBucket = 2;
    componentName = '';
    av: Array<UuType>;
    applicationVelocity: ApplicationVelocity;
    threshold = new Threshold();
    tempThreshold: any;
    listThresholdDataArray = [];
    thresholdNode = {};
    tempResult: any;
    constructor(
        private thresholdService: ThresholdService
    ) { }
    ngOnInit() {
        this.applicationVelocity = new ApplicationVelocity();
    }
    getInvalidThresholdFormStatus = ($event) => {
        this.invalidThresholdForm = $event;
        this.invalidThresholdFormStatus.emit(this.invalidThresholdForm);
    }
    appendToForm = (result, totalBucket, limited, extended, componentName) => {
        let thresholdData;
        this.componentName = componentName;
        this.tempResult = result;
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
        this.av = [];
        if (thresholdData != null) {
            if (this.componentName === 'threshold') {
                thresholdUuData = thresholdData.listThresholdUuData;
            }
            if (this.componentName === 'retrothreshold') {
                thresholdUuData = thresholdData.listRetroThresholdUuData;
            }
            // tslint:disable-next-line:max-line-length
            this.av = thresholdUuData.filter(function (node) { return ((node.uuDeCode === UuDeCode.ssn) || (node.uuDeCode === UuDeCode.adr) || (node.uuDeCode === UuDeCode.phn)); });
            this.applicationVelocity.clearApplicationVelocity();
            this.bindApplicationVelocityData(); // binding with ngModel
        } else {
            this.limited = true;
            this.applicationVelocity.clearApplicationVelocity(); // Clearing Application Velocity data model
        }
    }
    // Binding Application Velocity data to ngModel
    bindApplicationVelocityData = () => {
        if (this.av.length !== 0) {
            for (let j = 0; j < this.totalBucket; j++) {
                const bucket = j + 1;
                switch (bucket) {
                    case 1:
                        for (let i = 0; i < this.av.length; i++) {
                            if (!_.isUndefined(this.av[i]) && this.av[i].bucket === bucket) {
                                if (this.componentName === 'threshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1Low = !_.isUndefined(this.av[i].lowDay) ? this.av[i].lowDay : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1High = !_.isUndefined(this.av[i].highDay) ? this.av[i].highDay : null;
                                }
                                if (this.componentName === 'retrothreshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1Low = !_.isUndefined(this.av[i].applVelocityLow) ? this.av[i].applVelocityLow : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1High = !_.isUndefined(this.av[i].applVelocityHigh) ? this.av[i].applVelocityHigh : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.ssn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1Ssn = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.adr) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1Address = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.phn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod1Phone = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                            }
                        }
                        break;
                    case 2:
                        for (let i = 0; i < this.av.length; i++) {
                            if (!_.isUndefined(this.av[i]) && this.av[i].bucket === bucket) {
                                if (this.componentName === 'threshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2Low = !_.isUndefined(this.av[i].lowDay) ? this.av[i].lowDay : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2High = !_.isUndefined(this.av[i].highDay) ? this.av[i].highDay : null;
                                }
                                if (this.componentName === 'retrothreshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2Low = !_.isUndefined(this.av[i].applVelocityLow) ? this.av[i].applVelocityLow : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2High = !_.isUndefined(this.av[i].applVelocityHigh) ? this.av[i].applVelocityHigh : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.ssn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2Ssn = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.adr) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2Address = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.phn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod2Phone = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                            }
                        }
                        break;
                    case 3:
                        for (let i = 0; i < this.av.length; i++) {
                            if (!_.isUndefined(this.av[i]) && this.av[i].bucket === bucket) {
                                if (this.componentName === 'threshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3Low = !_.isUndefined(this.av[i].lowDay) ? this.av[i].lowDay : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3High = !_.isUndefined(this.av[i].highDay) ? this.av[i].highDay : null;
                                }
                                if (this.componentName === 'retrothreshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3Low = !_.isUndefined(this.av[i].applVelocityLow) ? this.av[i].applVelocityLow : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3High = !_.isUndefined(this.av[i].applVelocityHigh) ? this.av[i].applVelocityHigh : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.ssn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3Ssn = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.adr) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3Address = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.phn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod3Phone = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                            }
                        }
                        break;
                    case 4:
                        for (let i = 0; i < this.av.length; i++) {
                            if (!_.isUndefined(this.av[i]) && this.av[i].bucket === bucket) {
                                if (this.componentName === 'threshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4Low = !_.isUndefined(this.av[i].lowDay) ? this.av[i].lowDay : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4High = !_.isUndefined(this.av[i].highDay) ? this.av[i].highDay : null;
                                }
                                if (this.componentName === 'retrothreshold') {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4Low = !_.isUndefined(this.av[i].applVelocityLow) ? this.av[i].applVelocityLow : null;
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4High = !_.isUndefined(this.av[i].applVelocityHigh) ? this.av[i].applVelocityHigh : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.ssn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4Ssn = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.adr) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4Address = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                                if (this.av[i].uuDeCode === UuDeCode.phn) {
                                    // tslint:disable-next-line:max-line-length
                                    this.applicationVelocity.applicationVelocityPeriod4Phone = !_.isUndefined(this.av[i].thresholdValue) ? this.av[i].thresholdValue : null;
                                }
                            }
                        }
                        break;
                    default:
                        return;
                }
            }
        } else {
            this.applicationVelocity.clearApplicationVelocity();
        }
    }
    saveApplicationVelocityData = (componentName) => {
        if (!_.isEmpty(this.applicationVelocity)) {
            this.componentName = componentName;
            this.listThresholdDataArray = [];
            for (let i = 0; i < this.totalBucket; i++) {
                const bucket = i + 1;
                switch (bucket) {
                    case 1:
                        if (this.applicationVelocity.applicationVelocityPeriod1Ssn != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod1Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod1Address != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod1Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod1Phone != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod1Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod1 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod1High, this.applicationVelocity.applicationVelocityPeriod1Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod1);
                            }
                        }
                        break;
                    case 2:
                        if (this.applicationVelocity.applicationVelocityPeriod2Ssn != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod2Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod2Address != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod2Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod2Phone != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod2Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod2 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod2);
                            }
                        }
                        break;
                    case 3:
                        if (this.applicationVelocity.applicationVelocityPeriod3Ssn != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod3Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod3Address != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod3Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod3Phone != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod3Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod3 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod2High, this.applicationVelocity.applicationVelocityPeriod2Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod3);
                            }
                        }
                        break;
                    case 4:
                        if (this.applicationVelocity.applicationVelocityPeriod4Ssn != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod4Ssn;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.ssn, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod4Address != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod4Address;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.adr, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                        }
                        if (this.applicationVelocity.applicationVelocityPeriod4Phone != null) {
                            const avThresHoldOption = this.applicationVelocity.applicationVelocityPeriod4Phone;
                            if (this.componentName === 'threshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                            if (this.componentName === 'retrothreshold') {
                                // tslint:disable-next-line:max-line-length
                                const applicationVelocityPeriod4 = this.thresholdService.createListRetroThresholdDataNode(UuDeCode.phn, bucket, this.applicationVelocity.applicationVelocityPeriod4High, this.applicationVelocity.applicationVelocityPeriod4Low, avThresHoldOption, '');
                                this.listThresholdDataArray.push(applicationVelocityPeriod4);
                            }
                        }
                        break;
                    default:
                        return;
                }
            }
            return this.listThresholdDataArray;
        }
    }
    cancelApplicationVelocityData = () => {
        this.appendToForm(this.tempResult, this.totalBucket, this.limited, this.extended, this.componentName);
    }
    isGreater = (first, second) => {
        if ((!_.isUndefined(first) || !_.isNull(first)) && (!_.isUndefined(second) || !_.isNull(second))) {
            console.log((first > second));
            return (first > second);
        }
    }
}
