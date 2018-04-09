import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { User } from '../../_models/ics-alerts';
import { debug } from 'util';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import { AppGlobal } from '../../_constants/global.static';
import { AlertService } from '../../_services/alerts.service';
import * as _ from 'underscore';
interface SSNalert {
  name: string,
  code: string,
  value: string
}
interface SSNinvalid {
  name: string,
  code: string,
  value: string
}
interface Addressalert {
  name: string,
  code: string,
  value: string
}
interface Addressinvalid {
  name: string,
  code: string,
  value: string
}
interface Phonealert {
  name: string,
  code: string,
  value: string
}
interface Phoneinvalid {
  name: string,
  code: string,
  value: string
}
@Component({
  selector: 'app-alerts-invalids',
  templateUrl: './alerts-invalids.component.html',
  styleUrls: ['./alerts-invalids.component.scss'],
  providers: [MessageService, AlertService]
})
export class AlertsInvalidsComponent implements OnInit {
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = "";
  nonBankcard: string;
  SSNalerts: SSNalert[];
  SSNinvalids: SSNinvalid[];
  Addressalerts: Addressalert[];
  Addressinvalids: Addressinvalid[];
  Phonealerts: Phonealert[];
  Phoneinvalids: Phoneinvalid[];
  defaultMso: any;
  ssnAlerts: any;
  ssnInvalids: any;
  addrAlerts: any;
  addrInvalids: any;
  phoneAlerts: any;
  phoneInvalids: any;
  filteredOptions: any[];
  user = new User();
  msos: string[] = [];
  mso: string;
  msgs: Message[] = [];
  api: string;
  system = "ICS";
  errorMessage = '';
  submitted = false; // form not submited : default
  // data: any; // this variable contains our data
  binErrMsg = "";
  binRelatedMsg = "";
  display = false;
  constructor(private http: Http, private _http: HttpClient, private App: AppComponent, private appGlobal: AppGlobal, private alertService: AlertService) {
    this.api = environment.api;
    this.defaultMso = this.appGlobal.DEFUALT_MSO;
    this.SSNalerts = this.appGlobal.Alerts.ssnalerts;
    this.SSNinvalids = this.appGlobal.Alerts.ssninvalids;
    this.Addressalerts = this.appGlobal.Alerts.addressalerts;
    this.Addressinvalids = this.appGlobal.Alerts.addressinvalids;
    this.Phonealerts = this.appGlobal.Alerts.phoneAlerts;
    this.Phoneinvalids = this.appGlobal.Alerts.phoneInvalids;
  }
  ngOnInit() { }

  getData = () => {
    this.user.bin = this.globalBin;
    const bin = this.user.bin;
    this.fetchMso(bin);
  }

