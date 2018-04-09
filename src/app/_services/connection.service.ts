import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IcsConnBaseTwoDirectExchangeDto } from '../_models/connections/direct-exchange';
import { ListIcsConnectionsFileTransferDto } from '../_models/connections/file-transfer';
import { ListIcsConnectionsOnlineInteractiveDto, IcsConnectionPartnerOptDto } from '../_models/connections/online-interactive';
import { IcsConnectionsIcsDirectDto } from '../_models/connections/ICSDirect';
import { Connections } from '../_models/connections/connections';
@Injectable()
export class ConnectionService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    createIcsIcsConnectionPartnerOptDto = (paramName, option, identityType, customerNumber) => {
        const newIcsConnectionPartnerOptDto = new IcsConnectionPartnerOptDto();
        newIcsConnectionPartnerOptDto.paramName = paramName;
        newIcsConnectionPartnerOptDto.option = option;
        newIcsConnectionPartnerOptDto.identityType = identityType;
        newIcsConnectionPartnerOptDto.customerNumber = customerNumber;
        return newIcsConnectionPartnerOptDto;
    }
    createIcsConnBaseTwoDirectExchangeDto = (recFormatOut, confirmation, auditAdvice, scheduledBatch, vconSeq) => {
        const newIcsConnBaseTwoDirectExchangeDto = new IcsConnBaseTwoDirectExchangeDto();
        newIcsConnBaseTwoDirectExchangeDto.recFormatOut = recFormatOut;
        newIcsConnBaseTwoDirectExchangeDto.confirmation = confirmation;
        newIcsConnBaseTwoDirectExchangeDto.auditAdvice = auditAdvice;
        newIcsConnBaseTwoDirectExchangeDto.scheduledBatch = scheduledBatch;
        newIcsConnBaseTwoDirectExchangeDto.vconSeq = vconSeq;
        return newIcsConnBaseTwoDirectExchangeDto;
    }
    // tslint:disable-next-line:max-line-length
    createListIcsConnectionsFileTransferDto = (recLayoutIn, recLayoutOut, recFormatOut, confirmation, auditAdvice, scheduledBatch, nullsFlag, processFlag, messageCode, messageText, connectDesc, partnersArray, vconSeq) => {
        const newListIcsConnectionsFileTransferDto = new ListIcsConnectionsFileTransferDto();
        newListIcsConnectionsFileTransferDto.recLayoutIn = recLayoutIn;
        newListIcsConnectionsFileTransferDto.recLayoutOut = recLayoutOut;
        newListIcsConnectionsFileTransferDto.recFormatOut = recFormatOut;
        newListIcsConnectionsFileTransferDto.confirmation = confirmation;
        newListIcsConnectionsFileTransferDto.auditAdvice = auditAdvice;
        newListIcsConnectionsFileTransferDto.scheduledBatch = scheduledBatch;
        newListIcsConnectionsFileTransferDto.nullsFlag = nullsFlag;
        newListIcsConnectionsFileTransferDto.processFlag = processFlag;
        newListIcsConnectionsFileTransferDto.messageCode = messageCode;
        newListIcsConnectionsFileTransferDto.messageText = messageText
        newListIcsConnectionsFileTransferDto.connectDesc = connectDesc;
        newListIcsConnectionsFileTransferDto.icsConnectionPartnerOptDto = partnersArray;
        newListIcsConnectionsFileTransferDto.vconSeq = vconSeq;
        return newListIcsConnectionsFileTransferDto;
    }
    createListIcsConnectionsOnlineInteractiveDto = (netName, connectDesc, vaisInd, processFlag, partnersArray, vconSeq) => {
        const newListIcsConnectionsOnlineInteractiveDto = new ListIcsConnectionsOnlineInteractiveDto();
        newListIcsConnectionsOnlineInteractiveDto.netName = netName;
        newListIcsConnectionsOnlineInteractiveDto.connectDesc = connectDesc;
        newListIcsConnectionsOnlineInteractiveDto.vaisInd = vaisInd;
        newListIcsConnectionsOnlineInteractiveDto.processFlag = processFlag;
        newListIcsConnectionsOnlineInteractiveDto.icsConnectionPartnerOptDto = partnersArray;
        newListIcsConnectionsOnlineInteractiveDto.vconSeq = vconSeq;
        return newListIcsConnectionsOnlineInteractiveDto;
    }
    createIcsConnectionsIcsDirectDto = (processFlag, connectDesc, recFormatOut, confirmation, auditAdvice) => {
        const newIcsConnectionsIcsDirectDto = new IcsConnectionsIcsDirectDto()

        newIcsConnectionsIcsDirectDto.processFlag = processFlag;
        newIcsConnectionsIcsDirectDto.connectDesc = connectDesc;
        newIcsConnectionsIcsDirectDto.recFormatOut = recFormatOut;
        newIcsConnectionsIcsDirectDto.confirmation = confirmation;
        newIcsConnectionsIcsDirectDto.auditAdvice = auditAdvice;

        return newIcsConnectionsIcsDirectDto;
    }
    // tslint:disable-next-line:max-line-length
    createConnection = (bin, mso,system, icsConnBaseTwoDirectExchangeDto, listIcsConnectionsFileTransferDto, listIcsConnectionsOnlineInteractiveDto, icsConnectionsIcsDirectDto, loadTs, currentUser, lastUpdatedUserId, vaisInd) => {
        const newConnections = new Connections()
        newConnections.bin = bin;
        newConnections.mso = mso;
        newConnections.system = system;
        newConnections.icsConnBaseTwoDirectExchangeDto = icsConnBaseTwoDirectExchangeDto;
        newConnections.listIcsConnectionsFileTransferDto = listIcsConnectionsFileTransferDto;
        newConnections.listIcsConnectionsOnlineInteractiveDto = listIcsConnectionsOnlineInteractiveDto;
        newConnections.icsConnectionsIcsDirectDto = icsConnectionsIcsDirectDto;
        newConnections.loadTs = loadTs;
        newConnections.currentUser = currentUser;
        newConnections.lastUpdatedUserId = lastUpdatedUserId;
        newConnections.vaisInd = vaisInd;

        return newConnections;
    }
    public fetchConnections(body): Observable<any> {
        const url = this.api + '/mo/ics/retriveConnectionsInfo';
        return this.http.post(url, body);
    }
    public saveConnections(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/ics/saveOrUpdateConnections';
        return this.http.post(url, body, { headers: headers });
    }
}
