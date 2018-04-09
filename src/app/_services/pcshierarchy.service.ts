import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { PcsHierarchyRanking } from '../_models/pcshierarchy/pcshierarchyranking';
import { PcsHierarchy } from '../_models/pcshierarchy/pcshierarchy';

import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class PcsHierarchyService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }
    getSubmissionTypes(): Observable<any> {
        const url = this.api + '/mo/pcs/fetchSubmisisonType';
        return this.http.get(url);
    }
    getMsos(body): Observable<any> {
        const url = this.api + '/mo/pcs/fetchListOfMsos';
        return this.http.post(url, body);
    }
    getHierarchyRankings(body): Observable<any> {
        const url = this.api + '/mo/pcs/getHierarchyRankings';
        return this.http.post(url, body);
    }
    buildHierarchy(body): Observable<any> {
        const url = this.api + '/mo/pcs/saveOrUpdateHierarchy';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, body,{ headers: headers });
    }
    createhierarchy(param, hierarchyRanking, system) {
        const pcshierarchyObj = new PcsHierarchy();
        const date = new Date();
        const lastupdatedDate = date.toISOString();
        pcshierarchyObj.icaBin = param.icaBin;
        pcshierarchyObj.mso = param.mso;
        pcshierarchyObj.inputRecordType = param.inputRecordType;
        pcshierarchyObj.pcsHierarchyRankingDto = hierarchyRanking;
        pcshierarchyObj.system = system;
        pcshierarchyObj.loadTS = lastupdatedDate;
        pcshierarchyObj.lastUpdatedUserId = 'UU01';
        return pcshierarchyObj;
    }
    removeHierarchyData(param, hierarchyCode, vaisResponseCode, description) {
        const rankingArr = [];
        const pcshierarchyObj = new PcsHierarchy();
        const PcsHierarchyRankingObj = new PcsHierarchyRanking();
        pcshierarchyObj.icaBin = param.icaBin;
        pcshierarchyObj.mso = param.mso;
        pcshierarchyObj.inputRecordType = param.inputRecordType;
        PcsHierarchyRankingObj.hierarchyCode = hierarchyCode;
        PcsHierarchyRankingObj.vaisResponseCode = vaisResponseCode;
        PcsHierarchyRankingObj.description = description;
        rankingArr.push(PcsHierarchyRankingObj);
        pcshierarchyObj.pcsHierarchyRankingDto = rankingArr;
        return pcshierarchyObj;
    }
    addNewCode(body): Observable<any> {
        const url = this.api + '/mo/pcs/addNewHierarchyCodes';
        return this.http.post(url, body);
    }
}
