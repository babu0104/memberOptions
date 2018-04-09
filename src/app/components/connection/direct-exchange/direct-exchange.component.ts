import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { IcsConnBaseTwoDirectExchangeDto } from '../../../_models/connections/direct-exchange';
import { ConnectionService } from '../../../_services/connection.service';
@Component({
  selector: 'app-direct-exchange',
  templateUrl: './direct-exchange.component.html',
  styleUrls: ['./direct-exchange.component.scss']
})
export class DirectExchangeComponent implements OnInit {
  icsConnBaseTwoDirectExchangeDto = new IcsConnBaseTwoDirectExchangeDto();
  checked1 = false;
  confirmation = false;
  inputArray = [];
  directExc() {
    if (this.icsConnBaseTwoDirectExchangeDto.vconSeq === true) {
      this.icsConnBaseTwoDirectExchangeDto.recFormatOut = 'U';
      this.icsConnBaseTwoDirectExchangeDto.confirmation = true;
    } else {
      this.icsConnBaseTwoDirectExchangeDto.recFormatOut = '';
      this.icsConnBaseTwoDirectExchangeDto.confirmation = false;
    }
  }
  deValueChange() {
    this.icsConnBaseTwoDirectExchangeDto.vconSeq = true;
  }
  constructor(private connectionService: ConnectionService) { }
  ngOnInit() {
  }
  appendToForm(result) {
    this.icsConnBaseTwoDirectExchangeDto.clearModel();
    if (result.icsConnBaseTwoDirectExchangeDto != null) {
      this.icsConnBaseTwoDirectExchangeDto.vconSeq = (result.icsConnBaseTwoDirectExchangeDto.vconSeq === 1) ? true : false;
      this.icsConnBaseTwoDirectExchangeDto.recFormatOut = result.icsConnBaseTwoDirectExchangeDto.recFormatOut;
      this.icsConnBaseTwoDirectExchangeDto.confirmation = (result.icsConnBaseTwoDirectExchangeDto.confirmation === '1') ? true : false;
      this.icsConnBaseTwoDirectExchangeDto.auditAdvice = (result.icsConnBaseTwoDirectExchangeDto.auditAdvice === '1') ? true : false;
      this.icsConnBaseTwoDirectExchangeDto.scheduledBatch = (result.icsConnBaseTwoDirectExchangeDto.scheduledBatch === '1') ? true : false;
    }
  }
  saveDirectExchange() {
    const confirmation = (this.icsConnBaseTwoDirectExchangeDto.confirmation === true) ? '1' : '0';
    const auditAdvice = (this.icsConnBaseTwoDirectExchangeDto.auditAdvice === true) ? '1' : '0';
    const scheduledBatch = (this.icsConnBaseTwoDirectExchangeDto.scheduledBatch === true) ? '1' : '0';
    const vconSeq = (this.icsConnBaseTwoDirectExchangeDto.vconSeq === true) ? 1 : null;
    if ((this.icsConnBaseTwoDirectExchangeDto.vconSeq === true)) {
      // tslint:disable-next-line:max-line-length
      const newIcsConnBaseTwoDirectExchangeDto = this.connectionService.createIcsConnBaseTwoDirectExchangeDto(this.icsConnBaseTwoDirectExchangeDto.recFormatOut, confirmation, auditAdvice, scheduledBatch, vconSeq);
      return newIcsConnBaseTwoDirectExchangeDto;
    }
  }
}
