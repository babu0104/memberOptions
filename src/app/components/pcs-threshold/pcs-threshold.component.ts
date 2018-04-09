import { Component, OnInit, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Pcs } from '../../memberOptionPcs';
import { Util } from '../../util';
import {
    Threshold, pcsThresholdBucket, payloadBucket, pcsThreshold,
    fraudType, FraudTypeAP, FraudTypePR, FraudTypeRR,
    PF, PF00, PF01, PF02, PF03, PF04, PF05, PF06, PF07, PF08, PF09, PF10, PF11, PF12, PF13, PF14
} from '../../_models/pcsthreshold/threshold';
import { ThresholdNode } from 'app/_models/threshold/thresholdNode';
import { PcsThresholdService } from '../../_services/pcsthreshold.service';
import * as _ from 'underscore';
import { forEach } from '@angular/router/src/utils/collection';
import { debug } from 'util';
import { throws } from 'assert';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppGlobal } from '../../_constants/global.static';
declare var $: any;
// import { ThresholdService } from 'app/_services/threshold.service';
// import { Threshold } from '../../pcs-thresholdService';
@Component({
    selector: 'app-pcs-threshold',
    templateUrl: './pcs-threshold.component.html',
    styleUrls: ['./pcs-threshold.component.scss'],
    providers: [Util, PcsThresholdService, MessageService]
})
export class PcsThresholdComponent implements OnInit {
    @Input() globalBin: string;
    @Output() changeGlobalBin = new EventEmitter();
    updatedBin = "";
    thresholds: string[] = ['Combined Approved and Declined Enrollments', 'PR', 'RR'];
    filteredthreshold: any[];
    thresholdvalue = 'Combined Approved and Declined Enrollments';
    msos: any[] = ["-select-"];
    filteredmso: any[];
    brand: string;
    prepaidOptionLabel = '';
    fraudTypes = [];
    totalBucket = 2;
    pcsThresholdBucketList = [];
    msgs: Message[] = [];
    defaultMso = "0";
    binErrMsg = "";
    binRelatedMsg = "";
    display = false;
    showThis: boolean = false;

    // @custom
    threshold: Threshold;
    pcsThreshold: pcsThreshold;
    prepaidOptionisExpanded = false;
    canShowLabel = false;
    bucketCollection: any;
    applVelo: any;

    // dynamic implementation
    fraduTypeAPModel: FraudTypeAP;
    fraudTypePRModel: FraudTypePR;
    fraudTypeRRModel: FraudTypeRR;
    // PF start here
    fraudTypePF00Model: PF00;
    fraudTypePF01Model: PF01;
    fraudTypePF02Model: PF02;
    fraudTypePF03Model: PF03;
    fraudTypePF04Model: PF04;
    fraudTypePF05Model: PF05;
    fraudTypePF06Model: PF06;
    fraudTypePF07Model: PF07;
    fraudTypePF08Model: PF08;
    fraudTypePF09Model: PF09;
    fraudTypePF10Model: PF10;
    fraudTypePF11Model: PF11;
    fraudTypePF12Model: PF12;
    fraudTypePF13Model: PF13;
    fraudTypePF14Model: PF14;
    // PF Ends here
    api: string;
    system = "PCS";
    errorMessage = '';
    fraudData: Array<any> = [];
    finalData: Array<any> = [];
    constructor(
        private el: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private _pcsThresHoldService: PcsThresholdService,
        private http: Http,
        private messageService: MessageService,
        private App: AppComponent,
        private _appGlobal: AppGlobal
    ) {
        this.api = environment.api;
        this.threshold = new Threshold();
        this.pcsThreshold = new pcsThreshold();
        // new implementation
        this.fraduTypeAPModel = new FraudTypeAP();
        this.fraudTypePRModel = new FraudTypePR();
        this.fraudTypeRRModel = new FraudTypeRR();
        // PF block
        this.fraudTypePF00Model = new PF00();
        this.fraudTypePF01Model = new PF01();
        this.fraudTypePF02Model = new PF02();
        this.fraudTypePF03Model = new PF03();
        this.fraudTypePF04Model = new PF04();
        this.fraudTypePF05Model = new PF05();
        this.fraudTypePF06Model = new PF06();
        this.fraudTypePF07Model = new PF07();
        this.fraudTypePF08Model = new PF08();
        this.fraudTypePF09Model = new PF09();
        this.fraudTypePF10Model = new PF10();
        this.fraudTypePF11Model = new PF11();
        this.fraudTypePF12Model = new PF12();
        this.fraudTypePF13Model = new PF13();
        this.fraudTypePF14Model = new PF14();
        this.renderTemplate();

    }

