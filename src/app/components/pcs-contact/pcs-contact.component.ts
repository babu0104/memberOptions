import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PcsContactsService } from '../../_services/pcs-contacts.service';
import { User } from '../../user';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { RequestMethod } from '@angular/http/src/enums';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
@Component({
  selector: 'app-pcs-contact',
  templateUrl: './pcs-contact.component.html',
  styleUrls: ['./pcs-contact.component.scss'],
  providers: [MessageService, PcsContactsService]
})

export class PcsContactComponent implements OnInit {
  @Input() updatedBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  globalBin = "";
  bidModified = false;
  binModified = false;
  zipcode: any = '';
  bofaxvalue: any = '';
  phonevalue: any = '';
  tcphonevalue: any = '';
  tcfaxvalue: any = '';
  bopmfaxvalue: any = '';
  bopmphonevalue: any = '';
  tcpmphonevalue: any = '';
  tcpmfaxvalue: any = '';
  user = new User();
  tempUser: any;
  icabins: string[] = [];
  filteredBins: any[];
  icabin: string;
  msgs: Message[] = [];
  newBin = false;
  display = false;
  displayNewBidBin = false;
  today = Date();
  lastModifiedOnBid: string;
  lastModifiedOnBin: string;
  listOfStates = [];
  system = "PCS";
  api: string;
  binErrMsg = "";
  newBidBinExist = "";
  constructor(
    private contactsService: PcsContactsService,
    private http: Http,
    private _http: HttpClient,
    private messageService: MessageService,
    private App: AppComponent
  ) {
    this.api = environment.api;
  }
  ngOnInit() {
    this.getStateCityList();
  }
  getBin = () => {
    this.user.icabin = this.updatedBin ? this.updatedBin : "";
  }
  getStateCityList = () => {
    // const urlForListOfState = this.api + '/mo/fetchStates';
    this.contactsService.getStateCityList().subscribe(
      res => {
        const result = res;
        for (let i = 0; i < result.length; i++) {
          this.listOfStates.push(result[i].stateCode);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  filterBins = (event) => {
    this.filteredBins = [];
    if (this.icabins !== null) {
      for (let i = 0; i < this.icabins.length; i++) {
        const icabin = this.icabins[i];
        if (icabin.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          this.filteredBins.push(icabin);
        }
      }
    }
  }
  BIDchanged = () => {
    this.bidModified = true;
  }
  BINchanged = () => {
    this.binModified = true;
  }
  phoneformatter = (value) => {
    if (value != null) {
      const num = value.toString().replace(/\D/g, '');
      if (num.length === 7) {
        return num.substr(0, 3) + '-' + num.substr(3, 4);
      }
      if (num.length === 10) {
        return num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6, 4);
      }
    }
  }
  phoneno = (value) => {
    this.phonevalue = this.phoneformatter(value);
  }
  bofaxno = (value) => {
    this.bofaxvalue = this.phoneformatter(value);
  }
  tcphoneno = (value) => {
    this.tcphonevalue = this.phoneformatter(value);
  }
  tcfaxno = (value) => {
    this.tcfaxvalue = this.phoneformatter(value);
  }
  bopmphoneno = (value) => {
    this.bopmphonevalue = this.phoneformatter(value);
  }
  bopmfaxno = (value) => {
    this.bopmfaxvalue = this.phoneformatter(value);
  }
  tcpmphoneno = (value) => {
    this.tcpmphonevalue = this.phoneformatter(value);
  }
  tcpmfaxno = (value) => {
    this.tcpmfaxvalue = this.phoneformatter(value);
  }
  setZip = (value) => {
    if (value != null) {
      const num = value.toString().replace(/\D/g, '');
      if (num.length === 9) {
        this.zipcode = num.substr(0, 5) + '-' + num.substr(5);
      }
    }
  }
  checkbin = (businessId, icabin) => {
    if (!_.isUndefined(this.user.businessId) && !_.isUndefined(this.user.icabin)) {
      if (businessId.length >= 6 && icabin.length > 5) {
        let result;
        const url = this.api + '/mo/pcs/retriveContactInfo';
        const body = {
          'businessId': this.user.businessId,
          'icaBin': this.user.icabin,
          'system': this.system,
          'newBidBin': false
        };
        this.contactsService.checkbin(body).subscribe(
          res => {
            const result = res;
            if (!_.isUndefined(result.errors.BidAndBin)) {
              this.binErrMsg = result.errors.BidAndBin;
              this.display = true;
            }
            if (!_.isUndefined(result.errors.newBidBin)) {
              this.newBidBinExist = result.errors.newBidBin;
              this.displayNewBidBin = true;
            }
          },
          err => {
          }
        );

      }
    } else {
      console.log("Both field necessary");
    }
  }
  clearBidBin(contactsform) {
    contactsform.controls.businessId.reset();
    contactsform.controls.icabin.reset();
    this.displayNewBidBin = false;
  }
  fetchContact = (businessId, icaBin) => {
    this.App.displayloader();
    let result;
    // const url = this.api + '/mo/pcs/retriveContactInfo';
    const body = {
      'businessId': businessId,
      'icaBin': icaBin,
      'system': this.system,
      'newBidBin': false
    };
    this.contactsService.fetchContact(body).subscribe(res => {
      const result = res;
      this.globalBin = result.icaBin;
      this.changeGlobalBin.emit(this.globalBin);
      this.tempUser = result;
      this.appendToForm(result);
      this.App.hideloader();
    },
      err => {
        this.App.hideloader();
      }
    );
    this.App.hideloader();
  }
  createNewBin = () => {
    this.displayNewBidBin = false;
    this.App.displayloader();
    let result;
    // const url = this.api + '/mo/pcs/retriveContactInfo';
    const body = {
      'businessId': this.user.businessId,
      'icaBin': this.user.icabin,
      'system': this.system,
      'newBidBin': true
    };
    this.contactsService.createNewBin(body).subscribe(res => {
      const result = res;
      this.globalBin = result.icaBin;
      this.changeGlobalBin.emit(this.globalBin);
      this.tempUser = result;
      this.appendToForm(result);
      this.App.hideloader();
    },
      err => {
        console.log(err);
      }
    );
    this.App.hideloader();
  }
  fetchBin = (businessId) => {
    // const url = this.api + '/mo/pcs/fetchListOfBinsByBid';
    const body = { 'businessId': businessId };
    this.contactsService.fetchBin(body).subscribe(data => {
      this.icabins = data;
    },
      err => {
        console.log(err);
      });
    if (!_.isUndefined(this.user.icabin)) {
      this.checkbin(businessId, this.user.icabin);
    }
  }

  saveBin = () => {
    this.display = false;
    this.cleardata();
  }
  cleardata() {
    this.user.mbrZipCode = "";
    this.user.mbrState = "";
    this.user.mbrCity = "";
    this.user.mbrAddr2 = "";
    this.user.mbrAddr1 = "";
    this.user.mbrName = "";
    this.user.boName = "";
    this.user.boPhone = "";
    this.user.boFax = "";
    this.user.boEmail = "";
    this.user.tcName = "";
    this.user.tcPhone = "";
    this.user.tcFax = "";
    this.user.tcEmail = "";
    this.user.pmBoName = "";
    this.user.pmBoPhone = "";
    this.user.pmBoFax = "";
    this.user.pmBoEmail = "";
    this.user.pmTcName = "";
    this.user.pmTcPhone = "";
    this.user.pmTcFax = "";
    this.user.pmTcEmail = "";
    this.lastModifiedOnBid = "";
    this.lastModifiedOnBin = "";
  }
  closePopup = () => {
    this.user.icabin = null;
    this.display = false;
  }
  saveContact = (user, pcsContactsForm: NgForm) => {
    const _self = this;
    _self.App.displayloader();
    // const url = this.api + '/mo/pcs/saveOrUpdateContactInfo';

    const currentUserLoggedInDetails = localStorage.getItem('currentUser');
    const assocFlag = 'v';
    const loadTs = '';
    const extractTs = '';
    const newBidBin = true;
    const lastUpdtUserId = localStorage.getItem('currentUser');
    const lastModifiedOn = '';
    localStorage.setItem('PcsBin', user.icabin);

    const bidModified = this.bidModified;
    const binModified = (this.binModified || this.newBin) ? true : false;

    const newIntMemberTblDto = this.contactsService.createIntMemberTblDto(
      user.icabin, assocFlag, user.boName, user.boPhone, user.boFax, user.boEmail, user.tcName, user.tcPhone,
      user.tcFax, user.tcEmail, user.pmBoName, user.pmBoPhone, user.pmBoFax, user.pmBoEmail, user.pmTcName,
      user.pmTcPhone, user.pmTcFax, user.pmTcEmail, binModified, lastModifiedOn
    );
    const newIntMemberIcsDirectTblDto = this.contactsService.createIntMemberIcsDirectTblDto(
      user.businessId, user.mbrName, user.mbrAddr1, user.mbrAddr2, user.mbrCity, user.mbrState, user.mbrZipCode,
      bidModified, lastModifiedOn
    );
    const createIcsMemberBinBidAssocDto = this.contactsService.createIcsMemberBinBidAssocDto(
      user.businessId, user.icabin, user.procId, lastModifiedOn
    );
    const newContact = this.contactsService.createContact(
      user.businessId, user.icabin, _self.system, newBidBin, newIntMemberTblDto, newIntMemberIcsDirectTblDto,
      createIcsMemberBinBidAssocDto, loadTs, extractTs, lastUpdtUserId
    );
    this.contactsService.saveContact(JSON.stringify(newContact)).subscribe(
      data => {
        const result = data;
        if (!_.isUndefined(result.errors.BidAndBin)) {
          _self.binErrMsg = result.errors.BidAndBin;
          _self.App.hideloader();
          _self.display = true;
        } else {
          _self.App.hideloader();
          const self = this;
          self.globalBin = result.icaBin;
          this.changeGlobalBin.emit(self.globalBin);
          this.showSuccess();
          this.cleardata();
          this.lastModifiedOnBid = null;
          this.lastModifiedOnBin = null;
        }
      },
      err => {
        _self.App.hideloader();
        this.showError();
      }
    );
    _self.App.hideloader();
  }
  cancelContact = () => {
    this.appendToForm(this.tempUser);
  }
  appendToForm = (result) => {
    this.user.businessId = ((result !== undefined) && (result.businessId != null)) ? result.businessId : '';
    // tslint:disable-next-line:max-line-length
    this.user.icabin = ((result !== undefined) && (result.icaBin != null)) ? result.icaBin : ((this.user.icabin !== '') ? this.user.icabin : '');
    // tslint:disable-next-line:max-line-length
    this.user.procId = ((result !== undefined) && (result.icsMemberBinBidAssocDto != null)) ? result.icsMemberBinBidAssocDto.procId : null;
    if ((result !== undefined) && (result.intMemberIcsDirectTblDto != null)) {
      this.user.mbrName = result.intMemberIcsDirectTblDto.mbrName;
      this.user.mbrAddr1 = result.intMemberIcsDirectTblDto.mbrAddr1;
      this.user.mbrAddr2 = result.intMemberIcsDirectTblDto.mbrAddr2;
      this.user.mbrCity = result.intMemberIcsDirectTblDto.mbrCity;
      this.user.mbrState = result.intMemberIcsDirectTblDto.mbrState;
      this.user.mbrZipCode = result.intMemberIcsDirectTblDto.mbrZipCode;
      this.lastModifiedOnBid = result.intMemberIcsDirectTblDto.lastModifiedOn;
    } else {
      this.user.mbrName = '';
      this.user.mbrAddr1 = '';
      this.user.mbrAddr2 = '';
      this.user.mbrCity = '';
      this.user.mbrState = '';
      this.user.mbrZipCode = '';
    }
    if ((result !== undefined) && (result.intMemberTblDto != null)) {
      this.user.boName = result.intMemberTblDto.boName;
      this.user.boPhone = result.intMemberTblDto.boPhone;
      this.user.boFax = result.intMemberTblDto.boFax;
      this.user.boEmail = result.intMemberTblDto.boEmail;
      this.user.tcName = result.intMemberTblDto.tcName;
      this.user.tcPhone = result.intMemberTblDto.tcPhone;
      this.user.tcFax = result.intMemberTblDto.tcFax;
      this.user.tcEmail = result.intMemberTblDto.tcEmail;
      this.user.pmBoName = result.intMemberTblDto.pmBoName;
      this.user.pmBoPhone = result.intMemberTblDto.pmBoPhone;
      this.user.pmBoFax = result.intMemberTblDto.pmBoFax;
      this.user.pmBoEmail = result.intMemberTblDto.pmBoEmail;
      this.user.pmTcName = result.intMemberTblDto.pmTcName;
      this.user.pmTcPhone = result.intMemberTblDto.pmTcPhone;
      this.user.pmTcFax = result.intMemberTblDto.pmTcFax;
      this.user.pmTcEmail = result.intMemberTblDto.pmTcEmail;
      this.lastModifiedOnBin = result.intMemberTblDto.lastModifiedOn;
    } else {
      this.user.boName = '';
      this.user.boPhone = '';
      this.user.boFax = '';
      this.user.boEmail = '';
      this.user.tcName = '';
      this.user.tcPhone = '';
      this.user.tcFax = '';
      this.user.tcEmail = '';
      this.user.pmBoName = '';
      this.user.pmBoPhone = '';
      this.user.pmBoFax = '';
      this.user.pmBoEmail = '';
      this.user.pmTcName = '';
      this.user.pmTcPhone = '';
      this.user.pmTcFax = '';
      this.user.pmTcEmail = '';
    }
  }
  showSuccess = () => {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'User updation successfull' });
  }
  showError = () => {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'User updation failed' });
  }
}

