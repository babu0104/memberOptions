import { Component, OnInit, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { DataElements } from '../../_models/prescreen/data-elements';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { FileReportService } from '../../_services/file-report.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../_services/common.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-data-elements',
  templateUrl: './data-elements.component.html',
  styleUrls: ['./data-elements.component.scss'],
  providers: [MessageService, CommonService, FileReportService]
})
export class DataElementsComponent implements OnInit {
  @Input() dataForRetrieveingDataElement: any;
  selectedValues: any;
  mediaValue: any;
  rec_date: any;
  areacode: any;
  Questionable: any;
  FraudActivity: any;
  app: any;
  scf: any;
  dataElements = new DataElements();
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  msgs: Message[] = [];
  private api: string;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private messageService: MessageService,
    private dataElementService: FileReportService
  ) {
    this.api = environment.api;
  }
  ngOnInit() {
  }
  getData = () => {
    let result;
    const url = this.api + '/visa/prescreen/getDataElementTabData';
    const body = this.dataForRetrieveingDataElement;
    this.commonService.fetDataElement(url, body).subscribe(
      res => {
        result = res;
        this.appendToForm(result);
      },
      err => { console.log(err); }
    );
  }
  appendToForm = (result) => {
    if (result !== undefined && result.length !== 0) {
      this.dataElements.bin = result.icaBin;
      this.dataElements.mso = result.mso;
      this.dataElements.projectNum = result.projectNum;
      this.dataElements.criteriaLevel = result.criteriaLevel;
      this.dataElements.name = result.name;
      this.dataElements.memberName = result.memberName;
      this.dataElements.ssnOn = (result.ssnOn === '1') ? true : false;
      this.dataElements.addrOn = (result.addrOn === '1') ? true : false;
      this.dataElements.phoneOn = (result.phoneOn === '1') ? true : false;
      this.dataElements.bnkrpcyOn = (result.bnkrpcyOn === '1') ? true : false;
      this.dataElements.bnkrpcyMonths = result.bnkrpcyMonths;
      this.dataElements.bnkrpcyDisputeOn = (result.bnkrpcyDisputeOn === '1') ? true : false;
      this.dataElements.applnDisputeOn = (result.applnDisputeOn === '1') ? true : false;
      this.dataElements.uuDisputeOn = (result.uuDisputeOn === '1') ? true : false;
      this.dataElements.applnActivityon = (result.applnActivityon === '1') ? true : false;
      this.dataElements.ssnApplnCount = result.ssnApplnCount;
      this.dataElements.ssnApplnTimeparam = result.ssnApplnTimeparam;
      this.dataElements.addrApplnCount = result.addrApplnCount;
      this.dataElements.addrApplnTimeparam = result.addrApplnTimeparam;
      this.dataElements.phoneApplnCount = result.phoneApplnCount;
      this.dataElements.phoneApplnTimeparam = result.phoneApplnTimeparam;
      this.dataElements.uuActivityOn = (result.uuActivityOn === '1') ? true : false;
      this.dataElements.ssnUU00Count = result.ssnUU00Count;
      this.dataElements.ssnUU00Timeparam = result.ssnUU00Timeparam;
      this.dataElements.ssnUU01Count = result.ssnUU01Count;
      this.dataElements.ssnUU01Timeparam = result.ssnUU01Timeparam;
      this.dataElements.ssnUU02Count = result.ssnUU02Count;
      this.dataElements.ssnUU02Timeparam = result.ssnUU02Timeparam;
      this.dataElements.ssnUU03Count = result.ssnUU03Count;
      this.dataElements.ssnUU03Timeparam = result.ssnUU03Timeparam;
      this.dataElements.ssnUU04Count = result.ssnUU04Count;
      this.dataElements.ssnUU04Timeparam = result.ssnUU04Timeparam;
      this.dataElements.ssnUU05Count = result.ssnUU05Count;
      this.dataElements.ssnUU05Timeparam = result.ssnUU05Timeparam;
      this.dataElements.ssnUU06Count = result.ssnUU06Count;
      this.dataElements.ssnUU06Timeparam = result.ssnUU06Timeparam;
      this.dataElements.ssnUU07Count = result.ssnUU07Count;
      this.dataElements.ssnUU07Timeparam = result.ssnUU07Timeparam;
      this.dataElements.ssnUU08Count = result.ssnUU08Count;
      this.dataElements.ssnUU08Timeparam = result.ssnUU08Timeparam;
      this.dataElements.ssnUU09Count = result.ssnUU09Count;
      this.dataElements.ssnUU09Timeparam = result.ssnUU09Timeparam;
      this.dataElements.phoneUU00Count = result.phoneUU00Count;
      this.dataElements.phoneUU00Timeparam = result.phoneUU00Timeparam;
      this.dataElements.phoneUU01Count = result.phoneUU01Count;
      this.dataElements.phoneUU01Timeparam = result.phoneUU01Timeparam;
      this.dataElements.phoneUU02Count = result.phoneUU02Count;
      this.dataElements.phoneUU02Timeparam = result.phoneUU02Timeparam;
      this.dataElements.phoneUU03Count = result.phoneUU03Count;
      this.dataElements.phoneUU03Timeparam = result.phoneUU03Timeparam;
      this.dataElements.phoneUU04Count = result.phoneUU04Count;
      this.dataElements.phoneUU04Timeparam = result.phoneUU04Timeparam;
      this.dataElements.phoneUU05Count = result.phoneUU05Count;
      this.dataElements.phoneUU05Timeparam = result.phoneUU05Timeparam;
      this.dataElements.phoneUU06Count = result.phoneUU06Count;
      this.dataElements.phoneUU06Timeparam = result.phoneUU06Timeparam;
      this.dataElements.phoneUU07Count = result.phoneUU07Count;
      this.dataElements.phoneUU07Timeparam = result.phoneUU07Timeparam;
      this.dataElements.phoneUU08Count = result.phoneUU08Count;
      this.dataElements.phoneUU08Timeparam = result.phoneUU08Timeparam;
      this.dataElements.phoneUU09Count = result.phoneUU09Count;
      this.dataElements.phoneUU09Timeparam = result.phoneUU09Timeparam;
      this.dataElements.addrUU00Count = result.addrUU00Count;
      this.dataElements.addrUU00Timeparam = result.addrUU00Timeparam;
      this.dataElements.addrUU01Count = result.addrUU01Count;
      this.dataElements.addrUU01Timeparam = result.addrUU01Timeparam;
      this.dataElements.addrUU02Count = result.addrUU02Count;
      this.dataElements.addrUU02Timeparam = result.addrUU02Timeparam;
      this.dataElements.addrUU03Count = result.addrUU03Count;
      this.dataElements.addrUU03Timeparam = result.addrUU03Timeparam;
      this.dataElements.addrUU04Count = result.addrUU04Count;
      this.dataElements.addrUU04Timeparam = result.addrUU04Timeparam;
      this.dataElements.addrUU05Count = result.addrUU05Count;
      this.dataElements.addrUU05Timeparam = result.addrUU05Timeparam;
      this.dataElements.addrUU06Count = result.addrUU06Count;
      this.dataElements.addrUU06Timeparam = result.addrUU06Timeparam;
      this.dataElements.addrUU07Count = result.addrUU07Count;
      this.dataElements.addrUU07Timeparam = result.addrUU07Timeparam;
      this.dataElements.addrUU08Count = result.addrUU08Count;
      this.dataElements.addrUU08Timeparam = result.addrUU08Timeparam;
      this.dataElements.addrUU09Count = result.addrUU09Count;
      this.dataElements.addrUU09Timeparam = result.addrUU09Timeparam;
      this.dataElements.alertWithVelocityOn = (result.alertWithVelocityOn === '1') ? true : false;
      this.dataElements.alertSsn01On = (result.alertSsn01On === '1') ? true : false;
      this.dataElements.alertSsn02On = (result.alertSsn02On === '1') ? true : false;
      this.dataElements.alertSsn03On = (result.alertSsn03On === '1') ? true : false;
      this.dataElements.alertSsn04On = (result.alertSsn04On === '1') ? true : false;
      this.dataElements.alertPhone01On = (result.alertPhone01On === '1') ? true : false;
      this.dataElements.alertPhone02On = (result.alertPhone02On === '1') ? true : false;
      this.dataElements.alertPhone03On = (result.alertPhone03On === '1') ? true : false;
      this.dataElements.alertPhone04On = (result.alertPhone04On === '1') ? true : false;
      this.dataElements.alertPhone05On = (result.alertPhone05On === '1') ? true : false;
      this.dataElements.alertPhone06On = (result.alertPhone06On === '1') ? true : false;
      this.dataElements.alertPhone07On = (result.alertPhone07On === '1') ? true : false;
      this.dataElements.alertPhone08On = (result.alertPhone08On === '1') ? true : false;
      this.dataElements.alertPhone09On = (result.alertPhone09On === '1') ? true : false;
      this.dataElements.alertPhone10On = (result.alertPhone10On === '1') ? true : false;
      this.dataElements.alertPhone11On = (result.alertPhone11On === '1') ? true : false;
      this.dataElements.alertPhone12On = (result.alertPhone12On === '1') ? true : false;
      this.dataElements.alertPhone13On = (result.alertPhone13On === '1') ? true : false;
      this.dataElements.alertAddr01On = (result.alertAddr01On === '1') ? true : false;
      this.dataElements.alertAddr02On = (result.alertAddr02On === '1') ? true : false;
      this.dataElements.alertAddr03On = (result.alertAddr03On === '1') ? true : false;
      this.dataElements.alertAddr04On = (result.alertAddr04On === '1') ? true : false;
      this.dataElements.alertAddr05On = (result.alertAddr05On === '1') ? true : false;
      this.dataElements.alertAddr06On = (result.alertAddr06On === '1') ? true : false;
      this.dataElements.alertAddr07On = (result.alertAddr07On === '1') ? true : false;
      this.dataElements.alertAddr08On = (result.alertAddr08On === '1') ? true : false;
      this.dataElements.alertAddr09On = (result.alertAddr09On === '1') ? true : false;
      this.dataElements.alertAddr10On = (result.alertAddr10On === '1') ? true : false;
      this.dataElements.alertAddr11On = (result.alertAddr11On === '1') ? true : false;
      this.dataElements.alertAddr12On = (result.alertAddr12On === '1') ? true : false;
      this.dataElements.scfRangeOption = result.scfRangeOption;
      this.dataElements.areaCodeOption = result.areaCodeOption;
    }
  }

  onSubmit(data) {
    this.submitted = true;
    const url = this.api + '/visa/prescreen/saveDataElementsData';
    data['icaBin'] = this.dataElements.bin;
    data['mso'] = this.dataElements.mso;
    data['assocFlag'] = 'V';
    data['projectNum'] = this.dataElements.projectNum;
    data['criteriaLevel'] = this.dataElements.criteriaLevel;
    data['name'] = this.dataElements.name;
    data['ssnOn'] = (this.dataElements.ssnOn === true) ? '1' : '0';
    data['addrOn'] = (this.dataElements.addrOn === true) ? '1' : '0';
    data['phoneOn'] = (this.dataElements.phoneOn === true) ? '1' : '0';
    data['bnkrpcyOn'] = (this.dataElements.bnkrpcyOn === true) ? '1' : '0';
    data['bnkrpcyDisputeOn'] = (this.dataElements.bnkrpcyDisputeOn === true) ? '1' : '0';
    data['applnDisputeOn'] = (this.dataElements.applnDisputeOn === true) ? '1' : '0';
    data['uuDisputeOn'] = (this.dataElements.uuDisputeOn === true) ? '1' : '0';

    data['applnActivityon'] = (this.dataElements.applnActivityon === true) ? '1' : '0';

    data['uuActivityOn'] = (this.dataElements.uuActivityOn === true) ? '1' : '0';
    data['alertWithVelocityOn'] = (this.dataElements.alertWithVelocityOn === true) ? '1' : '0';

    data['alertSsn01On'] = (this.dataElements.alertSsn01On === true) ? '1' : '0';
    data['alertSsn02On'] = (this.dataElements.alertSsn02On === true) ? '1' : '0';
    data['alertSsn03On'] = (this.dataElements.alertSsn03On === true) ? '1' : '0';
    data['alertSsn04On'] = (this.dataElements.alertSsn04On === true) ? '1' : '0';
    data['alertPhone01On'] = (this.dataElements.alertPhone01On === true) ? '1' : '0';
    data['alertPhone02On'] = (this.dataElements.alertPhone02On === true) ? '1' : '0';
    data['alertPhone03On'] = (this.dataElements.alertPhone03On === true) ? '1' : '0';
    data['alertPhone04On'] = (this.dataElements.alertPhone04On === true) ? '1' : '0';
    data['alertPhone05On'] = (this.dataElements.alertPhone05On === true) ? '1' : '0';
    data['alertPhone06On'] = (this.dataElements.alertPhone06On === true) ? '1' : '0';
    data['alertPhone07On'] = (this.dataElements.alertPhone07On === true) ? '1' : '0';
    data['alertPhone08On'] = (this.dataElements.alertPhone08On === true) ? '1' : '0';
    data['alertPhone09On'] = (this.dataElements.alertPhone09On === true) ? '1' : '0';
    data['alertPhone10On'] = (this.dataElements.alertPhone10On === true) ? '1' : '0';
    data['alertPhone11On'] = (this.dataElements.alertPhone11On === true) ? '1' : '0';
    data['alertPhone12On'] = (this.dataElements.alertPhone12On === true) ? '1' : '0';
    data['alertPhone13On'] = (this.dataElements.alertPhone13On === true) ? '1' : '0';
    data['alertAddr01On'] = (this.dataElements.alertAddr01On === true) ? '1' : '0';
    data['alertAddr02On'] = (this.dataElements.alertAddr02On === true) ? '1' : '0';
    data['alertAddr03On'] = (this.dataElements.alertAddr03On === true) ? '1' : '0';
    data['alertAddr04On'] = (this.dataElements.alertAddr04On === true) ? '1' : '0';
    data['alertAddr05On'] = (this.dataElements.alertAddr05On === true) ? '1' : '0';
    data['alertAddr06On'] = (this.dataElements.alertAddr06On === true) ? '1' : '0';
    data['alertAddr07On'] = (this.dataElements.alertAddr07On === true) ? '1' : '0';
    data['alertAddr08On'] = (this.dataElements.alertAddr08On === true) ? '1' : '0';
    data['alertAddr09On'] = (this.dataElements.alertAddr09On === true) ? '1' : '0';
    data['alertAddr10On'] = (this.dataElements.alertAddr10On === true) ? '1' : '0';
    data['alertAddr11On'] = (this.dataElements.alertAddr11On === true) ? '1' : '0';
    data['alertAddr12On'] = (this.dataElements.alertAddr12On === true) ? '1' : '0';
    data['loadTs'] = '';
    data['currentUser'] = localStorage.getItem('currentUser');
    data['lastUpdtUser'] = localStorage.getItem('currentUser');

    //const validForm = this.validateDataElementsForm(data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.dataElementService.saveDataElement(url, JSON.stringify(data)).subscribe(
      res => {
        const result = res;
        let errorMsg = '';
        const keys = Object.keys(result.errors);
        if (keys.length) {
          for (let i = 0; i < keys.length; i++) {
            let value = result.errors[keys[i]];
            errorMsg = errorMsg + value + '<br>';
          }
          this.showError(errorMsg);
        } else {
          this.showSuccess('Save/Update Success!');
        }
      },
      err => { this.showError('Save/Update failed'); }
    );
  }

  validateDataElementsForm = (data) => {
    let validForm = false;
    debugger;
    return validForm;
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
