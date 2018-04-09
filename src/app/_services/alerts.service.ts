import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class AlertService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    public fetchMso(body): Observable<any> {
        const url = this.api + '/mo/getListOfMSOs';
        return this.http.post(url, body);
    }
    public fetchAlerts(body): Observable<any> {
        const url = this.api + '/mo/retriveAlertsAndInvalids';
        return this.http.post(url, body);
    }
    public saveAlerts(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/saveAlterAndInvalidData';
        return this.http.post(url, body, { headers: headers });
    } 
    public fetchPcsMso(body): Observable<any> {
        const url = this.api + '/mo/pcs/getListOfMSOs';
        return this.http.post(url, body);
    }
    public fetchPcsAlerts(body): Observable<any> {
        const url = this.api + '/mo/pcs/retriveAlertsinvalids';
        return this.http.post(url, body);
    }
    public savePcsAlerts(body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const url = this.api + '/mo/pcs/saveOrUpdateAlertsInvalids';
        return this.http.post(url, body, { headers: headers });
    }  
}
