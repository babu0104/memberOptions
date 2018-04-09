import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ListIcsConnectionsFileTransferDto, FileTransfer1, FileTransfer2, FileTransfer3 } from '../../../_models/connections/file-transfer';
import { ConnectionService } from '../../../_services/connection.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.scss']
})
export class FileTransferComponent implements OnInit {
  listIcsConnectionsFileTransferDto = new ListIcsConnectionsFileTransferDto();
  checkedf1 = false;
  checkedf2 = false;
  checkedf3 = false;
  ftNode1: FileTransfer1;
  ftNode2: FileTransfer2;
  ftNode3: FileTransfer3;
  listNode = [];
  finalFtNode = [];
  partnersForIteration = ['I', 'A', 'B', 'C'];
  // partnerI: IcsConnectionPartnerOptDto;
  // partnerA: IcsConnectionPartnerOptDto;
  // partnerB: IcsConnectionPartnerOptDto;
  // partnerC: IcsConnectionPartnerOptDto;
  allPartnersData = [];
  totalFileTransfer = 3;
  fileNode1() {
    if (this.ftNode1.vconSeq === true) {
      this.ftNode1.recLayoutIn = 'O';
      this.ftNode1.recLayoutOut = 'O';
      this.ftNode1.recFormatOut = 'U';
      this.ftNode1.nullsFlag = 'B';
      this.ftNode1.processFlag = 'C';
    } else {
      this.ftNode1.recLayoutIn = '';
      this.ftNode1.recLayoutOut = '';
      this.ftNode1.recFormatOut = '';
      this.ftNode1.nullsFlag = '';
      this.ftNode1.processFlag = '';
    }
  }
  fileNode2() {
    if (this.ftNode2.vconSeq === true) {
      this.ftNode2.recLayoutIn = 'O';
      this.ftNode2.recLayoutOut = 'O';
      this.ftNode2.recFormatOut = 'U';
      this.ftNode2.nullsFlag = 'B';
      this.ftNode2.processFlag = 'C';
    } else {
      this.ftNode2.recLayoutIn = '';
      this.ftNode2.recLayoutOut = '';
      this.ftNode2.recFormatOut = '';
      this.ftNode2.nullsFlag = '';
      this.ftNode2.processFlag = '';
    }
  }
  fileNode3() {
    if (this.ftNode3.vconSeq === true) {
      this.ftNode3.recLayoutIn = 'O';
      this.ftNode3.recLayoutOut = 'O';
      this.ftNode3.recFormatOut = 'U';
      this.ftNode3.nullsFlag = 'B';
      this.ftNode3.processFlag = 'C';
    } else {
      this.ftNode3.recLayoutIn = '';
      this.ftNode3.recLayoutOut = '';
      this.ftNode3.recFormatOut = '';
      this.ftNode3.nullsFlag = '';
      this.ftNode3.processFlag = '';
    }
  }
  ftValueChange(scope) {
    if (scope === 1) {
      this.ftNode1.vconSeq = true;
    }
    if (scope === 2) {
      this.ftNode2.vconSeq = true;
    }
    if (scope === 3) {
      this.ftNode3.vconSeq = true;
    }
  }
  constructor(private connectionService: ConnectionService) {
  }
  ngOnInit() {
    this.ftNode1 = new FileTransfer1();
    this.ftNode2 = new FileTransfer2();
    this.ftNode3 = new FileTransfer3();
  }
  partners = (currentPartner) => {
    const totalPartners = 4;
    this.allPartnersData = [];
    for (let i = 0; i < totalPartners; i++) {
      const partner = this.partnersForIteration[i]; // I- A - B - C
      switch (partner) {
        case 'I':
          if (currentPartner.piParamName === true) {
          }
          break;
        case 'A':
          if (currentPartner.paParamName === true) {
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
          if (currentPartner.pcParamName === true) {
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
    this.ftNode1.clear();
    this.ftNode2.clear();
    this.ftNode3.clear();
    const FileTransferData = result.listIcsConnectionsFileTransferDto;
    if (FileTransferData !== undefined && FileTransferData.length !== 0) {
      const file1Data = FileTransferData.filter(function (node) { return ((node.vconSeq === 1)); });
      const file2Data = FileTransferData.filter(function (node) { return ((node.vconSeq === 2)); });
      const file3Data = FileTransferData.filter(function (node) { return ((node.vconSeq === 3)); });
      if (file1Data !== undefined && file1Data.length !== 0) {
        this.ftNode1.vconSeq = (file1Data[0].vconSeq === 1) ? true : false;
        this.ftNode1.recLayoutIn = file1Data[0].recLayoutIn;
        this.ftNode1.recLayoutOut = file1Data[0].recLayoutOut;
        this.ftNode1.recFormatOut = file1Data[0].recFormatOut;
        this.ftNode1.confirmation = (file1Data[0].confirmation === '1') ? true : false;
        this.ftNode1.auditAdvice = (file1Data[0].auditAdvice === '1') ? true : false;
        this.ftNode1.scheduledBatch = (file1Data[0].scheduledBatch === '1') ? true : false;
        this.ftNode1.nullsFlag = file1Data[0].nullsFlag;
        this.ftNode1.processFlag = file1Data[0].processFlag;
        this.ftNode1.messageCode = file1Data[0].messageCode;
        this.ftNode1.messageText = file1Data[0].messageText;
        this.ftNode1.connectDesc = file1Data[0].connectDesc;
        if (file1Data[0].icsConnectionPartnerOptDto !== undefined && file1Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = file1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = file1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = file1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = file1Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.ftNode1.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.ftNode1.piOption = partnerIdata[0].option;
            this.ftNode1.piIdentityType = partnerIdata[0].identityType;
            this.ftNode1.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.ftNode1.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.ftNode1.paOption = partnerAdata[0].option;
            this.ftNode1.paIdentityType = partnerAdata[0].identityType;
            this.ftNode1.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.ftNode1.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.ftNode1.pbOption = partnerBdata[0].option;
            this.ftNode1.pbIdentityType = partnerBdata[0].identityType;
            this.ftNode1.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.ftNode1.pcParamName = (partnerCdata[0].paramName === 'C') ? true : false;
            this.ftNode1.pcOption = partnerCdata[0].option;
            this.ftNode1.pcIdentityType = partnerCdata[0].identityType;
            this.ftNode1.pcCustomerNumber = partnerCdata[0].customerNumber;
          }
        }
      }
      if (file2Data !== undefined && file2Data.length !== 0) {
        this.ftNode2.vconSeq = (file2Data[0].vconSeq === 2) ? true : false;
        this.ftNode2.recLayoutIn = file2Data[0].recLayoutIn;
        this.ftNode2.recLayoutOut = file2Data[0].recLayoutOut;
        this.ftNode2.recFormatOut = file2Data[0].recFormatOut;
        this.ftNode2.confirmation = (file2Data[0].confirmation === '1') ? true : false;
        this.ftNode2.auditAdvice = (file2Data[0].auditAdvice === '1') ? true : false;
        this.ftNode2.scheduledBatch = (file2Data[0].scheduledBatch === '1') ? true : false;
        this.ftNode2.nullsFlag = file2Data[0].nullsFlag;
        this.ftNode2.processFlag = file2Data[0].processFlag;
        this.ftNode2.messageCode = file2Data[0].messageCode;
        this.ftNode2.messageText = file2Data[0].messageText;
        this.ftNode2.connectDesc = file2Data[0].connectDesc;
        if (file2Data[0].icsConnectionPartnerOptDto !== undefined && file2Data[0].icsConnectionPartnerOptDto.length !== 0) {
          const partnerIdata = file2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = file2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = file2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = file2Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.ftNode2.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.ftNode2.piOption = partnerIdata[0].option;
            this.ftNode2.piIdentityType = partnerIdata[0].identityType;
            this.ftNode2.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.ftNode2.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.ftNode2.paOption = partnerAdata[0].option;
            this.ftNode2.paIdentityType = partnerAdata[0].identityType;
            this.ftNode2.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.ftNode2.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.ftNode2.pbOption = partnerBdata[0].option;
            this.ftNode2.pbIdentityType = partnerBdata[0].identityType;
            this.ftNode2.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.ftNode2.pcParamName = (partnerCdata[0].paramName === 'C') ? true : false;
            this.ftNode2.pcOption = partnerCdata[0].option;
            this.ftNode2.pcIdentityType = partnerCdata[0].identityType;
            this.ftNode2.pcCustomerNumber = partnerCdata[0].customerNumber;
          }
        }
      }
      if (file3Data !== undefined && file3Data.length !== 0) {
        this.ftNode3.vconSeq = (file3Data[0].vconSeq === 3) ? true : false;
        this.ftNode3.recLayoutIn = file3Data[0].recLayoutIn;
        this.ftNode3.recLayoutOut = file3Data[0].recLayoutOut;
        this.ftNode3.recFormatOut = file3Data[0].recFormatOut;
        this.ftNode3.confirmation = (file3Data[0].confirmation === '1') ? true : false;
        this.ftNode3.auditAdvice = (file3Data[0].auditAdvice === '1') ? true : false;
        this.ftNode3.scheduledBatch = (file3Data[0].scheduledBatch === '1') ? true : false;
        this.ftNode3.nullsFlag = file3Data[0].nullsFlag;
        this.ftNode3.processFlag = file3Data[0].processFlag;
        this.ftNode3.messageCode = file3Data[0].messageCode;
        this.ftNode3.messageText = file3Data[0].messageText;
        this.ftNode3.connectDesc = file3Data[0].connectDesc;
        if (file3Data[0].icsConnectionPartnerOptDto !== undefined && file3Data[0].icsConnectionPartnerOptDto.length != 0) {
          const partnerIdata = file3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'I')); });
          const partnerAdata = file3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'A')); });
          const partnerBdata = file3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'B')); });
          const partnerCdata = file3Data[0].icsConnectionPartnerOptDto.filter(function (node) { return ((node.paramName === 'C')); });
          if (partnerIdata !== undefined && partnerIdata.length !== 0) {
            this.ftNode3.piParamName = (partnerIdata[0].paramName === 'I') ? true : false;
            this.ftNode3.piOption = partnerIdata[0].option;
            this.ftNode3.piIdentityType = partnerIdata[0].identityType;
            this.ftNode3.piCustomerNumber = partnerIdata[0].customerNumber;
          }
          if (partnerAdata !== undefined && partnerAdata.length !== 0) {
            this.ftNode3.paParamName = (partnerAdata[0].paramName === 'A') ? true : false;
            this.ftNode3.paOption = partnerAdata[0].option;
            this.ftNode3.paIdentityType = partnerAdata[0].identityType;
            this.ftNode3.paCustomerNumber = partnerAdata[0].customerNumber;
          }
          if (partnerBdata !== undefined && partnerBdata.length !== 0) {
            this.ftNode3.pbParamName = (partnerBdata[0].paramName === 'B') ? true : false;
            this.ftNode3.pbOption = partnerBdata[0].option;
            this.ftNode3.pbIdentityType = partnerBdata[0].identityType;
            this.ftNode3.pbCustomerNumber = partnerBdata[0].customerNumber;
          }
          if (partnerCdata !== undefined && partnerCdata.length !== 0) {
            this.ftNode3.pcParamName = (partnerCdata[0].paramName === 'C') ? true : false;
            this.ftNode3.pcOption = partnerCdata[0].option;
            this.ftNode3.pcIdentityType = partnerCdata[0].identityType;
            this.ftNode3.pcCustomerNumber = partnerCdata[0].customerNumber;
          }
        }
      }
    }
  }
  saveFileTransfer = () => {
    this.listNode = [];
    this.finalFtNode = [];
    this.listNode.push(this.ftNode1, this.ftNode2, this.ftNode3);
    for (let i = 0; i < this.listNode.length; i++) {
      const allPartnersDataForCurrentFileTransfer = this.saveFileTransferData(this.listNode[i]);
      const vconSeq = (this.listNode[i].vconSeq === true) ? i + 1 : null;
      const confirmation = (this.listNode[i].confirmation === true) ? '1' : '0';
      const auditAdvice = (this.listNode[i].auditAdvice === true) ? '1' : '0';
      const scheduledBatch = (this.listNode[i].scheduledBatch === true) ? '1' : '0';
      if ((this.listNode[i].vconSeq === true)) {
        // tslint:disable-next-line:max-line-length
        const listIcsConnectionsFileTransferDto = this.connectionService.createListIcsConnectionsFileTransferDto(this.listNode[i].recLayoutIn, this.listNode[i].recLayoutOut, this.listNode[i].recFormatOut, confirmation, auditAdvice, scheduledBatch, this.listNode[i].nullsFlag, this.listNode[i].processFlag, this.listNode[i].messageCode, this.listNode[i].messageText, this.listNode[i].connectDesc, allPartnersDataForCurrentFileTransfer, vconSeq);
        this.finalFtNode.push(listIcsConnectionsFileTransferDto);
      }
    }
    return this.finalFtNode;
  }
  saveFileTransferData = (currentFileNode) => {
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
