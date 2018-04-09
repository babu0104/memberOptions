import { Injectable } from '@angular/core';
import { FileReport, ContactInfoDto } from '../_models/prescreen/file-report';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class FileReportService {
    private api: string;
    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    // tslint:disable-next-line:max-line-length
    createContactInfoDto = (mbrName, mbrContact, mbrAddr1, mbrAddr2, mbrCity, mbrState, mbrZipCode, mbrphone, mbrFax, mbrEmail) => {
        const newContactInfoDto = new ContactInfoDto();
        newContactInfoDto.mbrName = mbrName;
        newContactInfoDto.mbrContact = mbrContact;
        newContactInfoDto.mbrAddr1 = mbrAddr1;
        newContactInfoDto.mbrAddr2 = mbrAddr2;
        newContactInfoDto.mbrCity = mbrCity;
        newContactInfoDto.mbrState = mbrState;
        newContactInfoDto.mbrZipCode = mbrZipCode;
        newContactInfoDto.mbrphone = mbrphone;
        newContactInfoDto.mbrFax = mbrFax;
        newContactInfoDto.mbrEmail = mbrEmail;
        return newContactInfoDto;
    }

    // tslint:disable-next-line:max-line-length
    createFileReport = (bin, mso, assocFlag, projectNum, criteriaLevel, prescreenContactInfoDto, iprocName, iprocContactName, iprocAddr1, iprocAddr2,
        iprocCity, iprocState, iprocZipCode, iprocPhone, iprocFax, iprocEmail, approvalStatus, recurringStartDate, auditReport, matchBackAuditReport, activityReport,
        fileOuputReport, superFileFmt, media, fileTransferIp, maskSsn, fileDelivery, loadTs, currentUser, lastUpdtUser) => {
        const newFileReport = new FileReport()
        newFileReport.icaBin = bin;
        newFileReport.mso = mso;
        newFileReport.assocFlag = assocFlag;
        newFileReport.projectNum = projectNum;
        newFileReport.criteriaLevel = criteriaLevel;
        newFileReport.prescreenContactInfoDto = prescreenContactInfoDto;
        newFileReport.iprocName = iprocName;
        newFileReport.iprocContactName = iprocContactName;
        newFileReport.iprocAddr1 = iprocAddr1;
        newFileReport.iprocAddr2 = iprocAddr2;
        newFileReport.iprocCity = iprocCity;
        newFileReport.iprocState = iprocState;
        newFileReport.iprocZipCode = iprocZipCode;
        newFileReport.iprocPhone = iprocPhone;
        newFileReport.iprocFax = iprocFax;
        newFileReport.iprocEmail = iprocEmail;
        newFileReport.approvalStatus = approvalStatus;
        newFileReport.recurringStartDate = recurringStartDate;
        newFileReport.auditReport = auditReport;
        newFileReport.matchBackAuditReport = matchBackAuditReport;
        newFileReport.activityReport = activityReport;
        newFileReport.fileOuputReport = fileOuputReport;
        newFileReport.superFileFmt = superFileFmt;
        newFileReport.media = media;
        newFileReport.fileTransferIp = fileTransferIp;
        newFileReport.maskSsn = maskSsn;
        newFileReport.fileDelivery = fileDelivery;
        newFileReport.loadTs = loadTs;
        newFileReport.currentUser = currentUser;
        newFileReport.lastUpdtUser = lastUpdtUser;
        return newFileReport;
    }

    public fetchProject(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public fetchFileReport(url, body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, body, { headers: headers });
    }
    public saveFileReport(url, file): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, file, { headers: headers });
    }
    public saveDataElement(url, file): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, file, { headers: headers });
    }
}
