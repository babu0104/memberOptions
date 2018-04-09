import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { UserService } from '../../userService';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { OptionsService } from '../../_services/options.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
@Component({
  selector: 'app-ics-mso',
  templateUrl: './ics-mso.component.html',
  styleUrls: ['./ics-mso.component.scss'],
  providers: [MessageService, OptionsService]
})
export class IcsMsoComponent implements OnInit {
  data: any;
  sub: any;
  api: string;
  mso: string;
  filteredOptions: any[];
  switch = true;
  retroDeliveries = [];
  retroVelocities = [];
  retroUus = [];
  msos: string[] = [];
  existingMsos: string[] = [];
  msgs: Message[] = [];
  system = 'ICS';
  defaultMso = '0';
  errorMessage = '';
  newMso = false;
  binErrMsg = '';
  binRelatedMsg = '';
  display = false;
  displayMSO = false;
  submitted = false;
  showBankruptcy = false;
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

  retroactiveAlerts = [];
  userservice = new UserService();
  constructor(
    private http: Http,
    private messageService: MessageService,
    private optionsService: OptionsService,
    private app: AppComponent,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
    this.api = environment.api;
    this.userservice.nonBankcardMSO = '1';
    this.userservice.thresoldOption = '1';
    this.sub = this.route.params.subscribe(params => {
      this.system = params.system;
      if (this.system === 'ICS') {
        this.showBankruptcy = true;
        // tslint:disable-next-line:max-line-length
        this.retroactiveAlerts = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
      } else {
        this.showBankruptcy = false;
        // tslint:disable-next-line:max-line-length
        this.retroactiveAlerts = ['retroDelivery', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
      }
    });
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getRetroDelivery = () => {
    this.retroDeliveries = [];
    const url = this.api + '/mo/option/retrodelivery';
    this.httpClient.get(url).subscribe(
      res => {
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
    this.httpClient.get(url).subscribe(
      res => {
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
    this.httpClient.get(url).subscribe(
      res => {
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
    let retroactiveAlertsTemp;
    if (this.system === 'ICS') {
      // tslint:disable-next-line:max-line-length
      retroactiveAlertsTemp = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    } else {
      // tslint:disable-next-line:max-line-length
      retroactiveAlertsTemp = ['retroDelivery', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    }
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
    let retroactiveAlertsTemp;
    if (this.system === 'ICS') {
      // tslint:disable-next-line:max-line-length
      retroactiveAlertsTemp = ['retroDelivery', 'bankruptcyRetros', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    } else {
      // tslint:disable-next-line:max-line-length
      retroactiveAlertsTemp = ['retroDelivery', 'retroSSNVelo', 'retroSSNUnauthUse', 'retroAddrVelo', 'retroAddrUnauthUse', 'retroPhoneVelo', 'retroPhoneUnauthUse'];
    }
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
    let retroInvalid = false;
    if (this.system === 'ICS') {
      let retroOffInvalid = false;
      let retroOneInvalid = false;
      let retroTwoThreeValid = false;
      retroInvalid = false;
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
        if (this.userservice.retroDelivery === 'N' && (this.checkRetroValues() || this.userservice.bankruptcyRetros === '2') && retroInvalid === false) {
          retroInvalid = true;
        }
      }
    } else {
      let retroOffInvalid = false;
      let retroOneInvalid = false;
      let retroTwoThreeValid = false;
      retroInvalid = false;

      if (this.userservice.retroDelivery !== 'N' && this.checkRetroValues()) {
        retroTwoThreeValid = true;
      } else {
        retroTwoThreeValid = false;
      }
      if (retroTwoThreeValid) {
        retroInvalid = false;
      } else {
        if (this.invalidRetroSSNVelo || this.invalidRetroSSNUnauthUse || this.invalidRetroAddrVelo || this.invalidRetroAddrUnauthUse || this.invalidRetroPhoneVelo || this.invalidRetroPhoneUnauthUse) {
          retroOffInvalid = true;
        } else {
          retroOffInvalid = false;
        }
        if (this.invalidRetroSSNVeloOne || this.invalidRetroSSNUnauthUseOne || this.invalidRetroAddrVeloOne || this.invalidRetroAddrUnauthUseOne || this.invalidRetroPhoneVeloOne || this.invalidRetroPhoneUnauthUseOne) {
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
        if (this.userservice.retroDelivery === 'N' && this.checkRetroValues() && retroInvalid === false) {
          retroInvalid = true;
        }
      }
    }
    return retroInvalid;
  }
  // tslint:disable-next-line:max-line-length
  checkRetroValues = () => {
    return (this.userservice.retroAddrUnauthUse === '2' || this.userservice.retroAddrUnauthUse === '3' || this.userservice.retroAddrVelo === '2' || this.userservice.retroPhoneUnauthUse === '2' || this.userservice.retroPhoneUnauthUse === '3' || this.userservice.retroPhoneVelo === '2' || this.userservice.retroSSNUnauthUse === '2' || this.userservice.retroSSNUnauthUse === '3' || this.userservice.retroSSNVelo === '2')
  }
  setDefaultRetroOptions = () => {
    this.invalidRetroSSNVelo = false;
    this.invalidRetroSSNUnauthUse = false;
    this.invalidRetroAddrVelo = false;
    this.invalidRetroAddrUnauthUse = false;
    this.invalidRetroPhoneVelo = false;
    this.invalidRetroPhoneUnauthUse = false;
    this.invalidRetroSSNVeloOne = false;
    this.invalidRetroSSNUnauthUseOne = false;
    this.invalidRetroAddrVeloOne = false;
    this.invalidRetroAddrUnauthUseOne = false;
    this.invalidRetroPhoneVeloOne = false;
    this.invalidRetroPhoneUnauthUseOne = false;
    if (this.system === 'ICS') {
      this.invalidBankruptcyRetro = false;
      this.invalidBankruptcyRetroOne = false;
    }
  }
  fetchMso = (icaBin) => {
    let url;
    if (this.system === 'ICS') {
      url = this.api + '/mo/mso';
    } else {
      url = this.api + '/mo/pcs/mso';
    }
    const body = { 'icaBin': icaBin };
    this.optionsService.fetchMso(url, body).subscribe(
      res => {
        this.msos = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  fetchExistingMso = (icaBin) => {
    let url;
    if (this.system === 'ICS') {
      url = this.api + '/mo/mso';
    } else {
      url = this.api + '/mo/pcs/mso';
    }
    const body = { 'icaBin': icaBin };
    this.optionsService.fetchMso(url, body).subscribe(
      res => {
        this.existingMsos = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  copyOptions = () => {
    let url;
    let body;
    if (this.system === 'ICS') {
      url = this.api + '/mo/createCopyConfig';
      body = {
        'icsMemberOptionTblDto': {
          'icaBin': this.userservice.existingBin,
          'mso': this.userservice.existingMso
        },
        'newBin': this.userservice.icaBin,
        'newMso': this.userservice.mso,
        'lastUpdateUserId': localStorage.currentUser
      };
    } else {
      url = this.api + '/mo/pcs/createCopyConfig';
      body = {
        'pcsMemberOptionTblDto': {
          'icaBin': this.userservice.existingBin,
          'mso': this.userservice.existingMso
        },
        'newBin': this.userservice.icaBin,
        'newMso': this.userservice.mso,
        'lastUpdateUserId': localStorage.currentUser
      };
    }
    this.app.displayloader();
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
      }
    );
    this.app.hideloader();
  }
  checkMso = (mso) => {
    if (!_.isNull(this.msos)) {
      if (this.msos.length > 0) {
        if (this.msos.includes(mso)) {
          this.newMso = false;
        } else {
          this.newMso = true;
        }
      }
    }
  }
  retrieve = (value, icaBin, mso) => {
    this.app.displayloader();
    const div = document.getElementsByClassName('retrieve-data');
    div[value].classList.add('show');
    let url;
    if (this.system === 'ICS') {
      url = this.api + '/mo/fetchMemberOption';
    } else {
      url = this.api + '/mo/pcs/fetchMemberOption';
    }
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
          if (this.msos === null) {
            this.newMso = true;
          } else {
            this.checkMso(this.userservice.mso);
          }
          if (this.newMso) {
            this.displayMSO = true;
          } else {
            if (res.icaBin !== null) {
              this.userservice = res;
              this.switch = (this.userservice.nonBankcardMSO === '1') ? true : false;
            }
            this.app.hideloader();
          }
        }
      },
      err => {
        this.app.hideloader();
      }
    );
    this.app.hideloader();
  }
  saveMso = () => {
    this.displayMSO = false;
    this.cleardata();
  }
  closePopup = () => {
    this.displayMSO = false;
    this.userservice.mso = '';
    this.cleardata();
  }
  cleardata = () => {
    this.userservice.retroUnauthUseTimeFrame = '';
    this.userservice.retroVelocityTimeFrame = '';
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
    if (this.system === 'ICS') {
      this.userservice.bankruptcyAlertTimeframe = '';
      this.userservice.retroBankruptcyTimeframe = '';
      this.userservice.bankruptcyRetros = 'N';
    }
  }
  onSubmit = (data, optionsForm: NgForm) => {
    this.app.displayloader();
    this.submitted = true;
    let retroStatusInvalid = this.validateRetroactive();
    if (retroStatusInvalid) {
      this.app.hideloader();
      this.setDefaultRetroOptions();
      this.showError('Invalid Retroactive Alert Options Scenario');
    } else {
      let url;
      if (this.system === 'ICS') {
        url = this.api + '/mo/createMemberOption';
      } else {
        url = this.api + '/mo/pcs/createMemberOption';
      }
      data.assocFlag = 'v';
      data.lastUpdatedUserId = localStorage.getItem('currentUser');
      data.nonBankcardMSO = data.nonBankcard ? '1' : '0';
      data.system = this.system;
      this.optionsService.saveOptions(url, JSON.stringify(data)).subscribe(
        res => {
          const optionData = res;
          if (!_.isUndefined(optionData.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(optionData.errors.BinValidation)) {
            this.binRelatedMsg = optionData.errors.BinRelatedToIcsOrPcs;
            this.binErrMsg = optionData.errors.BinValidation;
            this.app.hideloader();
            this.display = true;
          } else {
            this.cleardata();
            if (!_.isNull(this.msos)) {
              if (!this.msos.includes(optionData.mso)) {
                this.msos.push(optionData.mso);
              }
            }
            this.app.hideloader();
            this.showSuccess('Options save/update successfull');
          }
        },
        err => {
          this.app.hideloader();
          this.showError('Options save/update failed');
        }
      );
      this.app.hideloader();
    }
  }
  showSuccess = (msg) => {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: msg });
  }
  showError = (msg) => {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: msg });
  }
}