    renderTemplate = () => {
        let apMod = this.fraduTypeAPModel; apMod.title = this._appGlobal.PCSThreshold.FraudTypes.APtitle; apMod.clearModel();
        let rrMod = this.fraudTypeRRModel; rrMod.title = this._appGlobal.PCSThreshold.FraudTypes.RRtitle; rrMod.clearModel();
        let prMod = this.fraudTypeRRModel; prMod.title = this._appGlobal.PCSThreshold.FraudTypes.PRtitle; prMod.clearModel();
        let pf00 = this.fraudTypePF00Model; pf00.title = this._appGlobal.PCSThreshold.FraudTypes.PF00title; pf00.clearModel();
        let pf01 = this.fraudTypePF01Model; pf01.title = this._appGlobal.PCSThreshold.FraudTypes.PF01title; pf01.clearModel();
        let pf02 = this.fraudTypePF02Model; pf02.title = this._appGlobal.PCSThreshold.FraudTypes.PF02title; pf02.clearModel();
        let pf03 = this.fraudTypePF03Model; pf03.title = this._appGlobal.PCSThreshold.FraudTypes.PF03title; pf03.clearModel();
        let pf04 = this.fraudTypePF04Model; pf04.title = this._appGlobal.PCSThreshold.FraudTypes.PF04title; pf04.clearModel();
        let pf05 = this.fraudTypePF05Model; pf05.title = this._appGlobal.PCSThreshold.FraudTypes.PF05title; pf05.clearModel();
        let pf06 = this.fraudTypePF06Model; pf06.title = this._appGlobal.PCSThreshold.FraudTypes.PF06title; pf06.clearModel();
        let pf07 = this.fraudTypePF07Model; pf07.title = this._appGlobal.PCSThreshold.FraudTypes.PF07title; pf07.clearModel();
        let pf08 = this.fraudTypePF08Model; pf08.title = this._appGlobal.PCSThreshold.FraudTypes.PF08title; pf08.clearModel();
        let pf09 = this.fraudTypePF09Model; pf09.title = this._appGlobal.PCSThreshold.FraudTypes.PF09title; pf09.clearModel();
        let pf10 = this.fraudTypePF10Model; pf10.title = this._appGlobal.PCSThreshold.FraudTypes.PF10title; pf10.clearModel();
        let pf11 = this.fraudTypePF11Model; pf11.title = this._appGlobal.PCSThreshold.FraudTypes.PF11title; pf11.clearModel();
        let pf12 = this.fraudTypePF12Model; pf12.title = this._appGlobal.PCSThreshold.FraudTypes.PF12title; pf12.clearModel();
        let pf13 = this.fraudTypePF13Model; pf13.title = this._appGlobal.PCSThreshold.FraudTypes.PF13title; pf13.clearModel();
        let pf14 = this.fraudTypePF14Model; pf14.title = this._appGlobal.PCSThreshold.FraudTypes.PF14title; pf14.clearModel();
        this.finalData.push(apMod, prMod, rrMod, pf00, pf01, pf02, pf03, pf04, pf05, pf06, pf07, pf08, pf09, pf10, pf11, pf12, pf13, pf14);

    }
    ngOnInit() { this.prepaidOptionLabel = this._appGlobal.PCSThreshold.limittedLabel; }
    getBin() {
        this.threshold.icaBin = this.globalBin;
        this.getMSO();
    }
    onSubmit = (formData) => { this.constructBucketJSON(formData); }
    /**
     * setThresholdOption()
     */
    public setThresholdOptionLabel = (results) => {
        let optionVal = '';
        // f - > limitted
        // update prepaidOptionisExpanded here based on service response
        if (!_.isUndefined(results.pcsMemberOpationDto) && !_.isNull(results.pcsMemberOpationDto)) {
            optionVal = (results.pcsMemberOpationDto.thresoldOption === '1') ? 'l' : 'f';
            this.prepaidOptionisExpanded = (optionVal === 'l') ? false : true;
            this.prepaidOptionLabel = (optionVal === 'l') ? this._appGlobal.PCSThreshold.limittedLabel : this._appGlobal.PCSThreshold.extendedLabel;
            if (this.prepaidOptionisExpanded)
                this.totalBucket = 4; // update total bucket if extended
        }
    }

    public retrieveBucketData = (eve, scope) => {
        // This method used to get bucket details for PCS threshold
        this.threshold.system = this.system;
        const parentData = this.getThresHoldData(this.threshold);
    }

    public saveFraudTypeData = () => {
        this.fraudTypes = [];
        this.pcsThresholdBucketList = [];
        this.fraudTypes.push(
            this.fraduTypeAPModel, this.fraudTypePRModel, this.fraudTypeRRModel,
            this.fraudTypePF00Model, this.fraudTypePF01Model, this.fraudTypePF02Model, this.fraudTypePF03Model,
            this.fraudTypePF04Model, this.fraudTypePF05Model, this.fraudTypePF06Model, this.fraudTypePF07Model,
            this.fraudTypePF08Model, this.fraudTypePF09Model, this.fraudTypePF10Model, this.fraudTypePF11Model,
            this.fraudTypePF12Model, this.fraudTypePF13Model, this.fraudTypePF14Model
        ); // push all fraudTypes , do not change the order of models. follow the tab orders

        //write function to update respective models from form
        let tabs = $("p-accordiontab[class*='accordion-tab-']");
        let mergedData = this.mergeFormData(this.fraudTypes, tabs);
        for (let i = 0; i < this.fraudTypes.length; i++) {
            this.saveEachFraudTypeData(this.fraudTypes[i], i);
        }
        return this.pcsThresholdBucketList;
    }
    mergeFormData = (fraudTypeColleciton: any, accordionTabCollection) => {
        let elementList: Array<HTMLElement> = [];
        for (let x = 0; x < fraudTypeColleciton.length; x++) {
            let tab = accordionTabCollection[x];
            let inputCollections = tab.querySelectorAll("input");
            for (let m = 0; m < inputCollections.length; m++) {
                fraudTypeColleciton[x][inputCollections[m].name] = inputCollections[m].value == '' ? null : inputCollections[m].value;
            }
        }
        return fraudTypeColleciton;
    }

