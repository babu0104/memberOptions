import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'underscore';
import { ThresholdService } from '../../_services/threshold.service';
import { Threshold } from '../../_models/threshold/threshold';
import { element } from 'protractor';
import { debug } from 'util';
import { ApplicationVelocityComponent } from '../application-velocity/application-velocity.component';
import { UnauthorisedUserComponent } from '../unauthorised-user/unauthorised-user.component';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'app-retro-threshold',
    templateUrl: './retro-threshold.component.html',
    styleUrls: ['./retro-threshold.component.scss'],
    providers: [MessageService, ThresholdService]
})
export class RetroThresholdComponent implements OnInit {
    @ViewChild(ApplicationVelocityComponent) appVelocity: ApplicationVelocityComponent;
    @ViewChild(UnauthorisedUserComponent) unauthorisedUser: UnauthorisedUserComponent;
    @Input() globalBin: string;
    @Output() changeGlobalBin = new EventEmitter();
    updatedBin = '';
    componentName = 'retrothreshold';
    thresholdFormValid = false;
    filteredOptions: any[];
    msos: string[] = [];
    mso: string;
    filteredMsos: any[];
    thresholdOption;
    assocFlag: string;
    defaultMso = '0';
    limited = true;
    extended = false;
    default = true;
    msgs: Message[] = [];
    totalBucket = 2;
    threshold = new Threshold();
    listRetroThresholdDataArray = [];
    thresholdNode = {};
    api: string;
    errorMessage = '';
    system = 'ICS';
    defaultValue1 = '1';
    defaultValue90 = '90';
    defaultValue365 = '365';
    defaultValue1462 = '1462';
    binErrMsg = '';
    binRelatedMsg = '';
    display = false;
    constructor(
        private thresholdService: ThresholdService,
        private http: Http,
        private _http: HttpClient,
        private messageService: MessageService,
        private App: AppComponent
    ) {
        this.api = environment.api;
    }
    ngOnInit() { }
    getData = () => {
        this.threshold.bin = this.globalBin;
        const bin = this.threshold.bin;
        this.fetchMso(bin);
    }
    fetchMso = (icaBin) => {
        const url = this.api + '/mo/retroThreshold/mso';
        const body = { 'icaBin': icaBin };
        this.thresholdService.fetchMso(url, body).subscribe(
            res => {
                this.msos = res;
                if (this.msos !== null) {
                    if (this.msos.includes('0')) {
                        this.threshold.mso = this.defaultMso;
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }
    retrieveThreshold = (icaBin, mso) => {
        let result;
        if (mso === undefined || mso === '' || mso === null) {
            mso = this.defaultMso;
        }
        this.App.displayloader();
        const url = this.api + '/mo/getRetroThresAndOpt';
        const body = { 'icaBin': icaBin, 'mso': mso, 'system': this.system };
        this.thresholdService.fetchMso(url, body).subscribe(
            res => {
                result = res;
                this.updatedBin = result.icsMemberOptionTblDto.icaBin;
                this.changeGlobalBin.emit(this.updatedBin);
                const self = this;
                if (!_.isUndefined(result.icsMemberOptionTblDto)) {
                    // tslint:disable-next-line:max-line-length
                    if (!_.isNull(result.icsRetroThresholdDataDto)) {
                        if (!_.isUndefined(result.icsRetroThresholdDataDto.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.icsRetroThresholdDataDto.errors.BinValidation)) {
                            self.binRelatedMsg = result.icsRetroThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                            self.binErrMsg = result.icsRetroThresholdDataDto.errors.BinValidation;
                            self.App.hideloader();
                            self.display = true;
                        } else {
                            self.assocFlag = 'v';
                            self.default = (result.length > 0) ? false : true;
                            self.threshold.nonBankcard = (result.icsMemberOptionTblDto.nonBankcardMSO === '1') ? 'Yes' : 'No';
                            this.thresholdOption = result.icsMemberOptionTblDto.thresoldOption;
                            this.extended = (this.thresholdOption === '0') ? true : false;
                            this.totalBucket = this.extended ? 4 : 2;
                            // tslint:disable-next-line:max-line-length
                            self.appVelocity.appendToForm(result, this.totalBucket, this.limited, this.extended, this.componentName); // appending application velocity data
                            // tslint:disable-next-line:max-line-length
                            self.unauthorisedUser.appendToForm(result, this.totalBucket, this.limited, this.extended, this.componentName); // appending unauthorised user data
                            this.App.hideloader();
                        }
                    }
                }
            },
            err => {
                this.App.hideloader();
                console.log(err);
                err = err.errors;
                this.errorMessage = err.errorInfo;
                this.showError(this.errorMessage);
            }
        );
        this.App.hideloader();
    }
    saveThreshold = (icsRetroThresholdForm: NgForm) => {
        this.App.displayloader();
        const applicationVelocityData = this.appVelocity.saveApplicationVelocityData(this.componentName);
        this.listRetroThresholdDataArray = [];
        if (!_.isUndefined(applicationVelocityData) && (applicationVelocityData.length)) {
            for (let i = 0; i < applicationVelocityData.length; i++) {
                this.listRetroThresholdDataArray.push(applicationVelocityData[i]);
            }
        }
        const unauthorisedUserData = this.unauthorisedUser.saveUnauthorisedUserData(this.componentName);
        if (!_.isUndefined(unauthorisedUserData) && (unauthorisedUserData.length)) {
            for (let i = 0; i < unauthorisedUserData.length; i++) {
                this.listRetroThresholdDataArray.push(unauthorisedUserData[i]);
            }
        }
        const retroThresholdDataLength = this.listRetroThresholdDataArray.length;
        if (retroThresholdDataLength > 0) {
            for (let i = 0; i < retroThresholdDataLength; i++) {
                this.listRetroThresholdDataArray[i].applVelocityLow = parseInt(this.listRetroThresholdDataArray[i].applVelocityLow, 10);
                this.listRetroThresholdDataArray[i].applVelocityHigh = parseInt(this.listRetroThresholdDataArray[i].applVelocityHigh, 10);
                this.listRetroThresholdDataArray[i].thresholdValue = parseInt(this.listRetroThresholdDataArray[i].thresholdValue, 10);
            }
            const url = this.api + '/mo/retroThreshold';
            this.threshold.assocFlag = 'v';
            this.threshold.lastUpdatedUserId = localStorage.currentUser;
            this.threshold.name = 'name';
            if (this.threshold.mso === undefined || this.threshold.mso === '' || this.threshold.mso === null) {
                this.threshold.mso = this.defaultMso;
            }
            // tslint:disable-next-line:max-line-length
            this.thresholdNode = this.thresholdService.createRetroThresholdNode(this.threshold.bin, this.threshold.mso, this.system, this.thresholdOption, this.threshold.assocFlag, this.threshold.lastUpdatedUserId, this.threshold.name, this.listRetroThresholdDataArray);
            this.thresholdService.saveThreshold(url, JSON.stringify(this.thresholdNode)).subscribe(
                data => {
                    this.App.hideloader();
                    const retroThresholdData = data;
                    this.updatedBin = retroThresholdData.icaBin;
                    this.changeGlobalBin.emit(this.updatedBin);
                    if (!_.isUndefined(retroThresholdData.icsRetroThresholdDataDto)) {
                        // tslint:disable-next-line:max-line-length
                        if (!_.isUndefined(retroThresholdData.icsRetroThresholdDataDto.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(retroThresholdData.icsRetroThresholdDataDto.errors.BinValidation)) {
                            this.binRelatedMsg = retroThresholdData.icsRetroThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                            this.binErrMsg = retroThresholdData.icsRetroThresholdDataDto.errors.BinValidation;
                            this.App.hideloader();
                            this.display = true;
                        }
                    } else {
                        icsRetroThresholdForm.controls.applicationVelocity.reset();
                        icsRetroThresholdForm.controls.unauthorisedUser.reset();
                        this.setApplicationVelocityDefaultValues(icsRetroThresholdForm);
                        this.setUnauthorisedUseDefaultValues(icsRetroThresholdForm);
                        this.showSuccess();
                    }
                },
                err => {
                    this.App.hideloader();
                    this.showError('User updation failed');
                }
            );
        } else {
            console.log('No data to save');
        }
    }
    setApplicationVelocityDefaultValues = (icsRetroThresholdForm) => {
        const applicationVelocityForm = icsRetroThresholdForm.controls.applicationVelocity.controls;
        applicationVelocityForm.applicationVelocityPeriod1Low.setValue(this.defaultValue1);
        applicationVelocityForm.applicationVelocityPeriod1High.setValue(this.defaultValue90);
        applicationVelocityForm.applicationVelocityPeriod2Low.setValue(this.defaultValue1);
        applicationVelocityForm.applicationVelocityPeriod2High.setValue(this.defaultValue365);
        if (this.extended) {
            applicationVelocityForm.applicationVelocityPeriod3Low.setValue(this.defaultValue1);
            applicationVelocityForm.applicationVelocityPeriod4Low.setValue(this.defaultValue1);
        }
    }
    setUnauthorisedUseDefaultValues = (icsRetroThresholdForm) => {
        const unauthorisedUserForm = icsRetroThresholdForm.controls.unauthorisedUser.controls;
        unauthorisedUserForm.type00Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type01Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type02Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type03Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type04Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type05Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type06Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type07Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type08Period1Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type09Period1Low.setValue(this.defaultValue1);

        unauthorisedUserForm.type00Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type01Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type02Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type03Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type04Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type05Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type06Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type07Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type08Period2Low.setValue(this.defaultValue1);
        unauthorisedUserForm.type09Period2Low.setValue(this.defaultValue1);

        unauthorisedUserForm.type00Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type01Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type02Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type03Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type04Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type05Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type06Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type07Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type08Period1High.setValue(this.defaultValue90);
        unauthorisedUserForm.type09Period1High.setValue(this.defaultValue90);

        unauthorisedUserForm.type00Period2High.setValue(this.defaultValue365);
        unauthorisedUserForm.type01Period2High.setValue(this.defaultValue365);
        unauthorisedUserForm.type02Period2High.setValue(this.defaultValue365);
        unauthorisedUserForm.type03Period2High.setValue(this.defaultValue1462);
        unauthorisedUserForm.type04Period2High.setValue(this.defaultValue365);
        unauthorisedUserForm.type05Period2High.setValue(this.defaultValue1462);
        unauthorisedUserForm.type06Period2High.setValue(this.defaultValue365);
        unauthorisedUserForm.type07Period2High.setValue(this.defaultValue1462);
        unauthorisedUserForm.type08Period2High.setValue(this.defaultValue1462);
        unauthorisedUserForm.type09Period2High.setValue(this.defaultValue1462);
        if (this.extended) {
            unauthorisedUserForm.type00Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type01Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type02Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type03Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type04Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type05Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type06Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type07Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type08Period3Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type09Period3Low.setValue(this.defaultValue1);

            unauthorisedUserForm.type00Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type01Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type02Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type03Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type04Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type05Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type06Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type07Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type08Period4Low.setValue(this.defaultValue1);
            unauthorisedUserForm.type09Period4Low.setValue(this.defaultValue1);
        }
    }
    cancelThreshold = () => {
        this.appVelocity.cancelApplicationVelocityData();
        this.unauthorisedUser.cancelUnauthorisedUserData();
    }
    showSuccess() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'Save/updation updation successfull' });
    }
    showError(errorMessage) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
    }
}
