import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class CommonService {
    private api: string;
    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    checkBinExist(icaBin) {
        // placeholder for checking whether bin exist or not
        // return true if bin exist else false
        return true;
    }
    public getStateCityList(): Observable<any> {
        const urlForListOfState = this.api + '/mo/fetchStates';
        return this.http.get(urlForListOfState);
    }
    public fetchMso(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public fetDataElement(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public areaCode(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public sfcSection(url, body): Observable<any> {
        return this.http.post(url, body);
    }
}
