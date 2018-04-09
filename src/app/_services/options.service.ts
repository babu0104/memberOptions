import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class OptionsService {
    private api: string;
    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    public saveOptions(url, body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, body, { headers: headers });
    }
    public fetchMso(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public copyOptions(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public retrieveOptions(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public validateConnectionType(url, body): Observable<any> {
        return this.http.post(url, body);
    }
}
