import { Component, OnInit, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { AreaCode, FromAndToCodes } from '../../_models/prescreen/area-code'
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
  selector: 'app-areacode-selection',
  templateUrl: './areacode-selection.component.html',
  styleUrls: ['./areacode-selection.component.scss'],
  providers: [MessageService, CommonService, ConfirmationService]
})
export class AreacodeSelectionComponent implements OnInit {
  @Input() dataForRetrieveingDataElement: any;
  areaCode = new AreaCode();
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
  ngOnInit() { this.areaCode.areaCodeRange = []; }
  getData = () => {
    let result;
    const url = this.api + '/visa/prescreen/getAreaCodeTabData';
    const body = this.dataForRetrieveingDataElement;
    this.commonService.areaCode(url, body).subscribe(
      res => {
        result = res;
        this.appendToForm(result);
      },
      err => { console.log(err); }
    );
  }
  appendToForm = (result) => {
    if (result !== undefined && result.length !== 0) {
      this.areaCode.bin = result.icaBin;
      this.areaCode.mso = result.mso;
      this.areaCode.projectNum = result.projectNum;
      this.areaCode.criteriaLevel = result.criteriaLevel;
      this.areaCode.memberName = result.memberName;
      this.areaCode.areaCodeRange = result.areaCodeRange;
    }
  }
  onSubmit = (data) => {
    this.submitted = true;
    const newCode = [{
      'fromCode': data.fromCode,
      'toCode': data.toCode
    }];
    const url = this.api + '/visa/prescreen/saveAreaCode';
    const body = {
      'icaBin': this.areaCode.bin,
      'assocFlag': 'v',
      'mso': this.areaCode.mso,
      'criteriaLevel': this.areaCode.criteriaLevel,
      'projectNum': this.areaCode.projectNum,
      'areaCodeRange': newCode,
      'loadTs': '',
      'lastUpdtUser': localStorage.getItem('currentUser'),
      'currentUser': localStorage.getItem('currentUser')
    };

    this.commonService.areaCode(url, body).subscribe(
      res => {
        const result = res;
        this.areaCode.areaCodeRange.push({ fromCode: result.areaCodeRange[0].fromCode, toCode: result.areaCodeRange[0].toCode });
        this.empArry = this.areaCode.areaCodeRange;
        this.areaCode.areaCodeRange = [];
        setTimeout(() => {
          this.areaCode.areaCodeRange = this.empArry;
          this.loading = false;
        }, 100);
        this.showSuccess('Save/Update Success!');
      },
      err => {
        this.showError('Save/Update failed');
      }
    );
  }
  deleteAreaCode = (fromCode, toCode) => {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.loading = true;
        const url = this.api + '/visa/prescreen/deleteAreaCode';
        const body = {
          'icaBin': this.areaCode.bin,
          'assocFlag': 'v',
          'mso': this.areaCode.mso,
          'criteriaLevel': this.areaCode.criteriaLevel,
          'projectNum': this.areaCode.projectNum,
          'areaCodeRange': [
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
        this.areaCode.areaCodeRange = _.reject(this.areaCode.areaCodeRange, function (el) { return el.fromCode === fromCode; });
        this.empArry = this.areaCode.areaCodeRange;
        this.areaCode.areaCodeRange = [];
        this.filteredData = [];
        setTimeout(() => {
          this.areaCode.areaCodeRange = this.empArry;
          this.loading = false;
        }, 100);
      },
      reject: () => { }
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
