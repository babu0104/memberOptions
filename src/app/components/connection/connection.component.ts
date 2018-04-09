import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Connections } from '../../_models/connections/connections';
import { IcsConnBaseTwoDirectExchangeDto } from '../../_models/connections/direct-exchange';
import { ConnectionService } from '../../_services/connection.service';
import { DirectExchangeComponent } from './direct-exchange/direct-exchange.component';
import { FileTransferComponent } from './file-transfer/file-transfer.component';
import { OnlineInteractiveComponent } from './online-interactive/online-interactive.component';
import { ICSDirectComponent } from './ICSDirect/ICSDirect.component';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  providers: [MessageService, ConnectionService]
})
export class ConnectionComponent implements OnInit {
  [x: string]: any;
  @ViewChild(DirectExchangeComponent) directExchange: DirectExchangeComponent;
  @ViewChild(FileTransferComponent) fileTransfer: FileTransferComponent;
  @ViewChild(OnlineInteractiveComponent) onlineInteractive: OnlineInteractiveComponent;
  @ViewChild(ICSDirectComponent) icsDirect: ICSDirectComponent;
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = "";
  connections = new Connections();
  tempUser: any;
  msgs: Message[] = [];
  api: string;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  system = "ICS";
  errorMessage = '';
  constructor(private http: Http, private connectionService: ConnectionService, private App: AppComponent) {
    this.api = environment.api;
  }
  ngOnInit() {
  }
  getData() {
    this.connections.bin = this.globalBin;
  }
  fetchConnections(bin) {
    const _self = this;
    let result;
    _self.App.displayloader();
    // const url = this.api + '/mo/ics/retriveConnectionsInfo';
    const body = {
      'bin': bin,
      'system': _self.system
    };
    this.connectionService.fetchConnections(body).subscribe(
      res => {
      result = res;
      this.updatedBin = result.bin;
      this.changeGlobalBin.emit(this.updatedBin);
      const self = this;
      if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
        self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
        self.binErrMsg = result.errors.BinValidation;
        self.App.hideloader();
        self.display = true;
      } else {
        self.directExchange.appendToForm(result);
        self.fileTransfer.appendToForm(result);
        self.onlineInteractive.appendToForm(result);
        self.icsDirect.appendToForm(result);
        _self.App.hideloader();
      }
    },
      err => {
        console.log(err);
        err = err.errors;
        this.errorMessage = err.errorInfo;
        this.showError(this.errorMessage);
        _self.App.hideloader();
      });
  }
  // form submit
  onSubmit(data) {
    const _self = this;
    _self.App.displayloader();
    // const url = this.api + '/mo/ics/saveOrUpdateConnections';
    const newIcsConnBaseTwoDirectExchangeDto = this.directExchange.saveDirectExchange();
    const newListIcsConnectionsFileTransferDto = this.fileTransfer.saveFileTransfer();
    const newListIcsConnectionsOnlineInteractiveDto = this.onlineInteractive.saveOnlineInteractive();
    const newIcsConnectionsIcsDirectDto = this.icsDirect.saveICSDirect();
    const mso = 'MJ';
    const loadTs = '2018-01-18';
    const currentUser = 'U001';
    const lastUpdatedUserId = 'U002';
    const vaisInd = '1'
    // tslint:disable-next-line:max-line-length
    const newConnections = this.connectionService.createConnection(this.connections.bin, mso, _self.system, newIcsConnBaseTwoDirectExchangeDto, newListIcsConnectionsFileTransferDto, newListIcsConnectionsOnlineInteractiveDto, newIcsConnectionsIcsDirectDto, loadTs, currentUser, lastUpdatedUserId, vaisInd);
    
    this.connectionService.saveConnections(JSON.stringify(newConnections)).subscribe(
      data => {
        const result = data;
        this.updatedBin = result.bin;
        this.changeGlobalBin.emit(this.updatedBin);
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          _self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          _self.binErrMsg = result.errors.BinValidation;
          _self.App.hideloader();
          _self.display = true;
        } else {
          _self.App.hideloader();
          this.showSuccess();
          this.directExchange.icsConnBaseTwoDirectExchangeDto.clearModel();
          this.fileTransfer.ftNode1.clear();
          this.fileTransfer.ftNode2.clear();
          this.fileTransfer.ftNode3.clear();
          this.onlineInteractive.oiNode1.clear();
          this.onlineInteractive.oiNode2.clear();
          this.onlineInteractive.oiNode3.clear();
          this.onlineInteractive.oiNode4.clear();
          this.icsDirect.icsConnectionsIcsDirectDto.clearModel();
        }
      },
      err => {
        _self.App.hideloader();
        this.showError('User updation failed');
      }
    );
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
