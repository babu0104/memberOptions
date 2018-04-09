import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Hierarchy } from '../../interfaces/hierarchy';
import { ThresholdService } from '../../_services/threshold.service';
import * as _ from 'underscore';
import { PcsHierarchy } from '../../_models/pcshierarchy/pcshierarchy';
import { PcsHierarchyService } from '../../_services/pcshierarchy.service';
import { Message } from 'primeng/components/common/api';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ConfirmationService } from 'primeng/primeng';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
declare var jQuery: any;
@Component({
  selector: 'app-pcs-heirarchy',
  templateUrl: './pcs-heirarchy.component.html',
  styleUrls: ['./pcs-heirarchy.component.scss'],
  providers: [ConfirmationService]
})
export class PcsHeirarchyComponent implements OnInit {
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = "";
  buttonDisabled: boolean;
  hierarchyData = [];
  user = new User();
  hierarchy: Array<any>;
  filteredData = [];
  totalRecords: any;
  myVariable: any;
  cols: any[];
  index = 0;
  testarr = [];
  sortOrder = 'asc';
  sortItem = '';
  binIsBlank: boolean;
  pcshierarchy = new PcsHierarchy();
  msos: string[] = [];
  pcshierarchyNode = {};
  deleteHierarchyNode = {};
  defaultMso = "0";
  msgs: Message[] = [];
  scrollerDataLoaded = false;
  empArry: any[] = new Array();
  loading = false;
  display = false;
  displayErr = false;
  counter: number;
  pageHeight = 30;
  rankingLength: number;
  successmsg = false;
  showempty: boolean;
  private api: string;
  data: string;
  system = "PCS";
  orderCode = [];
  binErrMsg = "";
  binRelatedMsg = "";
  responseCodeErrMsg: string;
  butDisabled:boolean;
  recType:any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  constructor(private HierarchyData: ThresholdService,
    private http: Http,private _http: HttpClient, private pcshierarchyService: PcsHierarchyService,
    private App: AppComponent, private confirmationService: ConfirmationService) {
    this.api = environment.api;
    this.buttonDisabled = true;
  }
  ngOnInit() {
    this.counter = 0;
    this.pcshierarchy.pcsHierarchyRankingDto = [];
    if (this.pcshierarchy.pcsHierarchyRankingDto.length === 0) {
      this.emptyMsg();
    }
    this.getRecordTypes();
  }
  recTypeChange=()=>{
    this.recType=this.user.inputRecordType;
  }
  clickAll=(event)=>{
    if(event)
    { 
      this.butDisabled=true;
      this.recType="A";
    }
    else
    { 
      this.butDisabled=false;
      this.recType=this.user.inputRecordType;
    }  
  }
  getRecordTypes=()=> {
    this.pcshierarchyService.getSubmissionTypes().subscribe(res => {
      if (!_.isNull(res)) {
        const obj = res;
        this.user.PREPAID_ENROLLMENT = obj.PREPAID_ENROLLMENT;
        this.user.PREPAID_INQUIRY = obj.PREPAID_INQUIRY;
        this.user.LOAD_RELOAD = obj.LOAD_RELOAD;
        this.user.REFUND_REU = obj.REFUND_REU;
      }
    },
      err => {
        console.log(err);
      }
    );
  }
  getBin=()=> {
    this.user.icaBin = this.globalBin;
    this.fetchMso(this.user.icaBin);
    this.pcshierarchy.pcsHierarchyRankingDto = [];
    this.buttonDisabled = true;
  }
  emptyMsg=()=> {
    this.showempty = true;
  }
  fetchMso=(bin)=> {
    const body = { 'icaBin': bin };
    this.pcshierarchyService.getMsos(body).subscribe(res => {
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
  retrieveHierarchyRankings=(icaBin, mso, inputRecordType)=> {
    const _self = this;
    if (mso === undefined || mso === '') {
      mso = this.defaultMso;
    }
    this.pcshierarchy.pcsHierarchyRankingDto = [];
    const body = {
      'icaBin': icaBin, // "9908"
      'mso': mso,  // "TT"
      'inputRecordType': inputRecordType,
      'system': _self.system
  };
    this.pcshierarchyService.getHierarchyRankings(body).subscribe(res => {
      //const result = res;
      if (!_.isUndefined(res.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(res.errors.BinValidation)) {
        _self.binRelatedMsg = res.errors.BinRelatedToIcsOrPcs;
        _self.binErrMsg = res.errors.BinValidation;
        _self.App.hideloader();
        _self.displayErr = true;
      } else {
        this.loading = true;
        setTimeout(() => {
          this.updatedBin = res.icaBin;
          this.changeGlobalBin.emit(this.updatedBin);
          this.pcshierarchy.pcsHierarchyRankingDto = res.pcsHierarchyRankingDto;
          this.rankingLength = res.pcsHierarchyRankingDto.length;
          this.filteredData = res.pcsHierarchyRankingDto;
          this.getData(true);
          this.loading = false;
        }, 100);
        this.cols = [
          { field: 'hierarchyCode', header: 'List Order' },
          { field: 'vaisResponseCode', header: 'Code' },
          { field: 'description', header: 'Description' }
        ]
      }
    },
      err => {
      }
    );
    this.scrollerDataLoaded = true;
  }
  getData=(clickedstatus)=> {
    if (clickedstatus === true) {
      this.counter = 0;
      this.empArry = [];
    }
    if (this.rankingLength > 0) {
      const _self = this;
      _self.buttonDisabled = false;
      jQuery(document).ready(function () {
        jQuery('.ranking-table').mCustomScrollbar({
          callbacks: {
            onTotalScrollOffset: 300,
            onTotalScroll: function () {
              if (_self.pcshierarchy.pcsHierarchyRankingDto.length >= _self.counter) {
                _self.getData(false);
              }
            }
          }
        });
      });
      this.loading = true;
      for (let i = this.counter + 1; i <= this.rankingLength; i++) {
        this.empArry.push(this.filteredData[i - 1]);
        if (i % 10 === 0) {
          break;
        }
      }
      this.pcshierarchy.pcsHierarchyRankingDto = [];
      setTimeout(() => {
        this.pcshierarchy.pcsHierarchyRankingDto = this.empArry;
        this.loading = false;
      }, 100);
      this.counter += 10;
    }
  }
  arrayUnique=(array)=> {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].hierarchyCode === a[j].hierarchyCode) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }
  saveHierarchy=(data)=> {
    this.buildHierarchyData(data);
  }
  buildHierarchyData=(param: User)=> {
    const _self = this;
    _self.App.displayloader();
    const array1 = this.pcshierarchy.pcsHierarchyRankingDto;
    const array2 = this.filteredData;
    const hierarchyRanking = this.arrayUnique(array1.concat(array2));
    console.log(hierarchyRanking);
    hierarchyRanking.forEach((item, index) => _self.orderCode.push(index + 1));
    hierarchyRanking.forEach(function (item, i) {
      item.hierarchyCode = _self.orderCode[i].toString();
    });
    if (param.mso === undefined || param.mso === '' || param.mso === null) {
      param.mso = _self.defaultMso;
    }
    _self.orderCode = [];
    if(this.butDisabled)
    {
      param.inputRecordType=this.recType;
    }
    this.pcshierarchyNode = this.pcshierarchyService.createhierarchy(param, hierarchyRanking, _self.system);
    this.pcshierarchyService.buildHierarchy(JSON.stringify(this.pcshierarchyNode)).subscribe(      
     (data) => {
        const result = data;
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
        _self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
      const obj = data;
        _self.binErrMsg = result.errors.BinValidation;
        _self.App.hideloader();
        _self.displayErr = true;
      } else {
        _self.App.hideloader();
        const result = data;
        this.updatedBin = result.icaBin;
        this.changeGlobalBin.emit(this.updatedBin);
        this.showSuccess();
      }
      },
      err => {
        this.showError();
      }
    );
  }
  showSuccess=()=> {
    this.msgs = [];
    this.successmsg = true;
  }
  showError=()=> {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'User updation failed' });
    console.log('Error!');
  }
  moveUp=(value, index: number)=> {
    if (index > 0) {
      this.loading = true;
      const temp = this.pcshierarchy.pcsHierarchyRankingDto[index - 1];
      this.pcshierarchy.pcsHierarchyRankingDto[index - 1] = this.pcshierarchy.pcsHierarchyRankingDto[index];
      this.pcshierarchy.pcsHierarchyRankingDto[index] = temp;
      this.empArry = this.pcshierarchy.pcsHierarchyRankingDto;
      this.pcshierarchy.pcsHierarchyRankingDto = [];
      setTimeout(() => {
        this.pcshierarchy.pcsHierarchyRankingDto = this.empArry;
        console.log(this.pcshierarchy.pcsHierarchyRankingDto);
        this.loading = false;
      }, 100);
    }
  }
  moveDown=(value, index: number)=> {
    if (index < this.pcshierarchy.pcsHierarchyRankingDto.length) {
      this.loading = true;
      const temp = this.pcshierarchy.pcsHierarchyRankingDto[index + 1];
      this.pcshierarchy.pcsHierarchyRankingDto[index + 1] = this.pcshierarchy.pcsHierarchyRankingDto[index];
      this.pcshierarchy.pcsHierarchyRankingDto[index] = temp;
      this.empArry = this.pcshierarchy.pcsHierarchyRankingDto;
      this.pcshierarchy.pcsHierarchyRankingDto = [];
      setTimeout(() => {
        this.pcshierarchy.pcsHierarchyRankingDto = this.empArry;
        this.loading = false;
      }, 100);
    }
  }
  addcode=(code, description)=> {
    const self = this;
    let len, hcode, hierarchy_code;
    len = this.pcshierarchy.pcsHierarchyRankingDto.length;
    hcode = parseInt(this.pcshierarchy.pcsHierarchyRankingDto[len - 1].hierarchyCode, 10) + 1;
    hierarchy_code = hcode.toString();
    let body = {
      'vaisResponseCode': code,
      'description': description
    };
    this.pcshierarchyService.addNewCode(body).subscribe(
      data => {
        this.pcshierarchy.pcsHierarchyRankingDto.push({ hierarchyCode: hierarchy_code, vaisResponseCode: code, description: description });
        this.empArry = this.pcshierarchy.pcsHierarchyRankingDto;
        this.pcshierarchy.pcsHierarchyRankingDto = [];
        setTimeout(() => {
          this.pcshierarchy.pcsHierarchyRankingDto = this.empArry;
          this.loading = false;
        }, 100);
        self.responseCodeErrMsg = "";
        this.display = false;
      },
      err => {
        const result = err;
        if (!_.isUndefined(result.errors.ResponseCode)) {
          self.responseCodeErrMsg = result.errors.ResponseCode;
          self.showDialog();
        }
      }
    );
  }
  showDialog=()=> {
    this.display = true;
  }
  confirm2=(hierarchyCode, vaisResponseCode, description, param: User)=> {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.loading = true;
        // this.http.post(url, JSON.stringify(this.deleteHierarchyNode), options).subscribe(
        //   data => {
        // this.showSuccess();
        // this.retrieveHierarchyRankings(param.icaBin,param.mso);
        // this.pcshierarchy.pcsHierarchyRankingDto.splice(hierarchyCode, 1);
        // tslint:disable-next-line:max-line-length
        this.pcshierarchy.pcsHierarchyRankingDto = _.reject(this.pcshierarchy.pcsHierarchyRankingDto, function (el) { return el.hierarchyCode === hierarchyCode; });
        this.empArry = this.pcshierarchy.pcsHierarchyRankingDto;
        this.pcshierarchy.pcsHierarchyRankingDto = [];
        this.filteredData = [];
        setTimeout(() => {
          this.pcshierarchy.pcsHierarchyRankingDto = this.empArry;
          this.loading = false;
        }, 100);
        //   }
        // );
      },
      reject: () => {
      }
    });
  }
}
