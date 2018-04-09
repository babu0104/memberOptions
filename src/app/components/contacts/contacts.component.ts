import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../../_services/contacts.service';
import { User } from '../../user';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { CommonService } from '../../_services/common.service';
import { RequestMethod } from '@angular/http/src/enums';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { debug } from 'util';
import { environment } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
import * as _ from 'underscore';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessageService, ContactsService, CommonService]
})
export class ContactsComponent implements OnInit {
  @Input() updatedBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  tempUser;
  globalBin = ''
  zipcode = '';
  bofaxvalue = '';
  phonevalue = '';
  tcphonevalue = '';
  tcfaxvalue = '';
  binErrMsg = '';
  newBidBinExist = '';
  system = 'ICS';
  newBin = false;
  display = false;
  bidModified = false;
  binModified = false;
  displayNewBidBin = false;
  listOfStates = [];
  icabins: string[] = [];
  filteredBins: any[];
  icabin: string;
  msgs: Message[] = [];
  bidLastUpdatedDate: any;
  binLastUpdatedDate: any;
  user = new User();
  private api: string;
  // tslint:disable-next-line:max-line-length
  constructor(private commonService: CommonService, private contactsService: ContactsService, private http: Http, private messageService: MessageService, private app: AppComponent) {
    this.api = environment.api;
    this.getStateCityList();
  }
  ngOnInit() { }
  getData() { this.user.icabin = this.updatedBin ? this.updatedBin : ''; }
  getStateCityList = () => {
    this.listOfStates = [];
    this.commonService.getStateCityList().subscribe(res => {
      const result = res;
      for (let i = 0; i < result.length; i++) {
        this.listOfStates.push(result[i].stateCode);
      }
    },
      err => { console.log(err); }
    );
  }
  filterBins = (event) => {
    this.filteredBins = [];
    if (this.icabins != null) {
      for (let i = 0; i < this.icabins.length; i++) {
        const icabin = this.icabins[i];
        if (icabin.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          this.filteredBins.push(icabin);
        }
      }
    }
  }
  BIDchanged = () => { this.bidModified = true; }
  BINchanged = () => { this.binModified = true; }
  phoneno = (value) => { this.phonevalue = this.phoneformatter(value); }
  bofaxno = (value) => { this.bofaxvalue = this.phoneformatter(value); }
  tcfaxno = (value) => { this.tcfaxvalue = this.phoneformatter(value); }
  tcphoneno = (value) => { this.tcphonevalue = this.phoneformatter(value); }
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
        // tslint:disable-next-line:max-line-length
        const body = { 'businessId': this.user.businessId, 'icaBin': this.user.icabin, 'system': this.system, 'newBidBin': false };
        this.contactsService.checkbin(body).subscribe(res => {
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
          err => { }
        );
      }
    } else {
      console.log('Both field necessary');
    }
  }
  clearBidBin(contactsform) {
    contactsform.controls.businessId.reset();
    contactsform.controls.icabin.reset();
    this.displayNewBidBin = false;
  }
  fetchContact = (businessId, icaBin) => {
    localStorage.setItem('IcsBinNumber', icaBin);
    let result;
    this.app.displayloader();
    const body = { 'businessId': businessId, 'icaBin': icaBin, 'system': this.system, 'newBidBin': false };
    this.contactsService.fetchContact(body).subscribe(res => {
      result = res;
      if (!_.isUndefined(result.errors.BidAndBin)) {
        this.binErrMsg = result.errors.BidAndBin;
        this.app.hideloader();
        this.display = true;
      } else {
        const self = this;
        self.tempUser = result;
        this.globalBin = result.icaBin;
        this.changeGlobalBin.emit(this.globalBin);
        self.appendToForm(result);
        this.app.hideloader();
      }
    },
      err => {
        console.log(err);
        this.app.hideloader();
      }
    );
    this.app.hideloader();
  }
  createNewBin = (icsContactForm: NgForm) => {
    this.displayNewBidBin = false;
    this.app.displayloader();
    const body = { 'businessId': this.user.businessId, 'icaBin': this.user.icabin, 'system': this.system, 'newBidBin': true };
    this.contactsService.createNewBin(body).subscribe(
      res => {
        const result = res;
        this.globalBin = result.icaBin;
        this.changeGlobalBin.emit(this.globalBin);
        this.app.hideloader();
        this.cleardata(icsContactForm);
      },
      err => { console.log(err); }
    );
    this.app.hideloader();
  }
  fetchBin = (businessId) => {
    const body = { 'businessId': businessId };
    this.contactsService.fetchBin(body).subscribe(
      res => {
        this.icabins = res;
      },
      err => { console.log(err); }

    );
    if (!_.isUndefined(this.user.icabin)) {
      this.checkbin(businessId, this.user.icabin);
    }
  }
  cleardata = (icsContactForm) => {
    icsContactForm.controls.boName.reset();
    icsContactForm.controls.boPhone.reset();
    icsContactForm.controls.boFax.reset();
    icsContactForm.controls.boEmail.reset();
    icsContactForm.controls.tcName.reset();
    icsContactForm.controls.tcPhone.reset();
    icsContactForm.controls.tcFax.reset();
    icsContactForm.controls.tcEmail.reset();
    icsContactForm.controls.mbrZipCode.reset();
    icsContactForm.controls.mbrState.reset();
    icsContactForm.controls.mbrCity.reset();
    icsContactForm.controls.mbrAddr2.reset();
    icsContactForm.controls.mbrAddr1.reset();
    icsContactForm.controls.mbrName.reset();
    // icsContactForm.controls.bidLastUpdatedDate.reset();
    // icsContactForm.controls.binLastUpdatedDate.reset();
  }
  closePopup = () => {
    this.user.icabin = null;
    this.display = false;
  }
  saveContact = (user, icsContactForm: NgForm) => {
    this.app.displayloader();
    const currentUserLoggedInDetails = localStorage.getItem('currentUser');
    const assocFlag = user.assocFlag ? user.assocFlag : 'v';
    const bidModified = this.bidModified;
    const newBidBin = true;
    const binModified = (this.binModified || this.newBin) ? true : false;
    // tslint:disable-next-line:max-line-length
    const newIntMemberTblDto = this.contactsService.createIntMemberTblDto(user.icabin, assocFlag, user.boName, user.boPhone, user.boFax, user.boEmail, user.tcName, user.tcPhone, user.tcFax, user.tcEmail, binModified, currentUserLoggedInDetails);
    // tslint:disable-next-line:max-line-length
    const newIntMemberIcsDirectTblDto = this.contactsService.createIntMemberIcsDirectTblDto(user.businessId, user.mbrName, user.mbrAddr1, user.mbrAddr2, user.mbrCity, user.mbrState, user.mbrZipCode, bidModified, currentUserLoggedInDetails);
    // tslint:disable-next-line:max-line-length
    const createIcsMemberBinBidAssocDto = this.contactsService.createIcsMemberBinBidAssocDto(user.businessId, user.icabin, user.procId, currentUserLoggedInDetails);
    // tslint:disable-next-line:max-line-length
    const newContact = this.contactsService.createContact(user.businessId, user.icabin, this.system, newBidBin, newIntMemberTblDto, newIntMemberIcsDirectTblDto, createIcsMemberBinBidAssocDto);

    this.contactsService.saveContact(JSON.stringify(newContact)).subscribe(
      data => {
        const result = data;
        if (!_.isUndefined(result.errors.BidAndBin)) {
          this.binErrMsg = result.errors.BidAndBin;
          this.app.hideloader();
          this.display = true;
        } else {
          this.app.hideloader();
          this.globalBin = result.icaBin;
          this.changeGlobalBin.emit(this.globalBin);
          this.cleardata(icsContactForm);
          this.showSuccess();
        }
      },
      err => {
        this.app.hideloader();
        this.showError();
      }
    );
    this.app.hideloader();
  }
  cancelContact = () => { this.appendToForm(this.tempUser); }
  appendToForm = (result) => {
    this.user.businessId = (result.businessId != null) ? result.businessId : '';
    this.user.icabin = (result.icaBin != null) ? result.icaBin : ((this.user.icabin !== '') ? this.user.icabin : '');
    this.user.procId = (result.icsMemberBinBidAssocDto != null) ? result.icsMemberBinBidAssocDto.procId : null;
    if (result.intMemberIcsDirectTblDto != null) {
      this.user.mbrName = result.intMemberIcsDirectTblDto.mbrName;
      this.user.mbrAddr1 = result.intMemberIcsDirectTblDto.mbrAddr1;
      this.user.mbrAddr2 = result.intMemberIcsDirectTblDto.mbrAddr2;
      this.user.mbrCity = result.intMemberIcsDirectTblDto.mbrCity;
      this.user.mbrState = result.intMemberIcsDirectTblDto.mbrState;
      this.user.mbrZipCode = result.intMemberIcsDirectTblDto.mbrZipCode;
      this.bidLastUpdatedDate = result.intMemberIcsDirectTblDto.lastModifiedOn;
    }
    if (result.intMemberTblDto != null) {
      this.user.boName = result.intMemberTblDto.boName;
      this.user.boPhone = result.intMemberTblDto.boPhone;
      this.user.boFax = result.intMemberTblDto.boFax;
      this.user.boEmail = result.intMemberTblDto.boEmail;
      this.user.tcName = result.intMemberTblDto.tcName;
      this.user.tcPhone = result.intMemberTblDto.tcPhone;
      this.user.tcFax = result.intMemberTblDto.tcFax;
      this.user.tcEmail = result.intMemberTblDto.tcEmail;
      this.binLastUpdatedDate = result.intMemberTblDto.lastModifiedOn;
    }
  }
  showSuccess = () => {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'User updation successfull'});
  }
  showError = () => {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'User updation failed'});
  }
}
