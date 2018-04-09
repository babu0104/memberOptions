import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IntMemberTblDto } from '../_models/contacts/intMemberTblDto';
import { IntMemberIcsDirectTblDto } from '../_models/contacts/intMemberIcsDirectTblDto';
import { IcsMemberBinBidAssocDto } from '../_models/contacts/icsMemberBinBidAssocDto';
import { Contact } from '../_models/contacts/contact';
import { environment } from '../../environments/environment';
@Injectable()
export class PcsContactsService {
    private api: string;
    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    // tslint:disable-next-line:max-line-length
    createIntMemberTblDto = (icsBin, assocFlag, boName, boPhone, boFax, boEmail, tcName, tcPhone, tcFax, tcEmail, pmBoName, pmBoPhone, pmBoFax, pmBoEmail, pmTcName, pmTcPhone, pmTcFax, pmTcEmail, binModified, lastModifiedOn) => {
        const newIntMemberTblDto = new IntMemberTblDto();
        newIntMemberTblDto.icsBin = icsBin;
        newIntMemberTblDto.assocFlag = assocFlag;
        newIntMemberTblDto.boName = boName;
        newIntMemberTblDto.boPhone = boPhone;
        newIntMemberTblDto.boFax = boFax;
        newIntMemberTblDto.boEmail = boEmail;
        newIntMemberTblDto.tcName = tcName;
        newIntMemberTblDto.tcPhone = tcPhone;
        newIntMemberTblDto.tcFax = tcFax;
        newIntMemberTblDto.tcEmail = tcEmail;
        newIntMemberTblDto.pmBoName = pmBoName;
        newIntMemberTblDto.pmBoPhone = pmBoPhone;
        newIntMemberTblDto.pmBoFax = pmBoFax;
        newIntMemberTblDto.pmBoEmail = pmBoEmail;
        newIntMemberTblDto.pmTcName = pmTcName;
        newIntMemberTblDto.pmTcPhone = pmTcPhone;
        newIntMemberTblDto.pmTcFax = pmTcFax;
        newIntMemberTblDto.pmTcEmail = pmTcEmail;
        newIntMemberTblDto.binModified = binModified;
        newIntMemberTblDto.lastModifiedOn = lastModifiedOn;
        return newIntMemberTblDto;
    }
    // tslint:disable-next-line:max-line-length
    createIntMemberIcsDirectTblDto = (businessId, mbrName, mbrAddr1, mbrAddr2, mbrCity, mbrState, mbrZipCode, bidModified, lastModifiedOn) => {
        const newIntMemberIcsDirectTblDto = new IntMemberIcsDirectTblDto();
        newIntMemberIcsDirectTblDto.businessId = businessId;
        // newIntMemberIcsDirectTblDto.loadTs = loadTs;
        newIntMemberIcsDirectTblDto.mbrName = mbrName;
        newIntMemberIcsDirectTblDto.mbrAddr1 = mbrAddr1;
        newIntMemberIcsDirectTblDto.mbrAddr2 = mbrAddr2;
        newIntMemberIcsDirectTblDto.mbrCity = mbrCity;
        newIntMemberIcsDirectTblDto.mbrState = mbrState;
        newIntMemberIcsDirectTblDto.mbrZipCode = mbrZipCode;
        newIntMemberIcsDirectTblDto.bidModified = bidModified;
        newIntMemberIcsDirectTblDto.lastModifiedOn = lastModifiedOn;
        return newIntMemberIcsDirectTblDto;
    }
    // Common for both ICS and PCS
    createIcsMemberBinBidAssocDto = (businessId, bin, procId, lastModifiedOn) => {
        const newIcsMemberBinBidAssocDto = new IcsMemberBinBidAssocDto();
        newIcsMemberBinBidAssocDto.businessId = businessId;
        newIcsMemberBinBidAssocDto.bin = bin;
        newIcsMemberBinBidAssocDto.procId = procId;
        newIcsMemberBinBidAssocDto.lastModifiedOn = lastModifiedOn;
        return newIcsMemberBinBidAssocDto;
    }
    // tslint:disable-next-line:max-line-length
    createContact = (businessId, icabin, system, newBidBin, intMemberTblDto, intMemberIcsDirectTblDto, icsMemberBinBidAssocDto, loadTs, extractTs, lastUpdtUserId) => {
        const newContact = new Contact()
        newContact.businessId = businessId;
        newContact.icaBin = icabin;
        newContact.system = system;
        newContact.newBidBin = newBidBin;
        newContact.intMemberTblDto = intMemberTblDto;
        newContact.intMemberIcsDirectTblDto = intMemberIcsDirectTblDto;
        newContact.icsMemberBinBidAssocDto = icsMemberBinBidAssocDto;
        newContact.loadTs = loadTs;
        newContact.extractTs = extractTs;
        newContact.lastUpdtUserId = lastUpdtUserId;
        return newContact;
    }
    public getStateCityList(): Observable<any> {
        const urlForListOfState = this.api + '/mo/fetchStates';
        return this.http.get(urlForListOfState);
    }
    public fetchBin(body): Observable<any> {
        const url = this.api + '/mo/pcs/fetchListOfBinsByBid';
        return this.http.post(url, body);
    }
    public fetchContact(body): Observable<any> {
        const url = this.api + '/mo/pcs/retriveContactInfo';
        return this.http.post(url, body);
    }
    public saveContact(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/pcs/saveOrUpdateContactInfo';
        return this.http.post(url, body, { headers: headers });
    }
    public createNewBin(body): Observable<any> {
        const url = this.api + '/mo/pcs/retriveContactInfo';
        return this.http.post(url, body);
    }
    public checkbin(body): Observable<any> {
        const url = this.api + '/mo/pcs/retriveContactInfo';
        return this.http.post(url, body);
    }
}
