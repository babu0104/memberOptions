import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { User } from '../../_models/MOalerts';
import { debug } from 'util';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
import { AlertService } from '../../_services/alerts.service';
interface SSNalert {
  name: string, code: string, value: string
}
interface SSNinvalid {
  name: string, code: string, value: string
}
interface Addressalert {
  name: string, code: string, value: string
}
interface Addressinvalid {
  name: string, code: string, value: string
}
interface Phonealert {
  name: string, code: string, value: string
}
interface Phoneinvalid {
  name: string, code: string, value: string
}
interface StateIdAlert {
  name: string, code: string, value: string
}
interface StateIdInvalid {
  name: string, code: string, value: string
}
interface FundingSourceAlerts {
  name: string, code: string, value: string
}
interface FundingSourceInvalids {
  name: string, code: string, value: string
}
interface EmailAlerts {
  name: string, code: string, value: string
}
interface EmailInvalids {
  name: string, code: string, value: string
}
// interface IPAddressAlerts {
//   code: string
// }
// interface IPAddressInvalids {
//   code: string
// }
// interface DeviceIDAlert {
//   code: string
// }
interface DeviceIDInvalids {
  name: string, code: string, value: string
}
@Component({
  selector: 'app-pcs-alerts-invalids',
  templateUrl: './pcs-alerts-invalids.component.html',
  styleUrls: ['./pcs-alerts-invalids.component.scss'],
  providers: [AlertService]
})
export class PcsAlertsInvalidsComponent implements OnInit {
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = "";
  defaultMso = "0";
  nonBankcard: string;
  SSNalerts: SSNalert[];
  SSNinvalids: SSNinvalid[];
  Addressalerts: Addressalert[];
  Addressinvalids: Addressinvalid[];
  Phonealerts: Phonealert[];
  Phoneinvalids: Phoneinvalid[];
  StateIdAlert: StateIdAlert[];
  StateIdInvalid: StateIdInvalid[];
  FundingSourceAlerts: FundingSourceAlerts[];
  FundingSourceInvalids: FundingSourceInvalids[];
  EmailAlerts: EmailAlerts[];
  EmailInvalids: EmailInvalids[];
  // IPAddressAlerts: IPAddressAlerts[];
  // IPAddressInvalids: IPAddressInvalids[];
  // DeviceIDAlert: DeviceIDAlert[];
  DeviceIDInvalids: DeviceIDInvalids[];
  // selected checkbox
  ssnAlertCodes: any;
  ssnInvalidCodes: any;
  addrAlertCodes: any;
  addrInvalidCodes: any;
  phoneAlertCodes: any;
  phoneInvalidCodes: any;
  stateAlertCodes: any;
  stateInvalidCodes: any;
  fundAlertCodes: any;
  fundInvalidCodes: any;
  emailAlertCodes: any;
  emailInvalidCodes: any;
  ipAddrAlertCodes: any;
  ipAddrInvalidCodes: any;
  deviceAlertCodes: any;
  deviceInvalidCodes: any;
  user = new User();
  msos: string[] = [];
  mso: string;
  msgs: Message[] = [];
  api: string;
  errorMessage = '';
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  system = "PCS";
  binErrMsg = "";
  binRelatedMsg = "";
  display = false;
  constructor(private http: Http, private _http: HttpClient, private App: AppComponent, private alertService: AlertService) {
    this.api = environment.api;
    this.SSNalerts = [
      { name: '01 SSN Deceased', code: '01', value: 'value1' },
      { name: '02 SSN Invalid Combination of Digits', code: '02', value: 'value2' },
      { name: '03 SSN Has Not Been Asigned', code: '03', value: 'value3' },
      { name: '04 SSN May Have Been Improperly Released', code: '04', value: 'value4' }
    ];
    this.SSNinvalids = [
      { name: '01 SSN Not Numeric', code: '01', value: 'value5' },
      { name: '02 SSN Invalid Combination of Digits', code: '02', value: 'value6' },
      { name: '03 SSN Has Not Been Asigned', code: '03', value: 'value7' }
    ];
    this.Addressalerts = [
      { name: '01 Rental Box/Mail Receiving Service/Mail Drop', code: '01', value: '01' },
      { name: '02 Address Not Assigned', code: '02', value: '02' },
      { name: '03 Answering Service', code: '03', value: '03' },
      { name: '04 Prison/Penal Institution', code: '04', value: '04' },
      { name: '05 Hospital', code: '05', value: '02' },
      { name: '06 Nursing/Primary Care Facility', code: '06', value: '03' },
      { name: '07 Drug/Alcohol Treatment Center', code: '07', value: '04' },
      { name: '08 Zip Code/Area Code Mismatch', code: '08', value: '02' },
      { name: '09 Health Agency', code: '09', value: '03' },
      { name: '10 Hotel/Motel/Vacation Resort', code: '10', value: '04' },
      { name: '11 Vacant Lot', code: '11', value: '02' },
      { name: '12 Seasonal', code: '12', value: '03' }
    ];
    this.Addressinvalids = [
      { name: '01 Street Name Invalid for City/ZIP', code: '01', value: '02' },
      { name: '02 Blank Address Line', code: '02', value: '03' },
      { name: '03 Street Name Not in Database', code: '03', value: '04' },
      { name: '04 No Range', code: '04', value: '02' },
      { name: '05 Street Type and/or Direction Missing or Incorrect', code: '05', value: '03' },
      { name: ' 06 Range Invalid', code: '06', value: '04' },
      { name: '07 Direction Incorrect', code: '07', value: '02' },
      { name: '08 Street Type Incorrect', code: '08', value: '03' },
      { name: '09 Range and Direction Incorrect', code: '09', value: '04' },
      { name: '10 Range and Street Type Incorrect', code: '10', value: '02' },
      { name: '11 Direction and Street Type Incorrect', code: '11', value: '03' },
      { name: '12 Range, Direction and Street Type Incorrect', code: '12', value: '04' },
      { name: '13 Unable to Identify Address', code: '13', value: '03' },
      { name: '14 Apartment Number Missing', code: '14', value: '04' },
      { name: '15 City and/or State and/or ZIP Missing or Incorrect', code: '15', value: '03' }
    ];
    this.Phonealerts = [
      { name: '01 Rental Box/Directory Assistance #/ Toll-free #', code: '01', value: 'phone1' },
      { name: '02 Pager #', code: '02', value: 'phone2' },
      { name: '03 Answering Service', code: '03', value: 'phone3' },
      { name: '04 Prison/Penal Institution', code: '04', value: 'phone4' },
      { name: '05 Hospital', code: '05', value: 'phone5' },
      { name: '06 Nursing/Primary Care Facility', code: '06', value: 'phone6' },
      { name: '07 Drug/Alcohol Treatment Center', code: '07', value: 'phone7' },
      { name: '08 ZIP Code/Area Code Mismatch', code: '08', value: 'phone8' },
      { name: '09 Health Agency', code: '09', value: 'phone9' },
      { name: '10 Hotel/Motel/Vacation Resort', code: '10', value: 'phone10' },
      { name: '11 Invalid Area Code', code: '11', value: 'phone11' },
      { name: '12 Area Code Does Not Match Prefix', code: '12', value: 'phone12' },
      { name: '13 Cellular Phone', code: '13', value: 'phone13' }
    ];
    this.Phoneinvalids = [
      { name: '01 Not Numeric', code: '01', value: 'phone14' },
      { name: '02 Numeric Incomplete', code: '02', value: 'phone15' },
      { name: '03 Invalid Area Code', code: '03', value: 'phone16' },
      { name: '04 Area Code Does Not Match Preifx', code: '04', value: 'phone17' }
    ];
    this.StateIdAlert = [
      { name: '01 State Code Nit Valid', code: '01', value: '01' },
      { name: '02 No Match to DMV file (future use)', code: '02', value: '02' },
      { name: '03 Invalid State ID Number (future use)', code: '03', value: '03' }
    ];
    this.StateIdInvalid = [
      { name: '01 State ID Number not Numeric (future use)', code: '01', value: '01' },
      { name: '02 State Code not Valid (future use)', code: '02', value: '02' },
      { name: '03 No match to DMV File (future use)', code: '03', value: '03' },
      { name: '04 Invalid State ID Number (future use)', code: '04', value: '04' }
    ];
    this.FundingSourceAlerts = [
      { name: '00 Funding Source Not in Question', code: '01', value: '01' },
      { name: '01 Invalid Routing Number for Records with Funding Account type = 02 (checking) (future use)', code: '02', value: '02' },
      { name: '02 Invalid Funding Account Number (future use)', code: '03', value: '03' }
    ];
    this.FundingSourceInvalids = [
      { name: '01 Funding Source Type Code not Numeric', code: '01', value: '01' },
      { name: '02 Funding Source Type Code not Valid Code', code: '02', value: '02' },
      { name: '03 Non-numeric Funding Source Account Number', code: '03', value: '03' },
      { name: '04 Invalid Routing Number for Records with Funding Account Type = 02 (checking)', code: '04', value: '04' },
      { name: '05 Invalid Funding Account Number (future use)', code: '04', value: '05' }
    ];
    this.EmailAlerts = [
      { name: '00 test', code: '01', value: '01' }
    ];
    this.EmailInvalids = [
      { name: '00 test', code: '01', value: '01' }
    ];
    // this.IPAddressAlerts = [
    //   { code: '01' }
    // ];
    // this.IPAddressInvalids = [
    //   { code: '01' }
    // ];
    // this.DeviceIDAlert = [
    //   { code: '01' }
    // ];
    this.DeviceIDInvalids = [
      { name: '01 Device ID Invalid Format (future use)', code: '01', value: '01' }
    ];
  }
  ngOnInit() {
  }
  getBin() {
    const _self = this;
    _self.user.bin = this.globalBin;
    this.fetchMso(_self.user.bin);
  }
  getCodes = (listSSN, listCode) => {
    const codes = [];
    for (let i = 0; i < listCode.length; i++) {
      listSSN.forEach((element, index) => {
        if (element.code !== '') {
          listCode.forEach(function (ele) {
            if (ele === element.code) {
              codes.push(element);
            }
          })
        }
      });
      return codes;
    }
  }
  retrieve(value, bin, mso) {
    const _self = this;
    if (mso === undefined || mso === '' || mso === null) {
      mso = this.defaultMso;
    }
    _self.App.displayloader();
    // const url = this.api + '/mo/pcs/retriveAlertsinvalids';
    const body = { 'bin': bin, 'mso': mso, 'system': _self.system };
    this.alertService.fetchPcsAlerts(body).subscribe(
      res => {
        const self = this;
        self.user = res;
        const result = res;
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          self.binErrMsg = result.errors.BinValidation;
          self.App.hideloader();
          self.display = true;
        } else {
          self.updatedBin = self.user.bin;
          this.changeGlobalBin.emit(self.updatedBin);
          self.nonBankcard = (self.user.nonBankCard === '1') ? 'Yes' : 'No';
          if (self.user.ssnAlertCodes != undefined || self.user.ssnAlertCodes != null) {
            const result = self.getCodes(self.SSNalerts, self.user.ssnAlertCodes);
            self.ssnAlertCodes = [];
            self.ssnAlertCodes = result;
          }
          if (self.user.ssnInvalidCodes != undefined || self.user.ssnInvalidCodes != null) {
            const result = self.getCodes(self.SSNinvalids, self.user.ssnInvalidCodes);
            self.ssnInvalidCodes = [];
            self.ssnInvalidCodes = result;
          }
          if (self.user.addrAlertCodes != undefined || self.user.addrAlertCodes != null) {
            const result = self.getCodes(self.Addressalerts, self.user.addrAlertCodes);
            self.addrAlertCodes = [];
            self.addrAlertCodes = result;
          }
          if (self.user.addrInvalidCodes != undefined || self.user.addrInvalidCodes != null) {
            const result = self.getCodes(self.Addressinvalids, self.user.addrInvalidCodes);
            self.addrInvalidCodes = [];
            self.addrInvalidCodes = result;
          }
          if (self.user.phoneAlertCodes != undefined || self.user.phoneAlertCodes != null) {
            const result = self.getCodes(self.Phonealerts, self.user.phoneAlertCodes);
            self.phoneAlertCodes = [];
            self.phoneAlertCodes = result;
          }
          if (self.user.phoneInvalidCodes != undefined || self.user.phoneInvalidCodes != null) {
            const result = self.getCodes(self.Phoneinvalids, self.user.phoneInvalidCodes);
            self.phoneInvalidCodes = [];
            self.phoneInvalidCodes = result;
          }
          if (self.user.stateAlertCodes != undefined || self.user.stateAlertCodes != null) {
            const result = self.getCodes(self.StateIdAlert, self.user.stateAlertCodes);
            self.stateAlertCodes = [];
            self.stateAlertCodes = result;
          }
          if (self.user.stateInvalidCodes != undefined || self.user.stateInvalidCodes != null) {
            const result = self.getCodes(self.StateIdInvalid, self.user.stateInvalidCodes);
            self.stateInvalidCodes = [];
            self.stateInvalidCodes = result;
          }
          if (self.user.fundAlertCodes != undefined || self.user.fundAlertCodes != null) {
            const result = self.getCodes(self.FundingSourceAlerts, self.user.fundAlertCodes);
            self.fundAlertCodes = [];
            self.fundAlertCodes = result;
          }
          if (self.user.fundInvalidCodes != undefined || self.user.fundInvalidCodes != null) {
            const result = self.getCodes(self.FundingSourceInvalids, self.user.fundInvalidCodes);
            self.fundInvalidCodes = [];
            self.fundInvalidCodes = result;
          }
          if (self.user.emailAlertCodes != undefined || self.user.emailAlertCodes != null) {
            const result = self.getCodes(self.EmailAlerts, self.user.emailAlertCodes);
            self.emailAlertCodes = [];
            self.emailAlertCodes = result;
          }
          if (self.user.emailInvalidCodes != undefined || self.user.emailInvalidCodes != null) {
            const result = self.getCodes(self.EmailInvalids, self.user.emailInvalidCodes);
            self.emailInvalidCodes = [];
            self.emailInvalidCodes = result;
          }
          if (self.user.ipAddrAlertCodes != undefined || self.user.ipAddrAlertCodes != null) {
            self.ipAddrAlertCodes = (self.user.ipAddrAlertCodes.includes("01")) ? true : false;
          }
          if (self.user.ipAddrInvalidCodes != undefined || self.user.ipAddrInvalidCodes != null) {
            self.ipAddrInvalidCodes = (self.user.ipAddrInvalidCodes.includes("01")) ? true : false;
          }
          if (self.user.deviceAlertCodes != undefined || self.user.deviceAlertCodes != null) {
            self.deviceAlertCodes = (self.user.deviceAlertCodes.includes("01")) ? true : false;
          }
          if (self.user.deviceInvalidCodes != undefined || self.user.deviceInvalidCodes != null) {
            const result = self.getCodes(self.DeviceIDInvalids, self.user.deviceInvalidCodes);
            self.deviceInvalidCodes = [];
            self.deviceInvalidCodes = result;
          }
        }
        _self.App.hideloader();
      },
      err => {

      });
  }
  fetchMso(bin) {
    // const url = this.api + '/mo/pcs/getListOfMSOs';
    const body = { 'bin': bin };
    this.alertService.fetchPcsMso(body).subscribe(
      res => {
        this.msos = res;
        if (!_.isNull(this.msos) && this.msos.includes("0")) {
          this.user.mso = this.defaultMso;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  // form submit
  getCheckCodes(arrayOfCodes, resultArray) {
    for (let i = 0; i < arrayOfCodes.length; i++) {
      resultArray.push(arrayOfCodes[i].code);
    }
  }
  onSubmit(pcsAlertForm: NgForm) {
    const _self = this;
    _self.App.displayloader();
    let ssn = [], invalidssn = [], address = [], addressinvalid = [], phone = [], phoneinvalid = [],
      state = [], stateinvalid = [], source = [], invalidSource = [], email = [], invaildEmail = [],
      ipAddress = [], invailedIpAddress = [], deviceID = [], invalidDeviceID = [], i;
    this.submitted = true;
    if (pcsAlertForm.value.ssnAlertCodes != undefined || pcsAlertForm.value.ssnAlertCodes != null) {
      ssn = [];
      this.getCheckCodes(pcsAlertForm.value.ssnAlertCodes, ssn);
    }
    if (pcsAlertForm.value.ssnInvalidCodes != undefined || pcsAlertForm.value.ssnInvalidCodes != null) {
      invalidssn = [];
      this.getCheckCodes(pcsAlertForm.value.ssnInvalidCodes, invalidssn);
    }
    if (pcsAlertForm.value.addrAlertCodes != undefined || pcsAlertForm.value.addrAlertCodes != null) {
      address = [];
      this.getCheckCodes(pcsAlertForm.value.addrAlertCodes, address);
    }
    if (pcsAlertForm.value.addrInvalidCodes != undefined || pcsAlertForm.value.addrInvalidCodes != null) {
      addressinvalid = [];
      this.getCheckCodes(pcsAlertForm.value.addrInvalidCodes, addressinvalid);
    }
    if (pcsAlertForm.value.phoneAlertCodes != undefined || pcsAlertForm.value.phoneAlertCodes != null) {
      phone = [];
      this.getCheckCodes(pcsAlertForm.value.phoneAlertCodes, phone);
    }
    if (pcsAlertForm.value.phoneInvalidCodes != undefined || pcsAlertForm.value.phoneInvalidCodes != null) {
      phoneinvalid = [];
      this.getCheckCodes(pcsAlertForm.value.phoneInvalidCodes, phoneinvalid);
    }
    if (pcsAlertForm.value.stateAlertCodes != undefined || pcsAlertForm.value.stateAlertCodes != null) {
      state = [];
      this.getCheckCodes(pcsAlertForm.value.stateAlertCodes, state);
    }
    if (pcsAlertForm.value.stateInvalidCodes != undefined || pcsAlertForm.value.stateInvalidCodes != null) {
      stateinvalid = [];
      this.getCheckCodes(pcsAlertForm.value.stateInvalidCodes, stateinvalid);
    }
    if (pcsAlertForm.value.fundAlertCodes != undefined || pcsAlertForm.value.fundAlertCodes != null) {
      source = [];
      this.getCheckCodes(pcsAlertForm.value.fundAlertCodes, source);
    }
    if (pcsAlertForm.value.fundInvalidCodes != undefined || pcsAlertForm.value.fundInvalidCodes != null) {
      invalidSource = [];
      this.getCheckCodes(pcsAlertForm.value.fundInvalidCodes, invalidSource);
    }
    if (pcsAlertForm.value.emailAlertCodes != undefined || pcsAlertForm.value.emailAlertCodes != null) {
      email = [];
      this.getCheckCodes(pcsAlertForm.value.emailAlertCodes, email);
    }
    if (pcsAlertForm.value.emailInvalidCodes != undefined || pcsAlertForm.value.emailInvalidCodes != null) {
      invaildEmail = [];
      this.getCheckCodes(pcsAlertForm.value.emailInvalidCodes, invaildEmail);
    }
    if (pcsAlertForm.value.ipAddrAlertCodes != undefined || pcsAlertForm.value.ipAddrAlertCodes != null) {
      ipAddress = [];
      let checkedValue = "";
      if (this.ipAddrAlertCodes === true) {
        checkedValue = "01";
        ipAddress.push(checkedValue);
      }
      // const checkedValue = (this.ipAddrAlertCodes === true) ? "01" : "";
      // this.getCheckCodes(pcsAlertForm.value.ipAddrAlertCodes, ipAddress); 
    }
    if (pcsAlertForm.value.ipAddrInvalidCodes != undefined || pcsAlertForm.value.ipAddrInvalidCodes != null) {
      invailedIpAddress = [];
      let checkedValue = "";
      if (this.ipAddrInvalidCodes === true) {
        checkedValue = "01";
        invailedIpAddress.push(checkedValue);
      }
    }
    if (pcsAlertForm.value.deviceAlertCodes != undefined || pcsAlertForm.value.deviceAlertCodes != null) {
      deviceID = [];
      let checkedValue = "";
      if (this.deviceAlertCodes === true) {
        checkedValue = "01";
        deviceID.push(checkedValue);
      }
    }
    if (pcsAlertForm.value.deviceInvalidCodes != undefined || pcsAlertForm.value.deviceInvalidCodes != null) {
      invalidDeviceID = [];
      this.getCheckCodes(pcsAlertForm.value.deviceInvalidCodes, invalidDeviceID);
    }

    if (pcsAlertForm.value.mso === undefined || pcsAlertForm.value.mso === '' || pcsAlertForm.value.mso === null) {
      pcsAlertForm.value.mso = this.defaultMso;
    }
    pcsAlertForm.value['assoFlag'] = '1';
    pcsAlertForm.value['ssnAlertCodes'] = ssn;
    pcsAlertForm.value['ssnInvalidCodes'] = invalidssn;
    pcsAlertForm.value['addrAlertCodes'] = address;
    pcsAlertForm.value['addrInvalidCodes'] = addressinvalid;
    pcsAlertForm.value['phoneAlertCodes'] = phone;
    pcsAlertForm.value['phoneInvalidCodes'] = phoneinvalid;
    pcsAlertForm.value['stateAlertCodes'] = state;
    pcsAlertForm.value['stateInvalidCodes'] = stateinvalid;
    pcsAlertForm.value['fundAlertCodes'] = source;
    pcsAlertForm.value['fundInvalidCodes'] = invalidSource;
    pcsAlertForm.value['emailAlertCodes'] = email;
    pcsAlertForm.value['emailInvalidCodes'] = invaildEmail;
    pcsAlertForm.value['ipAddrAlertCodes'] = ipAddress;
    pcsAlertForm.value['ipAddrInvalidCodes'] = invailedIpAddress;
    pcsAlertForm.value['deviceAlertCodes'] = deviceID;
    pcsAlertForm.value['deviceInvalidCodes'] = invalidDeviceID;
    pcsAlertForm.value['loadTs'] = '';
    pcsAlertForm.value['lastupdatedUserId'] = 'U01';
    pcsAlertForm.value['system'] = _self.system;
    // const url = this.api + '/mo/pcs/saveOrUpdateAlertsInvalids';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.alertService.savePcsAlerts(JSON.stringify(pcsAlertForm.value)).subscribe(
      data => {
        const result = data;
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          _self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          _self.binErrMsg = result.errors.BinValidation;
          _self.App.hideloader();
          _self.display = true;
        } else {
          _self.updatedBin = result.icaBin;
          _self.changeGlobalBin.emit(_self.updatedBin);
          _self.clearAlertvalues(pcsAlertForm);
          _self.App.hideloader();
          _self.showSuccess();
        }
      },
      err => {
        _self.App.hideloader();
        this.showError('User updation failed');
      }
    );
    console.log(JSON.stringify(pcsAlertForm.value));
  }
  clearAlertvalues = (pcsAlertForm) => {
    pcsAlertForm.controls.ssnAlertCodes.reset();
    pcsAlertForm.controls.ssnInvalidCodes.reset();
    pcsAlertForm.controls.addrAlertCodes.reset();
    pcsAlertForm.controls.addrInvalidCodes.reset();
    pcsAlertForm.controls.phoneAlertCodes.reset();
    pcsAlertForm.controls.phoneInvalidCodes.reset();
    pcsAlertForm.controls.stateAlertCodes.reset();
    pcsAlertForm.controls.stateInvalidCodes.reset();
    pcsAlertForm.controls.fundAlertCodes.reset();
    pcsAlertForm.controls.fundInvalidCodes.reset();
    pcsAlertForm.controls.emailAlertCodes.reset();
    pcsAlertForm.controls.emailInvalidCodes.reset();
    pcsAlertForm.controls.ipAddrAlertCodes.reset();
    pcsAlertForm.controls.ipAddrInvalidCodes.reset();
    pcsAlertForm.controls.deviceAlertCodes.reset();
    pcsAlertForm.controls.deviceInvalidCodes.reset();
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