  getCodes = (listSSN, listCode) => {
    const codes = [];
    for (let i = 0; i < listCode.length; i++) {
      listSSN.forEach((element, index) => {
        if (element.code !== '') {
          listCode.forEach(function (ele) {
            if (ele === element.code) codes.push(element);
          })
        }
      }); return codes;
    }
  }
  retrieve = (value, bin, mso) => {
    this.App.displayloader();
    if (mso === undefined || mso === "" || mso === null) {
      mso = this.defaultMso;
    }
    // const url = this.api + '/mo/retriveAlertsAndInvalids';
    const body = { 'bin': bin, 'mso': mso, 'system': this.system };
    this.alertService.fetchAlerts(body).subscribe(res => {
      const self = this;
      self.user = res;
      const result = res;
      this.updatedBin = result.bin;
      this.changeGlobalBin.emit(this.updatedBin);
      if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
        self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
        self.binErrMsg = result.errors.BinValidation;
        self.App.hideloader();
        self.display = true;
      } else {
        self.nonBankcard = (self.user.nonBankCard === '1') ? 'Yes' : 'No';
        self.ssnAlerts = [];
        self.ssnInvalids = [];
        self.addrAlerts = [];
        self.addrInvalids = [];
        self.phoneAlerts = [];
        self.phoneInvalids = [];
        if (self.user.ssnAlerts != undefined || self.user.ssnAlerts != null) {
          const result = self.getCodes(self.SSNalerts, self.user.ssnAlerts);
          self.ssnAlerts = [];
          self.ssnAlerts = result;
        }
        if (self.user.ssnInvalids != undefined || self.user.ssnInvalids != null) {
          const result = self.getCodes(self.SSNinvalids, self.user.ssnInvalids);
          self.ssnInvalids = [];
          self.ssnInvalids = result;
        }
        if (self.user.addrAlerts != undefined || self.user.addrAlerts != null) {
          const result = self.getCodes(self.Addressalerts, self.user.addrAlerts);
          self.addrAlerts = [];
          self.addrAlerts = result;
        }
        if (self.user.addrInvalids != undefined || self.user.addrInvalids != null) {
          const result = self.getCodes(self.Addressinvalids, self.user.addrInvalids);
          self.addrInvalids = [];
          self.addrInvalids = result;
        }
        if (self.user.phoneAlerts != undefined || self.user.phoneAlerts != null) {
          const result = self.getCodes(self.Phonealerts, self.user.phoneAlerts);
          self.phoneAlerts = [];
          self.phoneAlerts = result;
        }
        if (self.user.phoneInvalids != undefined || self.user.phoneInvalids != null) {
          const result = self.getCodes(self.Phoneinvalids, self.user.phoneInvalids);
          self.phoneInvalids = [];
          self.phoneInvalids = result;
        }
      }
    },
      err => {
        err = err.errors;
        this.errorMessage = err.errorInfo;
        this.showError(this.errorMessage);
        this.App.hideloader();
      });
    this.App.hideloader();
  }
  fetchMso = (icaBin) => {
    // const url = this.api + '/mo/getListOfMSOs';
    const body = { 'bin': icaBin };
    this.alertService.fetchMso(body).subscribe(
    res => {
        this.msos = res;
        if (this.msos.includes("0")) this.user.mso = this.defaultMso;
      },
      err => {
        console.log(err);
      }
    );
  }

  // form submit
  getCheckCodes = (arrayOfCodes, resultArray) => {
    for (let i = 0; i < arrayOfCodes.length; i++) {
      resultArray.push(arrayOfCodes[i].code);
    }
  }

  onSubmit = (alertForm: NgForm) => {
    this.App.displayloader();
    // const url = this.api + '/mo/saveAlterAndInvalidData';
    let ssn = [], invalidssn = [], address = [], addressinvalid = [], phone = [], phoneinvalid = [], i;
    this.submitted = true;
    if (alertForm.value.mso === undefined || alertForm.value.mso === '' || alertForm.value.mso === null) {
      alertForm.value.mso = this.defaultMso;
    }
    if (alertForm.value.ssnAlerts != undefined || alertForm.value.ssnAlerts != null) {
      ssn = [];
      this.getCheckCodes(alertForm.value.ssnAlerts, ssn);
    }
    if (alertForm.value.ssnInvalids != undefined || alertForm.value.ssnInvalids != null) {
      invalidssn = [];
      this.getCheckCodes(alertForm.value.ssnInvalids, invalidssn);
    }
    if (alertForm.value.addrAlerts != undefined || alertForm.value.addrAlerts != null) {
      address = [];
      this.getCheckCodes(alertForm.value.addrAlerts, address);
    }
    if (alertForm.value.addrInvalids != undefined || alertForm.value.addrInvalids != null) {
      addressinvalid = [];
      this.getCheckCodes(alertForm.value.addrInvalids, addressinvalid);
    }
    if (alertForm.value.phoneAlerts != undefined || alertForm.value.phoneAlerts != null) {
      phone = [];
      this.getCheckCodes(alertForm.value.phoneAlerts, phone);
    }
    if (alertForm.value.phoneInvalids != undefined || alertForm.value.phoneInvalids != null) {
      phoneinvalid = [];
      this.getCheckCodes(alertForm.value.phoneInvalids, phoneinvalid);
    }
    alertForm.value['assoFlag'] = 'v';
    alertForm.value['ssnAlerts'] = ssn;
    alertForm.value['ssnInvalids'] = invalidssn;
    alertForm.value['addrAlerts'] = address;
    alertForm.value['addrInvalids'] = addressinvalid;
    alertForm.value['phoneAlerts'] = phone;
    alertForm.value['phoneInvalids'] = phoneinvalid;
    alertForm.value['loadTs'] = '2018-01-10';
    alertForm.value['lastupdatedUserId'] = 'U01';
    alertForm.value['system'] = this.system;
    let alertFormData;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    // let actionValue = "create";
    this.alertService.saveAlerts(JSON.stringify(alertForm.value)).subscribe(
      data => {
        const result = data;
        this.updatedBin = result.bin;
        this.changeGlobalBin.emit(this.updatedBin);
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          this.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          this.binErrMsg = result.errors.BinValidation;
          this.App.hideloader();
          this.display = true;
        } else {
          this.App.hideloader();
          alertFormData = data;
          this.clearAlertvalues(alertForm);
          this.showSuccess();
        }
      },
      err => {
        this.App.hideloader();
        this.clearAlertvalues(alertForm);
        this.showError('User updation failed');
      }
    );
  }
  clearAlertvalues = (alertForm) => {
    alertForm.controls.ssnAlerts.reset();
    alertForm.controls.ssnInvalids.reset();
    alertForm.controls.addrAlerts.reset();
    alertForm.controls.addrInvalids.reset();
    alertForm.controls.phoneAlerts.reset();
    alertForm.controls.phoneInvalids.reset();
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'User updation successfull' });
  }
  showError(errorMessage) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
  }
}