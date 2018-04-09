import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, ControlContainer, NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { IcsConnectionsIcsDirectDto } from '../../../_models/connections/ICSDirect';
import { ConnectionService } from '../../../_services/connection.service';
@Component({
  selector: 'app-ICSDirect',
  templateUrl: './ICSDirect.component.html',
  styleUrls: ['./ICSDirect.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ICSDirectComponent implements OnInit {
  icsConnectionsIcsDirectDto = new IcsConnectionsIcsDirectDto();
  constructor(private connectionService: ConnectionService) { }
  ngOnInit() {
    this.icsConnectionsIcsDirectDto.processFlag = 'P';
    this.icsConnectionsIcsDirectDto.recFormatOut = 'U';
  }
  appendToForm(result) {
    this.icsConnectionsIcsDirectDto.clearModel();
    if (result.icsConnectionsIcsDirectDto != null) {
      this.icsConnectionsIcsDirectDto.processFlag = result.icsConnectionsIcsDirectDto.processFlag;
      this.icsConnectionsIcsDirectDto.connectDesc = result.icsConnectionsIcsDirectDto.connectDesc;
      this.icsConnectionsIcsDirectDto.recFormatOut = result.icsConnectionsIcsDirectDto.recFormatOut;
      this.icsConnectionsIcsDirectDto.confirmation = (result.icsConnectionsIcsDirectDto.confirmation === '1') ? true : false;
      this.icsConnectionsIcsDirectDto.auditAdvice = (result.icsConnectionsIcsDirectDto.auditAdvice === '1') ? true : false;
    }
  }
  saveICSDirect() {
    const confirmation = (this.icsConnectionsIcsDirectDto.confirmation === true) ? '1' : '0';
    const auditAdvice = (this.icsConnectionsIcsDirectDto.auditAdvice === true) ? '1' : '0';
    // tslint:disable-next-line:max-line-length
    const newIcsConnectionsIcsDirectDto = this.connectionService.createIcsConnectionsIcsDirectDto(this.icsConnectionsIcsDirectDto.processFlag, this.icsConnectionsIcsDirectDto.connectDesc, this.icsConnectionsIcsDirectDto.recFormatOut, confirmation, auditAdvice);
    return newIcsConnectionsIcsDirectDto;
  }
}
