import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { FileReport, ContactInfoDto } from '../../_models/prescreen/file-report';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from '../../../environments/environment';
import { FileReportService } from '../../_services/file-report.service';
import { CommonService } from '../../_services/common.service';
import { AppComponent } from '../../app.component';
import * as _ from 'underscore';
import { Util } from '../../../app/util';
@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss'],
  providers: [MessageService, FileReportService, CommonService, DatePipe]
})
export class FileSelectionComponent implements OnInit {
  @Output() getDataToRetrieve = new EventEmitter();
  projects: string[] = [];
  filteredProjects: any[];
  project: string;
  selectedValues: any;
  mediaValue: any;
  rec_date: any;
  areacode: any;
  Questionable: any;
  FraudActivity: any;
  scf: any;
  pmBoFax: any;
  bopmfaxno: any;
  zipcode: any;
  fileReport = new FileReport();
  contactInfo = new ContactInfoDto();
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  msgs: Message[] = [];
  msos: string[] = [];
  criteria: string[] = [];
  listOfStates = [];
  defaultMso = '0';
  utilObject: Util;
  currentDate: Date;
  recurringStartDateMandatory = false;
  statusValue: string;
  invalidStatus = false;
  invalidAuditReport = false;
  invalidFileDelivery = false;
  fileTransferChecked = false;
  matchBackAuditReportUnchecked = false;
  fileOuputReportUnchecked = false;
  dataForRetrieveingDataElement: any;
  private api: string;
  // tslint:disable-next-line:max-line-length
  constructor(
    private app: AppComponent, private datePipe: DatePipe, private elRef: ElementRef, private http: Http, private messageService: MessageService, private fileReportService: FileReportService, private commonService: CommonService) {
    this.api = environment.api;
    this.utilObject = new Util();
    this.getStateCityList();
    this.fileReport.matchBackAuditReport = false;
    this.fileReport.fileOuputReport = false;
  }
  ngOnInit() { }
  // setDefaultauditReport() {
  //   this.fileReport.auditReport = this.currentDate.setDate((new Date()).getDate() - 5);
  // }
  onkeyup(event) {
    this.utilObject.onFocus(event.target.value, this.elRef.nativeElement, event.keyCode);
  }
  updateMatchBackAuditReport = () => {
    setTimeout(() => {
      const self = this;
      if (this.fileReport.matchBackAuditReport === true) {
        this.matchBackAuditReportUnchecked = false;
      } else {
        this.matchBackAuditReportUnchecked = true;
      }
    }, 50);
  }
  updateFileOuputReport = () => {
    setTimeout(() => {
      const self = this;
      if (this.fileReport.fileOuputReport === true) {
        this.fileOuputReportUnchecked = false;
      } else {
        this.fileOuputReportUnchecked = true;
      }
    }, 50);
  }
  selectAuditReport = () => {
    const today = new Date();
    const defaultDate = today.setDate(today.getDate() + 1);
    setTimeout(() => {
      const self = this;
      if (Date.parse(self.fileReport.auditReport) >= defaultDate) {
        this.invalidAuditReport = false;
      } else {
        this.invalidAuditReport = true;
      }
    }, 50);
  }
  selectFileDelivery = () => {
    const today = new Date();
    const defaultDate = today.setDate(today.getDate() + 4);
    setTimeout(() => {
      const self = this;
      if (Date.parse(self.fileReport.fileDelivery) >= defaultDate) {
        this.invalidFileDelivery = false;
      } else {
        this.invalidFileDelivery = true;
      }
    }, 50)
  }
  checkFiletransfer = () => {
    setTimeout(() => {
      if (this.fileReport.media === '0') {
        this.fileTransferChecked = true;
      } else {
        this.fileTransferChecked = false;
      }
    }, 50);
  }
  selectStatus = (selectedStatus) => {
    if (selectedStatus === 'RECURR') {
      this.recurringStartDateMandatory = true;
    } else {
      this.recurringStartDateMandatory = false;
    }
    if (!_.isUndefined(this.statusValue)) {
      this.validateStatus(selectedStatus, this.statusValue);
    }
  }
  validateStatus = (selectedStatus, statusValue) => {
    switch (statusValue) {
      case 'CRITAPRV':
        // tslint:disable-next-line:max-line-length
        if ((selectedStatus === 'INPROG') || (selectedStatus === 'CRITAPRV') || (selectedStatus === 'RECURR') || (selectedStatus === 'CANCEL')) {
          this.invalidStatus = false;
        } else {
          this.invalidStatus = true;
        }
        break;
      case 'RECURR':
        if ((selectedStatus === 'RECURR') || (selectedStatus === 'CANCEL')) {
          this.invalidStatus = false;
        } else {
          this.invalidStatus = true;
        }
        break;
      case 'CANCEL':
        if ((selectedStatus === 'CANCEL')) {
          this.invalidStatus = false;
        } else {
          this.invalidStatus = true;
        }
        break;
      default:
        return;
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
  formateDate(date) {
    let formattedDate;
    const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/; // "MM/DD/YYYY" date format regex
    if (!(date_regex.test(date))) {
      date.setDate(date.getDate() + 1);
      formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    } else {
      formattedDate = date;
    }
    return formattedDate;
  }
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
  checkCriteriaLevel = () => {
    if (!this.projects.includes(this.fileReport.projectNum)) {
      this.fileReport.criteriaLevel = 'A';
    }
  }
  fetchProjects = (bin) => {
    const fetchProjectUrl = this.api + '/visa/prescreen/getProjectTypes';
    const fetchMsoUrl = this.api + '/visa/prescreen/getListOfMsos';
    const body = { 'bin': bin };
    this.commonService.fetchMso(fetchMsoUrl, body).subscribe(
      res => {
        this.msos = res;
        if (!_.isNull(this.msos) && this.msos.includes('0')) {
          this.fileReport.mso = this.defaultMso;
        }
      },
      err => { console.log(err); }
    );
    this.fileReportService.fetchProject(fetchProjectUrl, body).subscribe(
      res => {
        this.projects = res;
        if (this.projects.length === 0) {
          this.fileReport.criteriaLevel = 'A';
        }
      },
      err => { console.log(err); }
    );
  }
  filterProjects = (event) => {
    this.filteredProjects = [];
    for (let i = 0; i < this.projects.length; i++) {
      const project = this.projects[i];
      if (project.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredProjects.push(project);
      }
    }
  }
  fetchFileReports = (bin, projectNum, mso, criteriaLevel) => {
    let result;
    const url = this.api + '/visa/prescreen/getPrescreenFileReportTabData';
    const body = {
      'icaBin': bin,
      'projectNum': projectNum,
      'assocFlag': 'v',
      'mso': mso,
      'criteriaLevel': criteriaLevel,
    };
    this.fileReportService.fetchFileReport(url, body).subscribe(
      res => {
        result = res;
        this.statusValue = result.approvalStatus;
        this.appendToForm(result);
        this.dataForRetrieveingDataElement = {
          'icaBin': result.icaBin,
          'projectNum': result.projectNum,
          'assocFlag': result.assocFlag,
          'mso': result.mso,
          'criteriaLevel': result.criteriaLevel
        };
        this.getDataToRetrieve.emit(this.dataForRetrieveingDataElement);
      },
      err => { this.showError('Retrieve failed'); }
    );
  }
  appendToForm = (result) => {
    if (result !== undefined && result.length !== 0) {
      const fileData = result.prescreenContactInfoDto;
      if (!_.isNull(fileData)) {
        if (fileData !== undefined && fileData.length !== 0) {
          this.contactInfo.mbrName = fileData.mbrName;
          this.contactInfo.mbrContact = fileData.mbrContact;
          this.contactInfo.mbrAddr1 = fileData.mbrAddr1;
          this.contactInfo.mbrAddr2 = fileData.mbrAddr2;
          this.contactInfo.mbrCity = fileData.mbrCity;
          this.contactInfo.mbrState = fileData.mbrState;
          this.contactInfo.mbrZipCode = fileData.mbrZipCode;
          this.contactInfo.mbrphone = fileData.mbrphone;
          this.contactInfo.mbrFax = fileData.mbrFax;
          this.contactInfo.mbrEmail = fileData.mbrEmail;
        }
        this.fileReport.iprocName = result.iprocName;
        this.fileReport.iprocContactName = result.iprocContactName;
        this.fileReport.iprocAddr1 = result.iprocAddr1;
        this.fileReport.iprocAddr2 = result.iprocAddr2;
        this.fileReport.iprocCity = result.iprocCity;
        this.fileReport.iprocState = result.iprocState;
        this.fileReport.iprocZipCode = result.iprocZipCode;
        this.fileReport.iprocPhone = result.iprocPhone;
        this.fileReport.iprocFax = result.iprocFax;
        this.fileReport.iprocEmail = result.iprocEmail;
        this.fileReport.approvalStatus = result.approvalStatus;
        this.fileReport.recurringStartDate = result.recurringStartDate;
        this.fileReport.auditReport = result.auditReport;
        this.fileReport.matchBackAuditReport = (result.matchBackAuditReport === '1') ? true : false;
        this.fileReport.activityReport = (result.activityReport === '1') ? true : false;
        this.fileReport.fileOuputReport = (result.fileOuputReport === '1') ? true : false;
        this.fileReport.superFileFmt = result.superFileFmt;
        this.fileReport.media = result.media;
        this.fileReport.fileTransferIp = result.fileTransferIp;
        this.fileReport.maskSsn = result.maskSsn;
        this.fileReport.fileDelivery = result.fileDelivery;
        if (this.fileReport.matchBackAuditReport === true) {
          this.fileOuputReportUnchecked = false;
        } else {
          this.fileOuputReportUnchecked = true;
        }
        if (this.fileReport.fileOuputReport === true) {
          this.fileOuputReportUnchecked = false;
        } else {
          this.fileOuputReportUnchecked = true;
        }
      }
    }
  }
  // form submit
  onSubmit = (data) => {
    let prescreenContactInfoDto;
    const url = this.api + '/visa/prescreen/saveFileReportData';
    const assocFlag = 'v';
    const loadTs = '';
    const currentUser = localStorage.getItem('currentUser');
    const lastUpdtUser = localStorage.getItem('currentUser');
    const activityReport = (this.fileReport.activityReport === true) ? '1' : '0';
    const fileOuputReport = (this.fileReport.fileOuputReport === true) ? '1' : '0';
    const matchBackAuditReport = (this.fileReport.matchBackAuditReport === true) ? '1' : '0';
    const auditReport = this.formateDate(this.fileReport.auditReport);
    const fileDelivery = this.formateDate(this.fileReport.fileDelivery);
    // tslint:disable-next-line:max-line-length
    prescreenContactInfoDto = this.fileReportService.createContactInfoDto(this.contactInfo.mbrName, this.contactInfo.mbrContact, this.contactInfo.mbrAddr1, this.contactInfo.mbrAddr2, this.contactInfo.mbrCity, this.contactInfo.mbrState, this.contactInfo.mbrZipCode, this.contactInfo.mbrphone, this.contactInfo.mbrFax, this.contactInfo.mbrEmail);

    // tslint:disable-next-line:max-line-length
    const newFile = this.fileReportService.createFileReport(
      this.fileReport.icaBin, this.fileReport.mso, assocFlag, this.fileReport.projectNum, this.fileReport.criteriaLevel, prescreenContactInfoDto, this.fileReport.iprocName,
      this.fileReport.iprocContactName, this.fileReport.iprocAddr1, this.fileReport.iprocAddr2, this.fileReport.iprocCity,
      this.fileReport.iprocState, this.fileReport.iprocZipCode, this.fileReport.iprocPhone, this.fileReport.iprocFax,
      this.fileReport.iprocEmail, this.fileReport.approvalStatus, this.fileReport.recurringStartDate, auditReport,
      matchBackAuditReport, activityReport, fileOuputReport, this.fileReport.superFileFmt, this.fileReport.media,
      this.fileReport.fileTransferIp, this.fileReport.maskSsn, fileDelivery, loadTs, currentUser, lastUpdtUser
    );

    this.fileReportService.saveFileReport(url, JSON.stringify(newFile)).subscribe(
      res => {
        const result = res;
        let errorMsg = '';
        let keys = Object.keys(result.errors);
        if (keys.length) {
          for (let i = 0; i < keys.length; i++) {
            let value = result.errors[keys[i]];
            errorMsg = errorMsg + value + '\n';
          }
          this.app.hideloader();
          this.showError(errorMsg);
        } else {
          this.app.hideloader();
          this.dataForRetrieveingDataElement = {
            'icaBin': result.icaBin,
            'projectNum': result.projectNum,
            'assocFlag': result.assocFlag,
            'mso': result.mso,
            'criteriaLevel': result.criteriaLevel
          };
          this.getDataToRetrieve.emit(this.dataForRetrieveingDataElement);
          this.showSuccess('Save/Update Success!');
          this.clearFileSelectionForm(data);
        }
      },
      err => { this.showError('Save/Update failed'); }
    );
  }

  clearFileSelectionForm(fileSelectionForm) {
    const fieldsArray = [
      fileSelectionForm.controls.mbrContact, fileSelectionForm.controls.mbrContact, fileSelectionForm.controls.mbrAddr1,
      fileSelectionForm.controls.mbrAddr2, fileSelectionForm.controls.mbrCity, fileSelectionForm.controls.mbrState,
      fileSelectionForm.controls.mbrZipCode, fileSelectionForm.controls.mbrphone, fileSelectionForm.controls.mbrFax,
      fileSelectionForm.controls.mbrEmail, fileSelectionForm.controls.iprocName, fileSelectionForm.controls.iprocContactName,
      fileSelectionForm.controls.iprocAddr1, fileSelectionForm.controls.iprocAddr2, fileSelectionForm.controls.iprocCity,
      fileSelectionForm.controls.iprocState, fileSelectionForm.controls.iprocZipCode, fileSelectionForm.controls.iprocPhone,
      fileSelectionForm.controls.iprocFax, fileSelectionForm.controls.iprocEmail, fileSelectionForm.controls.approvalStatus,
      fileSelectionForm.controls.recurringStartDate, fileSelectionForm.controls.auditReport,
      fileSelectionForm.controls.matchBackAuditReport, fileSelectionForm.controls.activityReport,
      fileSelectionForm.controls.fileOuputReport, fileSelectionForm.controls.superFileFmt,
      fileSelectionForm.controls.media, fileSelectionForm.controls.fileTransferIp, fileSelectionForm.controls.maskSsn,
      fileSelectionForm.controls.fileDelivery,
    ];

    fieldsArray.forEach(function (field) {
      if (!_.isUndefined(field)) {
        field.reset();
      }
    });
  }
  // Messages section
  showSuccess = (msg) => {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: msg });
  }
  showError = (msg) => {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: msg });
  }
}
