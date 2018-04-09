import { Component, OnInit, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { SfcSection, FromAndToCodes } from '../../_models/prescreen/scf-section'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
import { CommonService } from '../../_services/common.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-scf-selection',
  templateUrl: './scf-selection.component.html',
  styleUrls: ['./scf-selection.component.scss'],
  providers: [MessageService, CommonService, ConfirmationService]
})
export class ScfSelectionComponent implements OnInit {
  @Input() dataForRetrieveingDataElement: any;
  sfcSection = new SfcSection();
  fromAndToCodes = new FromAndToCodes();
  loading = false;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  msgs: Message[] = [];
  filteredData = [];
  empArry: any[] = new Array();
  private api: string;
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private messageService: MessageService, private commonService: CommonService, private confirmationService: ConfirmationService) {
    this.api = environment.api;
  }

  ngOnInit() { this.sfcSection.scfRange = []; }
  getData = () => {
    let result;
    const url = this.api + '/visa/prescreen/getScfSelectionTabData';
    const body = this.dataForRetrieveingDataElement;
    this.commonService.sfcSection(url, body).subscribe(
      res => {
        result = res;
        this.appendToForm(result);
      },
      err => { console.log(err); }
    );
  }
  appendToForm = (result) => {
    if (result !== undefined && result.length !== 0) {
      this.sfcSection.bin = result.icaBin;
      this.sfcSection.mso = result.mso;
      this.sfcSection.projectNum = result.projectNum;
      this.sfcSection.criteriaLevel = result.criteriaLevel;
      this.sfcSection.memberName = result.memberName;
      this.sfcSection.scfRange = result.scfRange;
    }
  }
  onSubmit(data) {
    this.submitted = true;
    const newCode = [{
      'fromCode': data.fromCode,
      'toCode': data.toCode
    }];
    const body = {
      'icaBin': this.sfcSection.bin,
      'assocFlag': 'v',
      'mso': this.sfcSection.mso,
      'criteriaLevel': this.sfcSection.criteriaLevel,
      'projectNum': this.sfcSection.projectNum,
      'scfRange': newCode,
      'loadTs': '',
      'lastUpdtUser': localStorage.getItem('currentUser'),
      'currentUser': localStorage.getItem('currentUser')
    };
    const url = this.api + '/visa/prescreen/saveScfSelection';
    this.commonService.areaCode(url, body).subscribe(
      res => {
        const result = res;
        this.sfcSection.scfRange.push({ fromCode: result.scfRange[0].fromCode, toCode: result.scfRange[0].toCode });
        this.empArry = this.sfcSection.scfRange;
        this.sfcSection.scfRange = [];
        setTimeout(() => {
          this.sfcSection.scfRange = this.empArry;
          this.loading = false;
        }, 100);
        this.showSuccess('Save/Update Success!');
      },
      err => {
        this.showError('Save/Update failed');
      }
    );
  }
  deleteSfcSection = (fromCode, toCode) => {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.loading = true;
        const url = this.api + '/visa/prescreen/deleteScfSelection';
        const body = {
          'icaBin': this.sfcSection.bin,
          'assocFlag': 'v',
          'mso': this.sfcSection.mso,
          'criteriaLevel': this.sfcSection.criteriaLevel,
          'projectNum': this.sfcSection.projectNum,
          'scfRange': [
            {
              'fromCode': fromCode,
              'toCode': toCode
            }
          ]
        };
        this.commonService.areaCode(url, body).subscribe(
          res => { console.log(res); },
          err => { console.log(err); }
        );
        this.sfcSection.scfRange = _.reject(this.sfcSection.scfRange, function (el) { return el.fromCode === fromCode; });
        this.empArry = this.sfcSection.scfRange;
        this.sfcSection.scfRange = [];
        this.filteredData = [];
        setTimeout(() => {
          this.sfcSection.scfRange = this.empArry;
          this.loading = false;
        }, 100);
      },
      reject: () => { }
    });
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
