import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntMemberTblDto } from '../_models/contacts/intMemberTblDto';
import { IntMemberIcsDirectTblDto } from '../_models/contacts/intMemberIcsDirectTblDto';
import { IcsMemberBinBidAssocDto } from '../_models/contacts/icsMemberBinBidAssocDto';
import { Contact } from '../_models/contacts/contact';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/share';
@Injectable()
export class ContactsService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    // For ICS
    createIntMemberTblDto = (icsBin, assocFlag, boName, boPhone, boFax, boEmail,
        tcName, tcPhone, tcFax, tcEmail, binModified, lastUpdatedUId) => {
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
        newIntMemberTblDto.binModified = binModified;
        newIntMemberTblDto.lastUpdatedUId = lastUpdatedUId;
        return newIntMemberTblDto;
    }
    // For PCS
    createPcsIntMemberTblDto = (icsBin, assocFlag, pmBoName, pmBoPhone, pmBoFax,
        pmBoEmail, pmTcName, pmTcPhone, pmTcFax, pmTcEmail, binModified, lastUpdatedUId) => {
        const newIntMemberTblDto = new IntMemberTblDto();
        newIntMemberTblDto.pmBoName = pmBoName;
        newIntMemberTblDto.pmBoPhone = pmBoPhone;
        newIntMemberTblDto.pmBoFax = pmBoFax;
        newIntMemberTblDto.pmBoEmail = pmBoEmail;
        newIntMemberTblDto.pmTcName = pmTcName;
        newIntMemberTblDto.pmTcPhone = pmTcPhone;
        newIntMemberTblDto.pmTcFax = pmTcFax;
        newIntMemberTblDto.pmTcEmail = pmTcEmail;
        newIntMemberTblDto.binModified = binModified;
        newIntMemberTblDto.lastUpdatedUId = lastUpdatedUId;
        return newIntMemberTblDto;
    }
    // Common for both ICS and PCS
    createIntMemberIcsDirectTblDto = (businessId, mbrName, mbrAddr1, mbrAddr2,
        mbrCity, mbrState, mbrZipCode, bidModified, lastUpdtUserId) => {
        const newIntMemberIcsDirectTblDto = new IntMemberIcsDirectTblDto();
        newIntMemberIcsDirectTblDto.businessId = businessId;
        newIntMemberIcsDirectTblDto.mbrName = mbrName;
        newIntMemberIcsDirectTblDto.mbrAddr1 = mbrAddr1;
        newIntMemberIcsDirectTblDto.mbrAddr2 = mbrAddr2;
        newIntMemberIcsDirectTblDto.mbrCity = mbrCity;
        newIntMemberIcsDirectTblDto.mbrState = mbrState;
        newIntMemberIcsDirectTblDto.mbrZipCode = mbrZipCode;
        newIntMemberIcsDirectTblDto.bidModified = bidModified;
        newIntMemberIcsDirectTblDto.lastUpdtUserId = lastUpdtUserId;
        return newIntMemberIcsDirectTblDto;
    }
    // Common for both ICS and PCS
    createIcsMemberBinBidAssocDto = (businessId, bin, procId, lastUpdtUserId) => {
        const newIcsMemberBinBidAssocDto = new IcsMemberBinBidAssocDto();
        newIcsMemberBinBidAssocDto.businessId = businessId;
        newIcsMemberBinBidAssocDto.bin = bin;
        newIcsMemberBinBidAssocDto.procId = (procId === '') ? null : procId;
        newIcsMemberBinBidAssocDto.lastUpdtUserId = lastUpdtUserId;
        return newIcsMemberBinBidAssocDto;
    }
    createContact = (businessId, icabin, system, newBidBin, intMemberTblDto, intMemberIcsDirectTblDto,
        icsMemberBinBidAssocDto) => {
        const newContact = new Contact()
        newContact.businessId = businessId;
        newContact.icaBin = icabin;
        newContact.system = system;
        newContact.newBidBin = newBidBin;
        newContact.intMemberTblDto = intMemberTblDto;
        newContact.intMemberIcsDirectTblDto = intMemberIcsDirectTblDto;
        newContact.icsMemberBinBidAssocDto = icsMemberBinBidAssocDto;
        return newContact;
    }

    public fetchBin(body): Observable<any> {
        const url = this.api + '/mo/fetchBin';
        return this.http.post(url, body).map(
            res => {
                return res;
            }
        ).share();
    }
    public fetchContact(body): Observable<any> {
        const url = this.api + '/mo/fetchContact';
        return this.http.post(url, body);
    }
    public saveContact(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/createContact';
        return this.http.post(url, body, { headers: headers });
    }
    public createNewBin(body): Observable<any> {
        const url = this.api + '/mo/fetchContact';
        return this.http.post(url, body);
    }
    public checkbin(body): Observable<any> {
        const url = this.api + '/mo/fetchContact';
        return this.http.post(url, body);
    }
}
