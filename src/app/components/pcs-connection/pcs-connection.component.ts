import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PcsConnections, FileTransfer, OnlineInteractive, PcsConnectionPartnerOptDto } from '../../_models/connections/pcs-connections';
import { ConnectionService } from '../../_services/pcs-connection.service';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'underscore';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-pcs-connection',
  templateUrl: './pcs-connection.component.html',
  styleUrls: ['./pcs-connection.component.scss'],
  providers: [MessageService, ConnectionService]
})
export class PcsConnectionComponent implements OnInit {
  @Input() globalBin: string;
  @Output() changeGlobalBin = new EventEmitter();
  updatedBin = "";
  check = false;
  checked = false;
  ftNode1: FileTransfer;
  oiNode1: OnlineInteractive;
  finalPartners = [];
  partnersForIteration = ['P', 'D', 'S', 'O', 'N'];
  allPartnersData = [];
  totalPartners = 6;
  connections = new PcsConnections();
  msgs: Message[] = [];
  api: string;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  system = "PCS";
  binErrMsg = "";
  binRelatedMsg = "";
  display = false;
  constructor(private http: Http, private connectionService: ConnectionService, private App: AppComponent) {
    this.api = environment.api;
  }
  ftValueChange(scope) {
    if (scope === 1) {
      this.ftNode1.vconSeq = true;
    }
  }
  oiValueChange(scope) {
    if (scope === 1) {
      this.oiNode1.vconSeq = true;
      this.oiNode1.ppParamName = true;
    }
  }
  getBin() {
    this.connections.bin = this.globalBin;
  }
  oiSeqCheck() {
    if (this.oiNode1.vconSeq === true) {
      this.oiNode1.ppParamName = true;
    } else {
      this.oiNode1.ppParamName = false;
    }
  }
  ngOnInit() {
    this.ftNode1 = new FileTransfer();
    this.oiNode1 = new OnlineInteractive();
  }
  fetchConnections(bin) {
    this.ftNode1.clear();
    this.oiNode1.clear();
    let result;
    const _self = this;
    _self.App.displayloader();
    // const url = this.api + '/mo/pcs/retriveConnectionInfo';
    const body = {
      'bin': bin,
      'system': _self.system
    };
    this.connectionService.fetchConnections(body).subscribe(
      res => {
        result = res;
        const self = this;
        self.updatedBin = result.bin;
        this.changeGlobalBin.emit(self.updatedBin);
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          self.binErrMsg = result.errors.BinValidation;
          self.App.hideloader();
          self.display = true;
        } else {
          self.appendToForm(result);
          self.App.hideloader();
        }
      },
      err => {
        this.App.hideloader()
        this.showError('Connections Retrieve failed');
      });
  }
  appendToForm = (result) => {
    const fileData = result.pcsConnectionsFileTranserDto;
    if (fileData !== undefined && fileData.length !== 0) {
      this.ftNode1.vconSeq = (fileData.vconSeq === 1) ? true : false;
      this.ftNode1.confirmation = (fileData.confirmation === '1') ? true : false;
      this.ftNode1.messageCode = fileData.messageCode;
      this.ftNode1.messageText = fileData.messageText;
      this.ftNode1.connectDesc = fileData.connectDesc;
    }
    const onlineData = result.pcsConnectionsOnlineInteractiveDto;
    if (onlineData !== undefined && onlineData !== null && onlineData.length !== 0) {
      this.oiNode1.vconSeq = (onlineData.vconSeq === 1) ? true : false;
      this.oiNode1.netName = onlineData.netName;
      this.oiNode1.connectDesc = onlineData.connectDesc;
      if (onlineData.pcsConnectionPartnerOptDto !== undefined && onlineData.pcsConnectionPartnerOptDto.length !== 0) {
        // const partnerIdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
        const partnerPdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'P')); });
        const partnerDdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'D')); });
        const partnerSdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'S')); });
        const partnerOdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'O')); });
        const partnerNdata = onlineData.pcsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'N')); });
        // if (partnerIdata !== undefined && partnerIdata.length !== 0) {
        //   this.oiNode1.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
        //   this.oiNode1.piIdentityType = partnerIdata[0].identityType;
        //   this.oiNode1.piProduct = partnerIdata[0].product;
        // }
        if (partnerPdata !== undefined && partnerPdata.length !== 0) {
          this.oiNode1.ppParamName = (partnerPdata[0].paramName === 'P') ? true : false;
          this.oiNode1.ppIdentityType = partnerPdata[0].identityType;
          this.oiNode1.ppProduct = partnerPdata[0].product;
        }
        if (partnerDdata !== undefined && partnerDdata.length !== 0) {
          this.oiNode1.pdParamName = (partnerDdata[0].paramName === 'D') ? true : false;
          this.oiNode1.pdIdentityType = partnerDdata[0].identityType;
          this.oiNode1.pdProduct = partnerDdata[0].product;
        }
        if (partnerSdata !== undefined && partnerSdata.length !== 0) {
          this.oiNode1.psParamName = (partnerSdata[0].paramName === 'S') ? true : false;
          this.oiNode1.psIdentityType = partnerSdata[0].identityType;
          this.oiNode1.psProduct = partnerSdata[0].product;
        }
        if (partnerOdata !== undefined && partnerOdata.length !== 0) {
          this.oiNode1.poParamName = (partnerOdata[0].paramName === 'O') ? true : false;
          this.oiNode1.poIdentityType = partnerOdata[0].identityType;
          this.oiNode1.poProduct = partnerOdata[0].product;
        }
        if (partnerNdata !== undefined && partnerNdata.length !== 0) {
          this.oiNode1.pnParamName = (partnerNdata[0].paramName === 'N') ? true : false;
          this.oiNode1.pnIdentityType = partnerNdata[0].identityType;
          this.oiNode1.pnProduct = partnerNdata[0].product;
        }
      }
    }
  }
  saveOnlineInteractiveData = (currentFileNode) => {
    if (!_.isEmpty(currentFileNode)) {
      const totalPartners = 5;
      this.allPartnersData = [];
      for (let i = 0; i < totalPartners; i++) {
        const partner = this.partnersForIteration[i];
        switch (partner) {
          // case 'I':
          //   if (!_.isUndefined(currentFileNode.piParamName) && (currentFileNode.piParamName === true)) {
          //     const selectedPartner = 'I';
          //     // tslint:disable-next-line:max-line-length
          //     const pI = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.piIdentityType, currentFileNode.piProduct);
          //     this.allPartnersData.push(pI);
          //   }
          //   break;
          case 'P':
            if (!_.isUndefined(currentFileNode.ppParamName) && (currentFileNode.ppParamName === true)) {
              const selectedPartner = 'P';
              // tslint:disable-next-line:max-line-length
              const pP = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.ppIdentityType, currentFileNode.ppProduct);
              this.allPartnersData.push(pP);
            }
            break;
          case 'D':
            if (!_.isUndefined(currentFileNode.pdParamName) && (currentFileNode.pdParamName === true)) {
              const selectedPartner = 'D';
              // tslint:disable-next-line:max-line-length
              const pD = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.pdIdentityType, currentFileNode.pdProduct);
              this.allPartnersData.push(pD);
            }
            break;
          case 'S':
            if (!_.isUndefined(currentFileNode.psParamName) && (currentFileNode.psParamName === true)) {
              const selectedPartner = 'S';
              // tslint:disable-next-line:max-line-length
              const pS = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.psIdentityType, currentFileNode.psProduct);
              this.allPartnersData.push(pS);
            }
            break;
          case 'O':
            if (!_.isUndefined(currentFileNode.poParamName) && (currentFileNode.poParamName === true)) {
              const selectedPartner = 'O';
              // tslint:disable-next-line:max-line-length
              const pO = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.poIdentityType, currentFileNode.poProduct);
              this.allPartnersData.push(pO);
            }
            break;
          case 'N':
            if (!_.isUndefined(currentFileNode.pnParamName) && (currentFileNode.pnParamName === true)) {
              const selectedPartner = 'N';
              // tslint:disable-next-line:max-line-length
              const pN = this.connectionService.createPcsConnectionPartnerOptDto(selectedPartner, currentFileNode.pnIdentityType, currentFileNode.pnProduct);
              this.allPartnersData.push(pN);
            }
            break;
          default:
            return;
        }
      }
      return this.allPartnersData;
    }
  }
  // form submit
  onSubmit(data) {
    const _self = this;
    _self.App.displayloader();
    let pcsConnectionsFileTranserDto;
    let listIcsConnectionsOnlineInteractiveDto
    // const url = this.api + '/mo/pcs/saveOrUpdateConnectionInfo';
    const mso = 'MJ';
    const assocFlag = 'V';
    const vconSeq = (this.ftNode1.vconSeq === true) ? 1 : null;
    const confirmation = (this.ftNode1.confirmation === true) ? '1' : '0';
    if ((this.ftNode1.vconSeq === true)) {
      // tslint:disable-next-line:max-line-length
      pcsConnectionsFileTranserDto = this.connectionService.createFileTransfer(confirmation, this.ftNode1.messageCode, this.ftNode1.messageText, this.ftNode1.connectDesc, vconSeq);
    }
    const allPartnersOnlineInteractive = this.saveOnlineInteractiveData(this.oiNode1);
    const vconSeq1 = (this.oiNode1.vconSeq === true) ? 1 : null;
    if ((this.oiNode1.vconSeq === true)) {
      // tslint:disable-next-line:max-line-length
      listIcsConnectionsOnlineInteractiveDto = this.connectionService.createOnlineInteractive(this.oiNode1.netName, this.oiNode1.connectDesc, allPartnersOnlineInteractive, vconSeq1);
    }
    const loadTs = '2018-01-18';
    const currentUser = 'U001';
    const lastUpdtUser = 'U002';
    // tslint:disable-next-line:max-line-length
    const newConnections = this.connectionService.createConnection(this.connections.bin, mso, _self.system, assocFlag, pcsConnectionsFileTranserDto, listIcsConnectionsOnlineInteractiveDto, loadTs, currentUser, lastUpdtUser);
 
    this.connectionService.saveConnections(JSON.stringify(newConnections)).subscribe(
      data => {
        _self.App.hideloader();
        const result = data;
        if (!_.isUndefined(result.errors.BinRelatedToIcsOrPcs) || !_.isUndefined(result.errors.BinValidation)) {
          _self.binRelatedMsg = result.errors.BinRelatedToIcsOrPcs;
          _self.binErrMsg = result.errors.BinValidation;
          _self.App.hideloader();
          _self.display = true;
        } else {
          this.updatedBin = result.bin;
          this.changeGlobalBin.emit(this.updatedBin);
          this.showSuccess();
          this.ftNode1.clear();
          this.oiNode1.clear();
        }
      },
      err => {
        this.showError('User updation failed');
      }
    );
    _self.App.hideloader();
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
