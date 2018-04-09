import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { UserService } from '../../userService';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { CommonService } from '../../_services/common.service';
import { OptionsService } from '../../_services/options.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [MessageService, CommonService, OptionsService]
})
export class OptionsComponent implements OnInit {
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = '';
  filteredOptions: any[];
  switch = true;
  userservice = new UserService();
  msos: string[] = [];
  mso: string;
  existingMsos: string[] = [];
  msgs: Message[] = [];
  MOdata: any;
  newMso = false;
  binErrMsg = '';
  binRelatedMsg = '';
  display = false;
  defaultMso = '0';
  private api: string;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  system = 'ICS';
  errorMessage = '';
  retroDeliveries = [];
  retroVelocities = [];
  retroUus = [];
  validateConnectionTypeStatus = false;
  invalidBankruptcyRetro = false;
  invalidRetroSSNVelo = false;
  invalidRetroSSNUnauthUse = false;
  invalidRetroAddrVelo = false;
  invalidRetroAddrUnauthUse = false;
  invalidRetroPhoneVelo = false;
  invalidRetroPhoneUnauthUse = false;

  invalidBankruptcyRetroOne = false;
  invalidRetroSSNVeloOne = false;
  invalidRetroSSNUnauthUseOne = false;
  invalidRetroAddrVeloOne = false;
  invalidRetroAddrUnauthUseOne = false;
  invalidRetroPhoneVeloOne = false;
  invalidRetroPhoneUnauthUseOne = false;
  // tslint:disable-next-line:max-line-length
  retroactiveAlerts = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
  constructor(
    private http: Http,
    private _http: HttpClient,
    private app: AppComponent,
    private messageService: MessageService,
    private commonService: CommonService,
    private optionsService: OptionsService
  ) {
    this.api = environment.api;
  }
  ngOnInit() {
    this.userservice.nonBankcardMSO = '1';
    this.userservice.thresoldOption = '1';
  }
  getData = () => {
    this.userservice.icaBin = this.globalBin;
    this.fetchMso(this.userservice.icaBin);
    this.getRetroDelivery();
    this.getRetroVelocity();
    this.getRetroUu();
    setTimeout(() => {
      this.userservice.retroDelivery = this.retroDeliveries[0].value;
      this.userservice.bankruptcyRetros = this.retroVelocities[0].value;
      this.userservice.retroSSNVelo = this.retroVelocities[0].value;
      this.userservice.retroSSNUnauthUse = this.retroUus[0].value;
      this.userservice.retroAddrVelo = this.retroVelocities[0].value;
      this.userservice.retroAddrUnauthUse = this.retroUus[0].value;
      this.userservice.retroPhoneVelo = this.retroVelocities[0].value;
      this.userservice.retroPhoneUnauthUse = this.retroUus[0].value;
    }, 1000);
  }
  getRetroDelivery = () => {
    this.retroDeliveries = [];
    const url = this.api + '/mo/option/retrodelivery';
    this._http.get(url).subscribe(
      (res: Response) => {
        const result = res;
        Object.keys(result).map(key => {
          let pair = {
            'key': this.normalize(key),
            'value': result[key]
          };
          this.retroDeliveries.push(pair);
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  getRetroVelocity = () => {
    this.retroVelocities = [];
    const url = this.api + '/mo/option/retroVelvo';
    this._http.get(url).subscribe(
      (res: Response) => {
        const result = res;
        Object.keys(result).map(key => {
          let pair = {
            'key': this.normalize(key),
            'value': result[key]
          };
          this.retroVelocities.push(pair);
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  getRetroUu = () => {
    this.retroUus = [];
    const url = this.api + '/mo/option/retroUu';
    this._http.get(url).subscribe(
      (res: Response) => {
        const result = res;
        Object.keys(result).map(key => {
          let pair = {
            'key': this.normalize(key),
            'value': result[key]
          };
          this.retroUus.push(pair);
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  normalize = (key) => {
    let keyToNormalize = '';
    keyToNormalize = key.split('_').join(' ');
    const lowecaseSubstring = keyToNormalize.substring(1, keyToNormalize.length).toLowerCase();
    const uppercaseSubstring = keyToNormalize[0].toUpperCase();
    return (uppercaseSubstring + lowecaseSubstring);
  }
  validateConnectionType = () => {
    const url = this.api + '/mo/pcs/validateConnectionType';
    const body = { 'icaBin': this.userservice.icaBin, 'retroDelivery': this.userservice.retroDelivery };
    this.optionsService.validateConnectionType(url, body).subscribe(
      res => {
        this.validateConnectionTypeStatus = res;
        if (!this.validateConnectionTypeStatus) {
          this.showError('There is no electronic edit link between the Options tab and the Connection tab');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  validateRetroOff = (index) => {
    let invalidRetroOff = false;
    // tslint:disable-next-line:max-line-length
    const retroactiveAlertsTemp = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    retroactiveAlertsTemp.splice(index, 1);
    retroactiveAlertsTemp.splice(0, 1);
    if (!(this.userservice.retroDelivery === 'N')) {
      for (let i = 0; i < retroactiveAlertsTemp.length; i++) {
        if (this.userservice[retroactiveAlertsTemp[i]] === 'N') {
          invalidRetroOff = true;
          continue;
        } else {
          invalidRetroOff = false;
          break;
        }
      }
    } else {
      invalidRetroOff = false;
    }
    return invalidRetroOff;
  }
  validateRetroOne = (index) => {
    let invalidRetroOne = false;
    // tslint:disable-next-line:max-line-length
    const retroactiveAlertsTemp = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    retroactiveAlertsTemp.splice(index, 1);
    retroactiveAlertsTemp.splice(0, 1);
    if (!(this.userservice.retroDelivery === 'N')) {
      for (let i = 0; i < retroactiveAlertsTemp.length; i++) {
        if ((this.userservice[retroactiveAlertsTemp[i]] === 'N') || (this.userservice[retroactiveAlertsTemp[i]] === '1')) {
          invalidRetroOne = false;
          continue;
        } else {
          invalidRetroOne = true;
          break;
        }
      }
    } else {
      invalidRetroOne = true;
    }
    return invalidRetroOne;
  }
  validateRetroactive = () => {
    for (let i = 0; i < this.retroactiveAlerts.length; i++) {
      switch (this.retroactiveAlerts[i]) {
        case 'retroDelivery':
          break;
        case 'bankruptcyRetros':
          const bankruptcyRetrosValue = this.userservice[this.retroactiveAlerts[i]];
          if (bankruptcyRetrosValue === 'N') {
            this.invalidBankruptcyRetro = this.validateRetroOff(i);
          } else {
            if (bankruptcyRetrosValue === '1') {
              this.invalidBankruptcyRetroOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroSSNVelo':
          const retroSSNVeloValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroSSNVeloValue === 'N') {
            this.invalidRetroSSNVelo = this.validateRetroOff(i);
          } else {
            if (retroSSNVeloValue === '1') {
              this.invalidRetroSSNVeloOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroSSNUnauthUse':
          const retroSSNUnauthUseValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroSSNUnauthUseValue === 'N') {
            this.invalidRetroSSNUnauthUse = this.validateRetroOff(i);
          } else {
            if (retroSSNUnauthUseValue === '1') {
              this.invalidRetroSSNUnauthUseOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroAddrVelo':
          const retroAddrVeloValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroAddrVeloValue === 'N') {
            this.invalidRetroAddrVelo = this.validateRetroOff(i);
          } else {
            if (retroAddrVeloValue === '1') {
              this.invalidRetroAddrVeloOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroAddrUnauthUse':
          const retroAddrUnauthUseValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroAddrUnauthUseValue === 'N') {
            this.invalidRetroAddrUnauthUse = this.validateRetroOff(i);
          } else {
            if (retroAddrUnauthUseValue === '1') {
              this.invalidRetroAddrUnauthUseOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroPhoneVelo':
          const retroPhoneVeloValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroPhoneVeloValue === 'N') {
            this.invalidRetroPhoneVelo = this.validateRetroOff(i);
          } else {
            if (retroPhoneVeloValue === '1') {
              this.invalidRetroPhoneVeloOne = this.validateRetroOne(i);
            }
          }
          break;
        case 'retroPhoneUnauthUse':
          const retroPhoneUnauthUseValue = this.userservice[this.retroactiveAlerts[i]];
          if (retroPhoneUnauthUseValue === 'N') {
            this.invalidRetroPhoneUnauthUse = this.validateRetroOff(i);
          } else {
            if (retroPhoneUnauthUseValue === '1') {
              this.invalidRetroPhoneUnauthUseOne = this.validateRetroOne(i);
            }
          }
          break;
        default:
          return;
      }
    }
    let retroOffInvalid = false;
    let retroOneInvalid = false;
    let retroTwoThreeValid = false;
    let retroInvalid = false;
    if (this.userservice.retroDelivery !== 'N' && (this.checkRetroValues() || this.userservice.bankruptcyRetros === '2')) {
      retroTwoThreeValid = true;
    } else {
      retroTwoThreeValid = false;
    }
    if (retroTwoThreeValid) {
      retroInvalid = false;
    } else {
      // tslint:disable-next-line:max-line-length
      if (this.invalidRetroSSNVelo || this.invalidBankruptcyRetro || this.invalidRetroSSNUnauthUse || this.invalidRetroAddrVelo || this.invalidRetroAddrUnauthUse || this.invalidRetroPhoneVelo || this.invalidRetroPhoneUnauthUse) {
        retroOffInvalid = true;
      } else {
        retroOffInvalid = false;
      }
      // tslint:disable-next-line:max-line-length
      if (this.invalidRetroSSNVeloOne || this.invalidBankruptcyRetroOne || this.invalidRetroSSNUnauthUseOne || this.invalidRetroAddrVeloOne || this.invalidRetroAddrUnauthUseOne || this.invalidRetroPhoneVeloOne || this.invalidRetroPhoneUnauthUseOne) {
        retroOneInvalid = true;
      } else {
        retroOneInvalid = false;
      }
      if (retroOffInvalid || retroOneInvalid) {
        retroInvalid = true;
      } else {
        retroInvalid = false;
      }
      // Checking for retro alert value 2 and 3
      // tslint:disable-next-line:max-line-length
      if (this.userservice.retroDelivery === 'N' && (this.checkRetroValues() || this.userservice.bankruptcyRetros === '2') && retroInvalid === false) {
        retroInvalid = true;
      }
    }
    return retroInvalid;
  }
  // tslint:disable-next-line:max-line-length
  checkRetroValues = () => {
    return (this.userservice.retroAddrUnauthUse === '2' || this.userservice.retroAddrUnauthUse === '3' || this.userservice.retroAddrVelo === '2' || this.userservice.retroPhoneUnauthUse === '2' || this.userservice.retroPhoneUnauthUse === '3' || this.userservice.retroPhoneVelo === '2' || this.userservice.retroSSNUnauthUse === '2' || this.userservice.retroSSNUnauthUse === '3' || this.userservice.retroSSNVelo === '2')
  }
  setDefaultRetroOptions = () => {
    this.invalidBankruptcyRetro = false;
    this.invalidRetroSSNVelo = false;
    this.invalidRetroSSNUnauthUse = false;
    this.invalidRetroAddrVelo = false;
    this.invalidRetroAddrUnauthUse = false;
    this.invalidRetroPhoneVelo = false;
    this.invalidRetroPhoneUnauthUse = false;
    this.invalidBankruptcyRetroOne = false;
    this.invalidRetroSSNVeloOne = false;
    this.invalidRetroSSNUnauthUseOne = false;
    this.invalidRetroAddrVeloOne = false;
    this.invalidRetroAddrUnauthUseOne = false;
    this.invalidRetroPhoneVeloOne = false;
    this.invalidRetroPhoneUnauthUseOne = false;
  }
  cleardata = () => {
    this.userservice.bankruptcyAlertTimeframe = '';
    this.userservice.retroBankruptcyTimeframe = '';
    this.userservice.retroUnauthUseTimeFrame = '';
    this.userservice.retroVelocityTimeFrame = '';
    this.userservice.bankruptcyRetros = 'N';
    this.userservice.retroAddrUnauthUse = 'N';
    this.userservice.retroAddrVelo = 'N';
    this.userservice.retroPhoneUnauthUse = 'N';
    this.userservice.retroPhoneVelo = 'N';
    this.userservice.retroSSNUnauthUse = 'N';
    this.userservice.retroSSNVelo = 'N';
    this.userservice.retroDelivery = 'N';
    this.userservice.effectiveDate = '';
    this.userservice.nonBankcardMSO = '1';
    this.userservice.thresoldOption = '1';
    this.switch = true;
  }
  closePopup = () => {
    this.userservice.mso = null;
    this.display = false;
  }
  retrieve = (icaBin, mso) => {
    const url = this.api + '/mo/fetchMemberOption';
    if (mso === undefined || mso === '' || mso === null) {
      mso = this.defaultMso;
    }
    if (!_.isUndefined(icaBin) && !_.isUndefined(mso)) {
      this.app.displayloader();
      const body = { 'icaBin': icaBin, 'mso': mso, 'system': this.system };
      this.optionsService.retrieveOptions(url, body).subscribe(
        res => {
          const result = res;
          if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
            this.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
            this.binErrMsg = result.errors.BinValidation;
            this.app.hideloader();
            this.display = true;
          } else {
            if (res.icaBin !== null) {
              this.userservice = res;
              this.updatedBin = this.userservice.icaBin;
              this.changeGlobalBin.emit(this.updatedBin);
              this.switch = (this.userservice.nonBankcardMSO === '1') ? true : false;
            }
            this.app.hideloader();
          }
        },
        err => {
          this.app.hideloader();
        }
      );
      this.app.hideloader();
    }
  }
  fetchMso = (icaBin) => {
    const url = this.api + '/mo/mso';
    const body = { 'icaBin': icaBin };
    this.optionsService.fetchMso(url, body).subscribe(
      res => {
        this.msos = res;
        if ((!_.isUndefined(this.msos)) && (this.msos.includes('0'))) {
          this.userservice.mso = this.defaultMso;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  fetchExistingMso = (icaBin) => {
    const url = this.api + '/mo/mso';
    const body = { 'icaBin': icaBin };
    this.optionsService.fetchMso(url, body).subscribe(
      res => {
        this.existingMsos = res;
        if ((!_.isUndefined(this.existingMsos)) && (this.existingMsos.includes('0'))) {
          this.userservice.existingMso = this.defaultMso;
        }
      },
      err => {
        console.log(err.json());
      });
  }
  copyOptions = () => {
    this.app.displayloader();
    if (this.userservice.mso === undefined || this.userservice.mso === '') {
      this.userservice.mso = this.defaultMso;
    }
    const url = this.api + '/mo/createCopyConfig';
    const body = {
      'icsMemberOptionTblDto': {
        'icaBin': this.userservice.existingBin,
        'mso': this.userservice.existingMso
      },
      'newBin': this.userservice.icaBin,
      'newMso': this.userservice.mso,
      'lastUpdateUserId': localStorage.currentUser
    };
    this.optionsService.copyOptions(url, body).subscribe(
      res => {
        const result = res;
        if (result.response === false) {
          const keys = Object.keys(result.errors);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            this.app.hideloader();
            this.cleardata();
            this.showError('Incomplete data found in ' + keys + ' for the given BIN and MSO.');
          }
        } if (result.response === true) {
          this.app.hideloader();
          this.cleardata();
          this.showSuccess('Options copied and saved');
        }
      }, err => {
        this.app.hideloader();
        this.cleardata();
        this.showError('Options copy failed');
      });
  }
  // form submit
  onSubmit = (data, optionsForm: NgForm) => {
    const url = this.api + '/mo/createMemberOption';
    this.app.displayloader();
    this.submitted = true;
    let retroStatusInvalid = this.validateRetroactive();
    if (retroStatusInvalid) {
      this.app.hideloader();
      this.setDefaultRetroOptions();
      this.showError('Invalid Retroactive Alert Options Scenario');
    } else {
      if (data.mso === undefined || data.mso === '') {
        data.mso = this.defaultMso;
      }
      data['assocFlag'] = 'v';
      data['lastUpdatedUserId'] = 'userId';
      data['nonBankcardMSO'] = data.nonBankcard ? '1' : '0';
      data['system'] = this.system;
      this.optionsService.saveOptions(url, JSON.stringify(data)).subscribe(
        res => {
          const result = res;
          if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
            this.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
            this.binErrMsg = result.errors.BinValidation;
            this.app.hideloader();
            this.display = true;
          } else {
            this.updatedBin = result.icaBin;
            this.changeGlobalBin.emit(this.updatedBin);
            this.cleardata();
            if (!this.msos.includes(result.mso)) {
              this.msos.push(result.mso);
            }
            this.app.hideloader();
            this.showSuccess('Options save successfull');
          }
        },
        err => {
          this.app.hideloader();
          this.showError('Options save failed');
        }
      );
    }
    this.app.hideloader();
  }
  // Messages section
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: msg });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: msg });
  }
}