    public setUuDecode = (currentIndex, uuCodeType) => {
        const AP_UuDecodes = this._appGlobal.PCSThreshold.AP_UuDecodes;
        const PR_UuDecodes = this._appGlobal.PCSThreshold.PR_UuDecodes; // -> PR type should have "LR"  ["PRSSN", "PRPHN", "PRADR"];
        const RR_UuDecodes = this._appGlobal.PCSThreshold.RR_UuDecodes; // ["RRSSN", "RRPHN", "RRADR"];
        const PF00_UuDecodes = this._appGlobal.PCSThreshold.pf0_UuDecodes;    // ["UUS00", "UUP00", "UUA00"];
        const PF01_UuDecodes = this._appGlobal.PCSThreshold.pf1_UuDecodes;    // ["UUS01", "UUP01", "UUA01"];
        const PF02_UuDecodes = this._appGlobal.PCSThreshold.pf2_UuDecodes;
        const PF03_UuDecodes = this._appGlobal.PCSThreshold.pf3_UuDecodes;
        const PF04_UuDecodes = this._appGlobal.PCSThreshold.pf4_UuDecodes;
        const PF05_UuDecodes = this._appGlobal.PCSThreshold.pf5_UuDecodes;
        const PF06_UuDecodes = this._appGlobal.PCSThreshold.pf6_UuDecodes;
        const PF07_UuDecodes = this._appGlobal.PCSThreshold.pf7_UuDecodes;
        const PF08_UuDecodes = this._appGlobal.PCSThreshold.pf8_UuDecodes;
        const PF09_UuDecodes = this._appGlobal.PCSThreshold.pf9_UuDecodes;
        const PF10_UuDecodes = this._appGlobal.PCSThreshold.pf10_UuDecodes;
        const PF11_UuDecodes = this._appGlobal.PCSThreshold.pf11_UuDecodes;
        const PF12_UuDecodes = this._appGlobal.PCSThreshold.pf12_UuDecodes;
        const PF13_UuDecodes = this._appGlobal.PCSThreshold.pf13_UuDecodes;
        const PF14_UuDecodes = this._appGlobal.PCSThreshold.pf14_UuDecodes;
        const All_UuDecodes = [
            AP_UuDecodes, PR_UuDecodes, RR_UuDecodes,
            PF00_UuDecodes, PF01_UuDecodes, PF02_UuDecodes, PF03_UuDecodes, PF04_UuDecodes,
            PF05_UuDecodes, PF06_UuDecodes, PF07_UuDecodes, PF08_UuDecodes, PF09_UuDecodes,
            PF10_UuDecodes, PF11_UuDecodes, PF12_UuDecodes, PF13_UuDecodes, PF14_UuDecodes
        ];
        const uuDeCodes = All_UuDecodes[currentIndex];
        let currentUuDecode = '';
        for (let i = 0; i < uuDeCodes.length; i++) {
            if (uuDeCodes[i].indexOf(uuCodeType) !== -1) {
                currentUuDecode = uuDeCodes[i];
            }
        }
        return currentUuDecode;
    }

    tapOpen = (event, scope) => { this.showThis = true; }

