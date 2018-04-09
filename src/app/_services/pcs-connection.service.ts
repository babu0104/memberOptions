import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PcsConnections, FileTransfer, OnlineInteractive, PcsConnectionPartnerOptDto } from '../_models/connections/pcs-connections';
@Injectable()
export class ConnectionService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    createPcsConnectionPartnerOptDto = (paramName, identityType, product) => {
        const newPcsConnectionPartnerOptDto = new PcsConnectionPartnerOptDto();
        newPcsConnectionPartnerOptDto.paramName = paramName;
        newPcsConnectionPartnerOptDto.identityType = identityType;
        newPcsConnectionPartnerOptDto.product = product;
        return newPcsConnectionPartnerOptDto;
    }
    createFileTransfer = (confirmation, messageCode, messageText, connectDesc, vconSeq) => {
        const newFileTransfer = new FileTransfer();
        newFileTransfer.confirmation = confirmation;
        newFileTransfer.messageCode = messageCode;
        newFileTransfer.messageText = messageText
        newFileTransfer.connectDesc = connectDesc;
        newFileTransfer.vconSeq = vconSeq;
        return newFileTransfer;
    }
    createOnlineInteractive = (netName, connectDesc, partnersArray, vconSeq) => {
        const newOnlineInteractive = new OnlineInteractive();
        newOnlineInteractive.netName = netName;
        newOnlineInteractive.connectDesc = connectDesc;
        newOnlineInteractive.pcsConnectionPartnerOptDto = partnersArray;
        newOnlineInteractive.vconSeq = vconSeq;
        return newOnlineInteractive;
    }
    createConnection = (bin, mso,system, assocFlag, pcsConnectionsFileTranserDto,
        pcsConnectionsOnlineInteractiveDto, loadTs, currentUser, lastUpdtUser) => {
        const newConnections = new PcsConnections()
        newConnections.bin = bin;
        newConnections.mso = mso;
        newConnections.system = system;
        newConnections.assocFlag = assocFlag;
        newConnections.pcsConnectionsFileTranserDto = pcsConnectionsFileTranserDto;
        newConnections.pcsConnectionsOnlineInteractiveDto = pcsConnectionsOnlineInteractiveDto;
        newConnections.loadTs = loadTs;
        newConnections.currentUser = currentUser;
        newConnections.lastUpdtUser = lastUpdtUser;
        return newConnections;
    }
    public fetchConnections(body): Observable<any> {
        const url = this.api + '/mo/pcs/retriveConnectionInfo';
        return this.http.post(url, body);
    }
    public saveConnections(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/pcs/saveOrUpdateConnectionInfo';
        return this.http.post(url, body, { headers: headers });
    }
}
