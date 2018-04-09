import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, ControlContainer, NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// tslint:disable-next-line:max-line-length
import { ListIcsConnectionsOnlineInteractiveDto, IcsConnectionPartnerOptDto, Online1, Online2, Online3, Online4 } from '../../../_models/connections/online-interactive';
import { ConnectionService } from '../../../_services/connection.service';
import { Connection } from '@angular/http/src/interfaces';
import * as _ from 'underscore';
@Component({
  selector: 'app-online-interactive',
  templateUrl: './online-interactive.component.html',
  styleUrls: ['./online-interactive.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class OnlineInteractiveComponent implements OnInit {
  listIcsConnectionsOnlineInteractiveDto = new ListIcsConnectionsOnlineInteractiveDto();
  checked1 = false;
  checked2 = false;
  checked3 = false;
  checked4 = false;
  oiNode1: Online1;
  oiNode2: Online2;
  oiNode3: Online3;
  oiNode4: Online4;
  listNode = [];
  finalPartners = [];
  finalOiNode = [];
  partnersForIteration = ['I', 'A', 'B', 'C'];
  partnerI: IcsConnectionPartnerOptDto;
  partnerA: IcsConnectionPartnerOptDto;
  partnerB: IcsConnectionPartnerOptDto;
  partnerC: IcsConnectionPartnerOptDto;
  allPartnersData = [];
  totalOnlineInteractive = 4;
  totalPartners = 4;
  onlineIntNode1() {
    this.checked1 = !this.checked1;
    if (this.oiNode1.vconSeq === true) {
      this.oiNode1.processFlag = 'C';
    } else {
      this.oiNode1.processFlag = '';
    }
  }
  onlineIntNode2() {
    if (this.oiNode2.vconSeq === true) {
      this.oiNode2.processFlag = 'C';
    } else {
      this.oiNode2.processFlag = '';
    }
  }
  onlineIntNode3() {
    if (this.oiNode3.vconSeq === true) {
      this.oiNode3.processFlag = 'C';
    } else {
      this.oiNode3.processFlag = '';
    }
  }
  onlineIntNode4() {
    if (this.oiNode4.vconSeq === true) {
      this.oiNode4.processFlag = 'C';
    } else {
      this.oiNode4.processFlag = '';
    }
  }
  oiValueChange(scope) {
    if (scope === 1) {
      this.oiNode1.vconSeq = true;
    }
    if (scope === 2) {
      this.oiNode2.vconSeq = true;
    }
    if (scope === 3) {
      this.oiNode3.vconSeq = true;
    }
    if (scope === 4) {
      this.oiNode4.vconSeq = true;
    }
  }
  constructor(private connectionService: ConnectionService) { }
  ngOnInit() {
    this.oiNode1 = new Online1();
    this.oiNode2 = new Online2();
    this.oiNode3 = new Online3();
    this.oiNode4 = new Online4();
  }
  partners = (currentPartner) => {
    const totalPartners = 4;
    // this.allPartnersData = [];
    for (let i = 0; i < totalPartners; i++) {
      const partner = this.partnersForIteration[i]; // I- A - B - C
      switch (partner) {
        case 'I':
          if (currentPartner.piParamName === true) {
          }
          break;
        case 'A':
          if (currentPartner.paParamName === true) {
            currentPartner.paOption = (currentPartner.paOption) ? currentPartner.paOption : 'B';
            currentPartner.piParamName = true;
          } else {
            currentPartner.paOption = '';
            currentPartner.piParamName = (currentPartner.piParamName) ? currentPartner.piParamName : false;
          }
          break;
        case 'B':
          if (currentPartner.pbParamName === true) {
            currentPartner.pbIdentityType = (currentPartner.pbIdentityType) ? currentPartner.pbIdentityType : 'C';
          } else {
            currentPartner.pbIdentityType = '';
          }
          break;
        case 'C':
          if ((currentPartner.pcParamName === true)) {
            currentPartner.pcIdentityType = (currentPartner.pcIdentityType) ? currentPartner.pcIdentityType : 'C';
          } else {
            currentPartner.pcIdentityType = '';
          }
          break;
        default:
      }
    }
  }
  appendToForm(result) {
    this.oiNode1.clear();
    this.oiNode2.clear();
    this.oiNode3.clear();
    this.oiNode4.clear();
    const OnlineInteractiveData = result.listIcsConnectionsOnlineInteractiveDto;
    if (OnlineInteractiveData !== undefined && OnlineInteractiveData.length !== 0) {
      const online1Data = OnlineInteractiveData.filter(function (node) { return ((node.vconSeq === 1)); });
      const online2Data = OnlineInteractiveData.filter(function (node) { return ((node.vconSeq === 2)); });
      const online3Data = OnlineInteractiveData.filter(function (node) { return ((node.vconSeq === 3)); });
      const online4Data = OnlineInteractiveData.filter(function (node) { return ((node.vconSeq === 4)); });
      if (online1Data !== undefined && online1Data.length !== 0) {
        this.oiNode1.vconSeq = (online1Data[0].vconSeq === 1) ? true : false;
        this.oiNode1.netName = online1Data[0].netName;
        this.oiNode1.connectDesc = online1Data[0].connectDesc;
        this.oiNode1.vaisInd = online1Data[0].vaisInd;
        this.oiNode1.processFlag = online1Data[0].processFlag;
        if (online1Data[0].icsConnectionPartnerOptDto !== undefined && online1Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = online1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = online1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = online1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = online1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.oiNode1.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.oiNode1.piOption = partnerIdata[0].option;
            this.oiNode1.piIdentityType = partnerIdata[0].identityType;
            this.oiNode1.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.oiNode1.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.oiNode1.paOption = partnerAdata[0].option;
            this.oiNode1.paIdentityType = partnerAdata[0].identityType;
            this.oiNode1.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.oiNode1.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.oiNode1.pbOption = partnerBdata[0].option;
            this.oiNode1.pbIdentityType = partnerBdata[0].identityType;
            this.oiNode1.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.oiNode1.pcParamName = (partnerBdata[0].paramName === 'C') ? true : false;
            this.oiNode1.pcOption = partnerBdata[0].option;
            this.oiNode1.pcIdentityType = partnerBdata[0].identityType;
            this.oiNode1.pcCustomerNumber = partnerBdata[0].customerNumber;
          }
        }
      }
      if (online2Data !== undefined && online2Data.length !== 0) {
        this.oiNode2.vconSeq = (online2Data[0].vconSeq === 2) ? true : false;
        this.oiNode2.netName = online2Data[0].netName;
        this.oiNode2.connectDesc = online2Data[0].connectDesc;
        this.oiNode2.vaisInd = online2Data[0].vaisInd;
        this.oiNode2.processFlag = online2Data[0].processFlag;
        if (online2Data[0].icsConnectionPartnerOptDto !== undefined && online2Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = online2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = online2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = online2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = online2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.oiNode2.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.oiNode2.piOption = partnerIdata[0].option;
            this.oiNode2.piIdentityType = partnerIdata[0].identityType;
            this.oiNode2.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.oiNode2.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.oiNode2.paOption = partnerAdata[0].option;
            this.oiNode2.paIdentityType = partnerAdata[0].identityType;
            this.oiNode2.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.oiNode2.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.oiNode2.pbOption = partnerBdata[0].option;
            this.oiNode2.pbIdentityType = partnerBdata[0].identityType;
            this.oiNode2.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.oiNode2.pcParamName = (partnerBdata[0].paramName === 'C') ? true : false;
            this.oiNode2.pcOption = partnerBdata[0].option;
            this.oiNode2.pcIdentityType = partnerBdata[0].identityType;
            this.oiNode2.pcCustomerNumber = partnerBdata[0].customerNumber;
          }
        }
      }
      if (online3Data !== undefined && online3Data.length !== 0) {
        this.oiNode3.vconSeq = (online3Data[0].vconSeq === 3) ? true : false;
        this.oiNode3.netName = online3Data[0].netName;
        this.oiNode3.connectDesc = online3Data[0].connectDesc;
        this.oiNode3.vaisInd = online3Data[0].vaisInd;
        this.oiNode3.processFlag = online3Data[0].processFlag;
        if (online3Data[0].icsConnectionPartnerOptDto !== undefined && online3Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = online3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = online3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = online3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = online3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.oiNode3.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.oiNode3.piOption = partnerIdata[0].option;
            this.oiNode3.piIdentityType = partnerIdata[0].identityType;
            this.oiNode3.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.oiNode3.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.oiNode3.paOption = partnerAdata[0].option;
            this.oiNode3.paIdentityType = partnerAdata[0].identityType;
            this.oiNode3.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.oiNode3.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.oiNode3.pbOption = partnerBdata[0].option;
            this.oiNode3.pbIdentityType = partnerBdata[0].identityType;
            this.oiNode3.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.oiNode3.pcParamName = (partnerBdata[0].paramName === 'C') ? true : false;
            this.oiNode3.pcOption = partnerBdata[0].option;
            this.oiNode3.pcIdentityType = partnerBdata[0].identityType;
            this.oiNode3.pcCustomerNumber = partnerBdata[0].customerNumber;
          }
        }
      }
      if (online4Data !== undefined && online4Data.length !== 0) {
        this.oiNode4.vconSeq = (online4Data[0].vconSeq === 4) ? true : false;
        this.oiNode4.netName = online4Data[0].netName;
        this.oiNode4.connectDesc = online4Data[0].connectDesc;
        this.oiNode4.vaisInd = online4Data[0].vaisInd;
        this.oiNode4.processFlag = online4Data[0].processFlag;
        if (online4Data[0].icsConnectionPartnerOptDto !== undefined && online4Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = online4Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = online4Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = online4Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = online4Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.oiNode4.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.oiNode4.piOption = partnerIdata[0].option;
            this.oiNode4.piIdentityType = partnerIdata[0].identityType;
            this.oiNode4.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.oiNode4.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.oiNode4.paOption = partnerAdata[0].option;
            this.oiNode4.paIdentityType = partnerAdata[0].identityType;
            this.oiNode4.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.oiNode4.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.oiNode4.pbOption = partnerBdata[0].option;
            this.oiNode4.pbIdentityType = partnerBdata[0].identityType;
            this.oiNode4.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.oiNode4.pcParamName = (partnerBdata[0].paramName === 'C') ? true : false;
            this.oiNode4.pcOption = partnerBdata[0].option;
            this.oiNode4.pcIdentityType = partnerBdata[0].identityType;
            this.oiNode4.pcCustomerNumber = partnerBdata[0].customerNumber;
          }
        }
      }
    }
  }
  saveOnlineInteractive = () => {
    this.listNode = [];
    this.finalOiNode = [];
    this.listNode.push(this.oiNode1, this.oiNode2, this.oiNode3, this.oiNode4);
    for (let i = 0; i < this.listNode.length; i++) {
      const allPartnersOnlineInteractive = this.saveOnlineInteractiveData(this.listNode[i]);
      const vconSeq = (this.listNode[i].vconSeq === true) ? i + 1 : null;
      const vaisInd = (this.listNode[i].vaisInd === true) ? '1' : '0';
      if ((this.listNode[i].vconSeq === true)) {
        // tslint:disable-next-line:max-line-length
        const oi = this.connectionService.createListIcsConnectionsOnlineInteractiveDto(this.listNode[i].netName, this.listNode[i].connectDesc, vaisInd, this.listNode[i].processFlag, allPartnersOnlineInteractive, vconSeq);
        this.finalOiNode.push(oi);
      }
    }
    return this.finalOiNode;
  }
  saveOnlineInteractiveData = (currentFileNode) => {
    if (!_.isEmpty(currentFileNode)) {
      const totalPartners = 4;
      this.allPartnersData = [];
      for (let i = 0; i < totalPartners; i++) {
        const partner = this.partnersForIteration[i]; // I- A - B - C
        switch (partner) {
          case 'I':
            if (!_.isUndefined(currentFileNode.piParamName) && (currentFileNode.piParamName === true)) {
              const selectedPartner = 'I';
              // tslint:disable-next-line:max-line-length
              const pI = this.connectionService.createIcsIcsConnectionPartnerOptDto(selectedPartner, currentFileNode.piOption, currentFileNode.piIdentityType, currentFileNode.piCustomerNumber);
              this.allPartnersData.push(pI);
            }
            break;
          case 'A':
            if (!_.isUndefined(currentFileNode.paParamName) && (currentFileNode.paParamName === true)) {
              const selectedPartner = 'A';
              // tslint:disable-next-line:max-line-length
              const pA = this.connectionService.createIcsIcsConnectionPartnerOptDto(selectedPartner, currentFileNode.paOption, currentFileNode.paIdentityType, currentFileNode.paCustomerNumber);
              this.allPartnersData.push(pA);
            }
            break;
          case 'B':
            if (!_.isUndefined(currentFileNode.pbParamName) && (currentFileNode.pbParamName === true)) {
              const selectedPartner = 'B';
              // tslint:disable-next-line:max-line-length
              const pB = this.connectionService.createIcsIcsConnectionPartnerOptDto(selectedPartner, currentFileNode.pbOption, currentFileNode.pbIdentityType, currentFileNode.pbCustomerNumber);
              this.allPartnersData.push(pB);
            }
            break;
          case 'C':
            if (!_.isUndefined(currentFileNode.pcParamName) && (currentFileNode.pcParamName === true)) {
              const selectedPartner = 'C';
              // tslint:disable-next-line:max-line-length
              const pC = this.connectionService.createIcsIcsConnectionPartnerOptDto(selectedPartner, currentFileNode.pcOption, currentFileNode.pcIdentityType, currentFileNode.pcCustomerNumber);
              this.allPartnersData.push(pC);
            }
            break;
          default:
            return;
        }
      }
      // this.finalFtNode [pI,pA, pB, pC]
      return this.allPartnersData;
    }
  }
}