    saveEachFraudTypeData = (currentFraudType, currentIndex) => {
        if (!_.isEmpty(currentFraudType)) {
            this.totalBucket = (this.prepaidOptionisExpanded) ? 4 : 2; // 2 or 4 based on limited or extended
            for (let i = 0; i < this.totalBucket; i++) {
                const bucket = i + 1;
                switch (bucket) {
                    case 1:
                        if (currentFraudType.period_1_ssn != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'S' : 'SSN';
                            // if current index >=3 then it is for PF( UU type) , since it has only one charcode, change accordingly
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_ssn;
                            const appVelocityThresholdAmt = currentFraudType.period_1_ssnAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_id != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'T' : 'STA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_id;
                            const appVelocityThresholdAmt = currentFraudType.period_1_idAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_adr != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'A' : 'ADR';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_adr;
                            const appVelocityThresholdAmt = currentFraudType.period_1_adrAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_ph != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'P' : 'PHN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_ph;
                            const appVelocityThresholdAmt = currentFraudType.period_1_phAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_device != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'D' : 'DVC';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_device;
                            const appVelocityThresholdAmt = currentFraudType.period_1_deviceAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_ip != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'I' : 'IPA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_ip;
                            const appVelocityThresholdAmt = currentFraudType.period_1_ipAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_email != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'E' : 'EML';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_email;
                            const appVelocityThresholdAmt = currentFraudType.period_1_emailAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_1_fund != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'F' : 'FUN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_1_fund;
                            const appVelocityThresholdAmt = currentFraudType.period_1_fundAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_1_high, currentFraudType.period_1_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        break;
                    case 2:
                        if (currentFraudType.period_2_ssn != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'S' : 'SSN';
                            // if current index >=3 then it is for PF( UU type) , since it has only one charcode, change accordingly
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_ssn;
                            const appVelocityThresholdAmt = currentFraudType.period_2_ssnAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_2_id != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'T' : 'STA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_id;
                            const appVelocityThresholdAmt = currentFraudType.period_2_idAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_2_adr != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'A' : 'ADR';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_adr;
                            const appVelocityThresholdAmt = currentFraudType.period_2_adrAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_2_ph != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'P' : 'PHN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_ph;
                            const appVelocityThresholdAmt = currentFraudType.period_2_phAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }

                        if (currentFraudType.period_2_device != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'D' : 'DVC';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_device;
                            const appVelocityThresholdAmt = currentFraudType.period_2_deviceAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_2_ip != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'I' : 'IPA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_2_ip;
                            const appVelocityThresholdAmt = currentFraudType.period_2_ipAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }

                        if (currentFraudType.period_2_email != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'E' : 'EML';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);

                            const appVelocityThreshold = currentFraudType.period_2_email;
                            const appVelocityThresholdAmt = currentFraudType.period_2_emailAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_2_fund != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'F' : 'FUN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);

                            const appVelocityThreshold = currentFraudType.period_2_fund;
                            const appVelocityThresholdAmt = currentFraudType.period_2_fundAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_2_high, currentFraudType.period_2_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        break;
                    case 3:
                        if (currentFraudType.period_3_ssn != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'S' : 'SSN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_ssn;
                            const appVelocityThresholdAmt = currentFraudType.period_3_ssnAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_3_id != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'T' : 'STA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_id;
                            const appVelocityThresholdAmt = currentFraudType.period_3_idAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_3_adr != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'A' : 'ADR';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_adr;
                            const appVelocityThresholdAmt = currentFraudType.period_3_adrAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_3_ph != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'P' : 'PHN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_ph;
                            const appVelocityThresholdAmt = currentFraudType.period_3_phAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }

                        if (currentFraudType.period_3_device != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'D' : 'DVC';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_device;
                            const appVelocityThresholdAmt = currentFraudType.period_3_deviceAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_3_ip != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'I' : 'IPA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_ip;
                            const appVelocityThresholdAmt = currentFraudType.period_3_ipAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }

                        if (currentFraudType.period_3_email != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'E' : 'EML';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_email;
                            const appVelocityThresholdAmt = currentFraudType.period_3_emailAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_3_fund != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'F' : 'FUN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_3_fund;
                            const appVelocityThresholdAmt = currentFraudType.period_3_fundAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_3_high, currentFraudType.period_3_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        break;
                    case 4:
                        if (currentFraudType.period_4_ssn != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'S' : 'SSN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_ssn;
                            const appVelocityThresholdAmt = currentFraudType.period_4_ssnAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_id != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'T' : 'STA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_id;
                            const appVelocityThresholdAmt = currentFraudType.period_4_idAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_adr != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'A' : 'ADR';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_adr;
                            const appVelocityThresholdAmt = currentFraudType.period_4_adrAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_ph != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'P' : 'PHN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_ph;
                            const appVelocityThresholdAmt = currentFraudType.period_4_phAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_device != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'D' : 'DVC';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_device;
                            const appVelocityThresholdAmt = currentFraudType.period_4_deviceAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_ip != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'I' : 'IPA';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_ip;
                            const appVelocityThresholdAmt = currentFraudType.period_4_ipAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_email != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'E' : 'EML';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_email;
                            const appVelocityThresholdAmt = currentFraudType.period_4_emailAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        if (currentFraudType.period_4_fund != null) {
                            const uuCodeType = (currentIndex >= 3) ? 'F' : 'FUN';
                            const uuDeCode = this.setUuDecode(currentIndex, uuCodeType);
                            const appVelocityThreshold = currentFraudType.period_4_fund;
                            const appVelocityThresholdAmt = currentFraudType.period_4_fundAmt;
                            // tslint:disable-next-line:max-line-length
                            const currentFraudTypeData = this._pcsThresHoldService.createBucket(uuDeCode, bucket, currentFraudType.period_4_high, currentFraudType.period_4_low, appVelocityThreshold, appVelocityThresholdAmt);
                            this.pcsThresholdBucketList.push(currentFraudTypeData);
                        }
                        break;
                    default:
                        return;
                }
            }
        }
    }

    /**
     * getMSO(event, dom)
     * method : POST
     * arguments : bin @ JSON
     * */
    public getMSO = () => {
        const _self = this;
        this.msos = []; // intialize to empty
        const payLoad = this.threshold;
        this._pcsThresHoldService.getMsos(payLoad)
            .subscribe(results => {
                _.each(results, function (el, index) {
                    _self.msos.push(el);
                });
                if ((!_.isNull(this.msos) || (!_.isUndefined(this.msos)) && this.msos.includes("0"))) {
                    this.threshold.mso = this.defaultMso;
                }
            });
    }
    public splitFraudTypeData = (response) => {
        const fraudTypeAPArray = [];
        const fraudTypePRArray = [];
        const fraudTypeRRArray = [];
        // PF starts here
        const fraudPFColleciton = [];
        const fraudModelCollections = [];
        const fraudTypePF00 = []; const fraudTypePF01 = []; const fraudTypePF02 = []; const fraudTypePF03 = []; const fraudTypePF04 = [];
        const fraudTypePF05 = []; const fraudTypePF06 = []; const fraudTypePF07 = []; const fraudTypePF08 = []; const fraudTypePF09 = [];
        const fraudTypePF10 = []; const fraudTypePF11 = []; const fraudTypePF12 = []; const fraudTypePF13 = []; const fraudTypePF14 = [];
        // PF ends here
        if (_.isNull(response.pcsThresholdDataDto) || _.isUndefined(response.pcsThresholdDataDto)) return;
        else {
            this.finalData = [];
            const isAp = response.pcsThresholdDataDto.pcsThresholdUuDataDto.filter(function (node) {
                const isDEExist = node.applVelo.indexOf('DE');
                const isAPExist = node.applVelo.indexOf('AP');
                if ((isAPExist > -1) || (isDEExist > -1)) fraudTypeAPArray.push(node);

                const isPRExist = node.applVelo.indexOf('LR'); // PR means LR here
                if (isPRExist > -1) fraudTypePRArray.push(node);

                const isRRExist = node.applVelo.indexOf('RR');
                if (isRRExist > -1) fraudTypeRRArray.push(node);

                const isPF00Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('00')));
                if (isPF00Exist) fraudTypePF00.push(node);

                const isPF01Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('01')));
                if (isPF01Exist) fraudTypePF01.push(node);

                const isPF02Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('02')));
                if (isPF02Exist) fraudTypePF02.push(node);

                const isPF03Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('03')));
                if (isPF03Exist) fraudTypePF03.push(node);

                const isPF04Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('04')));
                if (isPF04Exist) fraudTypePF04.push(node);

                const isPF05Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('05')));
                if (isPF05Exist) fraudTypePF05.push(node);

                const isPF06Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('06')));
                if (isPF06Exist) fraudTypePF06.push(node);

                const isPF07Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('07')));
                if (isPF07Exist) fraudTypePF07.push(node);

                const isPF08Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('08')));
                if (isPF08Exist) fraudTypePF08.push(node);

                const isPF09Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('09')));
                if (isPF09Exist) fraudTypePF09.push(node);

                const isPF10Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('10')));
                if (isPF10Exist) fraudTypePF10.push(node);

                const isPF11Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('11')));
                if (isPF11Exist) fraudTypePF11.push(node);

                const isPF12Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('12')));
                if (isPF12Exist) fraudTypePF12.push(node);

                const isPF13Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('13')));
                if (isPF13Exist) fraudTypePF13.push(node);

                const isPF14Exist = (node.applVelo.startsWith('UU') && (node.applVelo.endsWith('14')));
                if (isPF14Exist) fraudTypePF14.push(node);

            });
            let APresult = this.updateFraudType(fraudTypeAPArray, this.fraduTypeAPModel); APresult.title = this._appGlobal.PCSThreshold.FraudTypes.APtitle;
            let PRResult = this.updateFraudType(fraudTypePRArray, this.fraudTypePRModel); PRResult.title = this._appGlobal.PCSThreshold.FraudTypes.PRtitle;;
            let RRResult = this.updateFraudType(fraudTypeRRArray, this.fraudTypeRRModel); RRResult.title = this._appGlobal.PCSThreshold.FraudTypes.RRtitle;;
            this.finalData.push(APresult, PRResult, RRResult);
            // let PRResult = this.updateFraudTypePR(fraudTypePRArray); PRResult.title = "PR"; PRResult.modelName = "fraudTypePRModel";
            // let RRResult = this.updateFraudTypeRR(fraudTypeRRArray); RRResult.title = "RR"; RRResult.modelName = "fraudTypeRRModel";
            // PF FraudType block begins here
            fraudModelCollections.push(this.fraudTypePF00Model, this.fraudTypePF01Model, this.fraudTypePF02Model, this.fraudTypePF03Model,
                this.fraudTypePF04Model, this.fraudTypePF05Model, this.fraudTypePF06Model, this.fraudTypePF07Model,
                this.fraudTypePF08Model, this.fraudTypePF09Model, this.fraudTypePF10Model, this.fraudTypePF11Model,
                this.fraudTypePF12Model, this.fraudTypePF13Model, this.fraudTypePF14Model);

            fraudPFColleciton.push(fraudTypePF00, fraudTypePF01, fraudTypePF02, fraudTypePF03, fraudTypePF04, fraudTypePF05,
                fraudTypePF06, fraudTypePF07, fraudTypePF08, fraudTypePF09, fraudTypePF10,
                fraudTypePF11, fraudTypePF12, fraudTypePF13, fraudTypePF14);

            let pfCollections = this.updateFraudTypePF(fraudPFColleciton, fraudModelCollections); // result from every loop is individual fraud type  
            this.finalData = this.finalData.concat(pfCollections); // concatinate first three array with pf collection
        }
    }

    // updateFraudType
    public updateFraudType = (fraudData, model) => {
        const _self = this;
        let currentBucket: any = '';
        let p1_low: any = ''; let p1_high: any = ''; let p2_low: any = ''; let p2_high: any = '';
        let p3_low: any = ''; let p3_high: any = ''; let p4_low: any = ''; let p4_high: any = '';
        for (let i = 0; i < fraudData.length; i++) {
            currentBucket = parseInt(fraudData[i].bucket, 10);
            switch (currentBucket) {
                case 1:
                    if (fraudData[i].appVelocityLow != null)
                        p1_low = fraudData[i].appVelocityLow;

                    if (fraudData[i].applVelocityHigh != null)
                        p1_high = fraudData[i].applVelocityHigh;

                    if (fraudData[i].applVelo.indexOf('SSN') > -1) {
                        model.period_1_ssn = fraudData[i].appVelocityThreshold;
                        model.period_1_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('STA') > -1) {
                        model.period_1_id = fraudData[i].appVelocityThreshold;
                        model.period_1_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('ADR') > -1) {
                        model.period_1_adr = fraudData[i].appVelocityThreshold;
                        model.period_1_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('PHN') > -1) {
                        model.period_1_ph = fraudData[i].appVelocityThreshold;
                        model.period_1_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('DVC') > -1) {
                        model.period_1_device = fraudData[i].appVelocityThreshold;
                        model.period_1_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('IPA') > -1) {
                        model.period_1_ip = fraudData[i].appVelocityThreshold;
                        model.period_1_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('EML') > -1) {
                        model.period_1_email = fraudData[i].appVelocityThreshold;
                        model.period_1_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('FUN') > -1) {
                        model.period_1_fund = fraudData[i].appVelocityThreshold;
                        model.period_1_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = p1_high;
                        model.period_1_low = p1_low;
                        model.bucket = currentBucket;
                    }

                    break;
                case 2:
                    if (fraudData[i].appVelocityLow != null)
                        p2_low = fraudData[i].appVelocityLow;

                    if (fraudData[i].applVelocityHigh != null)
                        p2_high = fraudData[i].applVelocityHigh;

                    if (fraudData[i].applVelo.indexOf('SSN') > -1) {
                        model.period_2_ssn = fraudData[i].appVelocityThreshold;
                        model.period_2_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('STA') > -1) {
                        model.period_2_id = fraudData[i].appVelocityThreshold;
                        model.period_2_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('ADR') > -1) {
                        model.period_2_adr = fraudData[i].appVelocityThreshold;
                        model.period_2_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('PHN') > -1) {
                        model.period_2_ph = fraudData[i].appVelocityThreshold;
                        model.period_2_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('DVC') > -1) {
                        model.period_2_device = fraudData[i].appVelocityThreshold;
                        model.period_2_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('IPA') > -1) {
                        model.period_2_ip = fraudData[i].appVelocityThreshold;
                        model.period_2_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('EML') > -1) {
                        model.period_2_email = fraudData[i].appVelocityThreshold;
                        model.period_2_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('FUN') > -1) {
                        model.period_2_fund = fraudData[i].appVelocityThreshold;
                        model.period_2_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = p2_high;
                        model.period_2_low = p2_low;
                        // model.period_2_high = fraudData[i].applVelocityHigh;
                        // model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    break;
                case 3:
                    if (fraudData[i].appVelocityLow != null)
                        p3_low = fraudData[i].appVelocityLow;

                    if (fraudData[i].applVelocityHigh != null)
                        p3_high = fraudData[i].applVelocityHigh;

                    if (fraudData[i].applVelo.indexOf('SSN') > -1) {
                        model.period_3_ssn = fraudData[i].appVelocityThreshold;
                        model.period_3_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        // model.period_3_high = fraudData[i].applVelocityHigh;
                        // model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('STA') > -1) {
                        model.period_3_id = fraudData[i].appVelocityThreshold;
                        model.period_3_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('ADR') > -1) {
                        model.period_3_adr = fraudData[i].appVelocityThreshold;
                        model.period_3_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('PHN') > -1) {
                        model.period_3_ph = fraudData[i].appVelocityThreshold;
                        model.period_3_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('DVC') > -1) {
                        model.period_3_device = fraudData[i].appVelocityThreshold;
                        model.period_3_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('IPA') > -1) {
                        model.period_3_ip = fraudData[i].appVelocityThreshold;
                        model.period_3_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('EML') > -1) {
                        model.period_3_email = fraudData[i].appVelocityThreshold;
                        model.period_3_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('FUN') > -1) {
                        model.period_3_fund = fraudData[i].appVelocityThreshold;
                        model.period_3_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = p3_high;
                        model.period_3_low = p3_low;
                        model.bucket = currentBucket;
                    }
                    break;
                case 4:
                    if (fraudData[i].appVelocityLow != null)
                        p4_low = fraudData[i].appVelocityLow;

                    if (fraudData[i].applVelocityHigh != null)
                        p4_high = fraudData[i].applVelocityHigh;

                    if (fraudData[i].applVelo.indexOf('SSN') > -1) {
                        model.period_4_ssn = fraudData[i].appVelocityThreshold;
                        model.period_4_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('STA') > -1) {
                        model.period_4_id = fraudData[i].appVelocityThreshold;
                        model.period_4_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        // model.period_4_high = fraudData[i].applVelocityHigh;
                        // model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('ADR') > -1) {
                        model.period_4_adr = fraudData[i].appVelocityThreshold;
                        model.period_4_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('PHN') > -1) {
                        model.period_4_ph = fraudData[i].appVelocityThreshold;
                        model.period_4_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('DVC') > -1) {
                        model.period_4_device = fraudData[i].appVelocityThreshold;
                        model.period_4_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('IPA') > -1) {
                        model.period_4_ip = fraudData[i].appVelocityThreshold;
                        model.period_4_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('EML') > -1) {
                        model.period_4_email = fraudData[i].appVelocityThreshold;
                        model.period_4_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('FUN') > -1) {
                        model.period_4_fund = fraudData[i].appVelocityThreshold;
                        model.period_4_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = p4_high;
                        model.period_4_low = p4_low;
                        model.bucket = currentBucket;
                    }
                    break;
                default:
                    break;
            }
        }
        return model;
    }

    public updateFraudTypePF = (fraudDataCollection, fraudDataModel) => {
        const currentBucket: any = '';
        let result = [];
        for (let i = 0; i < fraudDataCollection.length; i++) {
            result.push(this.updateEachFraudType(fraudDataCollection[i], fraudDataModel[i], i))
        }
        return result;
    }
    public updateEachFraudType = (fraudData, model, index) => {
        let res = [];
        let currentBucket: any = '';
        for (let i = 0; i < fraudData.length; i++) {
            currentBucket = parseInt(fraudData[i].bucket, 10);
            switch (currentBucket) {
                case 1:
                    if (fraudData[i].applVelo.indexOf('S') > -1) {
                        model.period_1_ssn = fraudData[i].appVelocityThreshold;
                        model.period_1_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('T') > -1) {
                        model.period_1_id = fraudData[i].appVelocityThreshold;
                        model.period_1_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('A') > -1) {
                        model.period_1_adr = fraudData[i].appVelocityThreshold;
                        model.period_1_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('P') > -1) {
                        model.period_1_ph = fraudData[i].appVelocityThreshold;
                        model.period_1_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('D') > -1) {
                        model.period_1_device = fraudData[i].appVelocityThreshold;
                        model.period_1_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('I') > -1) {
                        model.period_1_ip = fraudData[i].appVelocityThreshold;
                        model.period_1_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('E') > -1) {
                        model.period_1_email = fraudData[i].appVelocityThreshold;
                        model.period_1_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('F') > -1) {
                        model.period_1_fund = fraudData[i].appVelocityThreshold;
                        model.period_1_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_1_high = fraudData[i].applVelocityHigh;
                        model.period_1_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    break;
                case 2:
                    if (fraudData[i].applVelo.indexOf('S') > -1) {
                        model.period_2_ssn = fraudData[i].appVelocityThreshold;
                        model.period_2_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('T') > -1) {
                        model.period_2_id = fraudData[i].appVelocityThreshold;
                        model.period_2_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('A') > -1) {
                        model.period_2_adr = fraudData[i].appVelocityThreshold;
                        model.period_2_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('P') > -1) {
                        model.period_2_ph = fraudData[i].appVelocityThreshold;
                        model.period_2_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('D') > -1) {
                        model.period_2_device = fraudData[i].appVelocityThreshold;
                        model.period_2_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('I') > -1) {
                        model.period_2_ip = fraudData[i].appVelocityThreshold;
                        model.period_2_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('E') > -1) {
                        model.period_2_email = fraudData[i].appVelocityThreshold;
                        model.period_2_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('F') > -1) {
                        model.period_2_fund = fraudData[i].appVelocityThreshold;
                        model.period_2_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_2_high = fraudData[i].applVelocityHigh;
                        model.period_2_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    break;
                case 3:
                    if (fraudData[i].applVelo.indexOf('S') > -1) {
                        model.period_3_ssn = fraudData[i].appVelocityThreshold;
                        model.period_3_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('T') > -1) {
                        model.period_3_id = fraudData[i].appVelocityThreshold;
                        model.period_3_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('A') > -1) {
                        model.period_3_adr = fraudData[i].appVelocityThreshold;
                        model.period_3_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('P') > -1) {
                        model.period_3_ph = fraudData[i].appVelocityThreshold;
                        model.period_3_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('D') > -1) {
                        model.period_3_device = fraudData[i].appVelocityThreshold;
                        model.period_3_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('I') > -1) {
                        model.period_3_ip = fraudData[i].appVelocityThreshold;
                        model.period_3_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('E') > -1) {
                        model.period_3_email = fraudData[i].appVelocityThreshold;
                        model.period_3_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('F') > -1) {
                        model.period_3_fund = fraudData[i].appVelocityThreshold;
                        model.period_3_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_3_high = fraudData[i].applVelocityHigh;
                        model.period_3_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    break;
                case 4:
                    if (fraudData[i].applVelo.indexOf('S') > -1) {
                        model.period_4_ssn = fraudData[i].appVelocityThreshold;
                        model.period_4_ssnAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('T') > -1) {
                        model.period_4_id = fraudData[i].appVelocityThreshold;
                        model.period_4_idAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('A') > -1) {
                        model.period_4_adr = fraudData[i].appVelocityThreshold;
                        model.period_4_adrAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('P') > -1) {
                        model.period_4_ph = fraudData[i].appVelocityThreshold;
                        model.period_4_phAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('D') > -1) {
                        model.period_4_device = fraudData[i].appVelocityThreshold;
                        model.period_4_deviceAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('I') > -1) {
                        model.period_4_ip = fraudData[i].appVelocityThreshold;
                        model.period_4_ipAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('E') > -1) {
                        model.period_4_email = fraudData[i].appVelocityThreshold;
                        model.period_4_emailAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    if (fraudData[i].applVelo.indexOf('F') > -1) {
                        model.period_4_fund = fraudData[i].appVelocityThreshold;
                        model.period_4_fundAmt = fraudData[i].appVelocityThresholdAmt;
                        model.period_4_high = fraudData[i].applVelocityHigh;
                        model.period_4_low = fraudData[i].appVelocityLow;
                        model.bucket = currentBucket;
                    }
                    break;
                default:
                    break;
            }
        }
        return model;
    }

    /**
     * Name - getThresHold
     * Type - Post
     * @payload sample
      {	"icaBin":"bino1",
        "mso":"vv"
      }
     */
    public getThresHoldData = (param) => {
        this.App.displayloader();
        if (param.mso === undefined || param.mso === '' || param.mso === null) {
            param.mso = this.defaultMso;
        }
        const payLoad = (!_.isUndefined(param) || !_.isNull(param)) ? param : 'null';
        let r = this._pcsThresHoldService.getThresholdData(payLoad)
            .subscribe(results => {
                const result = results;
                if (!_.isNull(result.pcsThresholdDataDto)) {
                    if (!_.isUndefined(result.pcsThresholdDataDto.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.pcsThresholdDataDto.errors.BinValidation)) {
                        this.binRelatedMsg = result.pcsThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                        this.binErrMsg = result.pcsThresholdDataDto.errors.BinValidation;
                        this.App.hideloader();
                        this.display = true;
                    } else {
                        this.clearFormData();
                        this.setThresholdOptionLabel(results);
                        this.splitFraudTypeData(results);
                        this.updatedBin = results.pcsMemberOpationDto.icaBin
                        this.changeGlobalBin.emit(this.updatedBin);
                        this.App.hideloader();
                    }
                }
            },
            err => {
                err = err.json();
                console.log(err.message);
                this.App.hideloader();
            }
        );
        this.App.hideloader();
        return r;
    }

    /**
     * buildBucketJSON(formdata)
     * @argument - form data
     * constructJSON here to be sent
     */
    public constructBucketJSON = (formdata) => {
        /* Creation and saving of pcs threshold node*/
        const dataListOfBuckets = this.saveFraudTypeData();
        const icaBin = this.threshold.icaBin;  // bin is 5 characters long
        if (this.threshold.mso === undefined || this.threshold.mso === '' || this.threshold.mso === null)
            this.threshold.mso = this.defaultMso;

        const mso = this.threshold.mso; // mso is 2 characters long
        const reponseCode = '1';
        const lastUpdatedUserId = 'userID';
        const loadTS = '2017-07-07'; // loadTS should be of this format
        // tslint:disable-next-line:max-line-length
        const newPcsThresholdDataNode = this._pcsThresHoldService.createPcsThresholdFinalDataNode(icaBin, mso, this.system, reponseCode, lastUpdatedUserId, loadTS, dataListOfBuckets);
        this.ThresholdDataSave(newPcsThresholdDataNode);
    }

    public ThresholdDataSave = (threshold) => {
        this.App.displayloader();
        const url = this.api + '/mo/pcs/threshold';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        // this.http.put(url, JSON.stringify(threshold), options)
        this._pcsThresHoldService.saveThresholdData(threshold)
            .subscribe(
            data => {
                this.App.displayloader();
                const result = data;
                const isErrorPresent = Object.keys(result.errors);
                if (!_.isUndefined(result) && !_.isNull(result) && (!_.isNull(result.pcsThresholdDataDto))) { // || !_.isUndefined(result.pcsThresholdDataDto.errors.BinValidation)
                    if(isErrorPresent.length > 0){
                        if (!_.isNull(result.errors)) {
                            this.binRelatedMsg = result.pcsThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                            this.binErrMsg = result.pcsThresholdDataDto.errors.BinValidation;
                            this.App.hideloader();
                            this.display = true;
                        }
                    } else {
                        this.App.hideloader();
                        this.updatedBin = result.icaBin;
                        this.changeGlobalBin.emit(this.updatedBin);
                        this.showSuccess();
                        this.clearFormData();
                    }
                }
            },
            err => {
                this.App.hideloader();
                this.showError('User save/updation failed');
            });
    }

    onThresholdSelect(event) {
    }

    filtermso = (event) => {
        this.filteredmso = [];
        for (let i = 0; i < this.msos.length; i++) {
            const brand = this.msos[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                if (brand !== "0") this.filteredmso.push(brand);
            }
        }
    }

    filterthreshold = (event) => {
        this.filteredthreshold = [];
        for (let i = 0; i < this.thresholds.length; i++) {
            const threshold = this.thresholds[i];
            if (threshold.toLowerCase().indexOf(event.query.toLowerCase()) === 0)
                this.filteredthreshold.push(threshold);
        }
    }



    retrieve = (value) => {
        const div = this.document.getElementsByClassName('retrieve-data');
        div[value].classList.add('show');
    }

    clear = () => { }

    public clearFormData = () => {
        this.fraduTypeAPModel.clearModel();
        this.fraudTypeRRModel.clearModel();
        this.fraudTypePRModel.clearModel();
        this.fraudTypePF00Model.clearModel()
        this.fraudTypePF01Model.clearModel()
        this.fraudTypePF02Model.clearModel()
        this.fraudTypePF03Model.clearModel()
        this.fraudTypePF04Model.clearModel()
        this.fraudTypePF05Model.clearModel()
        this.fraudTypePF06Model.clearModel()
        this.fraudTypePF07Model.clearModel()
        this.fraudTypePF08Model.clearModel()
        this.fraudTypePF09Model.clearModel()
        this.fraudTypePF10Model.clearModel()
        this.fraudTypePF11Model.clearModel()
        this.fraudTypePF12Model.clearModel()
        this.fraudTypePF13Model.clearModel()
        this.fraudTypePF14Model.clearModel()
    }

    showSuccess = () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'User save/updation successfull' });
    }

    showError = (errorMessage) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
    }
}
