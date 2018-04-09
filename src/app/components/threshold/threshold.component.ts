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
    selector: 'app-threshold',
    templateUrl: './threshold.component.html',
    styleUrls: ['./threshold.component.scss'],
    providers: [MessageService, ThresholdService]
})
export class ThresholdComponent implements OnInit {
    @ViewChild(ApplicationVelocityComponent) appVelocity: ApplicationVelocityComponent;
    @ViewChild(UnauthorisedUserComponent) unauthorisedUser: UnauthorisedUserComponent;
    @Input() globalBin: string;
    @Output() changeGlobalBin = new EventEmitter();
    updatedBin = '';
    componentName = 'threshold';
    thresholdFormValid = false;
    filteredOptions: any[];
    msos: string[] = [];
    mso: string;
    msoSelected = true;
    defaultMso = '0';
    thresholdOption;
    limited = true;
    extended = false;
    default = true;
    msgs: Message[] = [];
    totalBucket = 2;
    threshold = new Threshold();
    listThresholdDataArray = [];
    thresholdNode = {};
    api: string;
    system = 'ICS';
    errorMessage = '';
    defaultValue1 = '1';
    defaultValue90 = '90';
    defaultValue365 = '365';
    defaultValue1462 = '1462';
    binErrMsg = '';
    binRelatedMsg = '';
    display = false;
    invalidThresholdForm = true;
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
    getInvalidThresholdFormStatus = ($event) => {
        this.invalidThresholdForm = $event;
    }
    getData = () => {
        this.threshold.bin = this.globalBin;
        const bin = this.threshold.bin;
        this.fetchMso(bin);
    }
    fetchMso = (icaBin) => {
        const url = this.api + '/mo/threshold/mso';
        const body = { 'icaBin': icaBin };
        this.thresholdService.fetchMso(url, body).subscribe(
            res => {
                this.msos = res;
                if (!_.isNull(this.msos)) {
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
        if (mso === undefined || mso === '' || mso === null) {
            mso = this.defaultMso;
        }
        let result;
        this.App.displayloader();
        const url = this.api + '/mo/getThresAndOpt';
        const body = { 'icaBin': icaBin, 'mso': mso, 'system': this.system };
        this.thresholdService.retrieveThreshold(url, body).subscribe(
            res => {
                result = res;
                this.updatedBin = result.icsMemberOptionTblDto.icaBin;
                this.changeGlobalBin.emit(this.updatedBin);
                if (!_.isUndefined(result.icsMemberOptionTblDto)) {
                    // tslint:disable-next-line:max-line-length
                    if ((!_.isNull(result.icsThresholdDataDto)) && (!_.isUndefined(result.icsThresholdDataDto.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.icsThresholdDataDto.errors.BinValidation))) {
                        this.binRelatedMsg = result.icsThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                        this.binErrMsg = result.icsThresholdDataDto.errors.BinValidation;
                        this.App.hideloader();
                        this.display = true;
                    } else {
                        this.default = (result.length > 0) ? false : true;
                        this.threshold.nonBankcard = (result.icsMemberOptionTblDto.nonBankcardMSO === '1') ? 'Yes' : 'No';
                        this.thresholdOption = result.icsMemberOptionTblDto.thresoldOption;
                        this.extended = (this.thresholdOption === '0') ? true : false;
                        this.totalBucket = this.extended ? 4 : 2;
                        // appending application velocity data
                        this.appVelocity.appendToForm(result, this.totalBucket, this.limited, this.extended, this.componentName);
                        // appending unauthorised user data
                        this.unauthorisedUser.appendToForm(result, this.totalBucket, this.limited, this.extended, this.componentName);
                        this.invalidThresholdForm = false;
                        this.App.hideloader();
                    }
                }
            },
            err => {
                err = err.errors;
                this.errorMessage = err.errorInfo;
                this.showError(this.errorMessage);
                this.App.hideloader();
            }
        );
        this.App.hideloader();
    }
    saveThreshold = (icsThresholdForm: NgForm) => {
        this.App.displayloader();
        const applicationVelocityData = this.appVelocity.saveApplicationVelocityData(this.componentName);
        this.listThresholdDataArray = [];
        if (!_.isUndefined(applicationVelocityData) && (applicationVelocityData.length)) {
            for (let i = 0; i < applicationVelocityData.length; i++) {
                this.listThresholdDataArray.push(applicationVelocityData[i]);
            }
        }
        const unauthorisedUserData = this.unauthorisedUser.saveUnauthorisedUserData(this.componentName);
        if (!_.isUndefined(unauthorisedUserData) && (unauthorisedUserData.length)) {
            for (let i = 0; i < unauthorisedUserData.length; i++) {
                this.listThresholdDataArray.push(unauthorisedUserData[i]);
            }
        }
        const thresholdDataLength = this.listThresholdDataArray.length;
        if (thresholdDataLength > 0) {
            for (let i = 0; i < thresholdDataLength; i++) {
                this.listThresholdDataArray[i].lowDay = parseInt(this.listThresholdDataArray[i].lowDay, 10);
                this.listThresholdDataArray[i].highDay = parseInt(this.listThresholdDataArray[i].highDay, 10);
                this.listThresholdDataArray[i].thresholdValue = parseInt(this.listThresholdDataArray[i].thresholdValue, 10);
            }
            const url = this.api + '/mo/threshold';
            this.threshold.assocFlag = 'v';
            this.threshold.lastUpdatedUserId = localStorage.currentUser;
            this.threshold.name = 'name';
            this.threshold.address = 'address';
            if (this.threshold.mso === undefined || this.threshold.mso === '' || this.threshold.mso === null) {
                this.threshold.mso = this.defaultMso;
            }
            // tslint:disable-next-line:max-line-length
            this.thresholdNode = this.thresholdService.createThresholdNode(this.threshold.bin, this.threshold.mso, this.system, this.thresholdOption, this.threshold.assocFlag, this.threshold.lastUpdatedUserId, this.threshold.name, this.listThresholdDataArray);
            this.thresholdService.saveThreshold(url, JSON.stringify(this.thresholdNode)).subscribe(
                data => {
                    this.App.hideloader();
                    if (data.icaBin !== null) {
                        const thresholdData = data;
                        this.updatedBin = thresholdData.icaBin;
                        this.changeGlobalBin.emit(this.updatedBin);
                        if (!_.isUndefined(thresholdData.icsThresholdDataDto)) {
                            // tslint:disable-next-line:max-line-length
                            if (!_.isUndefined(thresholdData.icsThresholdDataDto.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(thresholdData.icsThresholdDataDto.errors.BinValidation)) {
                                this.binRelatedMsg = thresholdData.icsThresholdDataDto.errors.BinRelatedToIcsOrPcs;
                                this.binErrMsg = thresholdData.icsThresholdDataDto.errors.BinValidation;
                                this.App.hideloader();
                                this.display = true;
                            }
                        } else {
                            icsThresholdForm.controls.applicationVelocity.reset();
                            icsThresholdForm.controls.unauthorisedUser.reset();
                            this.setApplicationVelocityDefaultValues(icsThresholdForm);
                            this.setUnauthorisedUseDefaultValues(icsThresholdForm);
                            this.showSuccess();
                        }
                    }
                },
                err => {
                    this.App.hideloader();
                    this.showError('Threshold save/updation failed');
                }
            );
        } else {
            console.log('No data to save');
        }
        this.App.hideloader();
    }
    setApplicationVelocityDefaultValues = (icsThresholdForm) => {
        const applicationVelocityForm = icsThresholdForm.controls.applicationVelocity.controls;
        applicationVelocityForm.applicationVelocityPeriod1Low.setValue(this.defaultValue1);
        applicationVelocityForm.applicationVelocityPeriod1High.setValue(this.defaultValue90);
        applicationVelocityForm.applicationVelocityPeriod2Low.setValue(this.defaultValue1);
        applicationVelocityForm.applicationVelocityPeriod2High.setValue(this.defaultValue365);
        if (this.extended) {
            applicationVelocityForm.applicationVelocityPeriod3Low.setValue(this.defaultValue1);
            applicationVelocityForm.applicationVelocityPeriod4Low.setValue(this.defaultValue1);
        }
    }
    setUnauthorisedUseDefaultValues = (icsThresholdForm) => {
        const unauthorisedUserForm = icsThresholdForm.controls.unauthorisedUser.controls;
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
    showSuccess = () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'Threshold Save/updation successfull' });
    }
    showError = (errorMessage) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
    }
}
