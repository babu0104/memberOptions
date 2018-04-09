import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { listThresholdDataNode, listRetroThresholdDataNode } from '../_models/threshold/listThresholdDataNode';
import { ThresholdNode, RetroThresholdNode } from '../_models/threshold/thresholdNode';
import { Hierarchy } from '../interfaces/hierarchy';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ThresholdService {
    constructor(private http: HttpClient) { }
    createListThresholdDataNode = (uuDeCode, bucket, highDay, lowDay, thresholdValue, loadTS) => {
        const newListThresholdDataNode = new listThresholdDataNode();
        // newListThresholdDataNode.thresholdUuPkDto = newThresholdUuPkDtoNode;
        newListThresholdDataNode.uuDeCode = uuDeCode;
        newListThresholdDataNode.bucket = bucket;
        newListThresholdDataNode.highDay = highDay;
        newListThresholdDataNode.lowDay = lowDay;
        newListThresholdDataNode.thresholdValue = thresholdValue;
        newListThresholdDataNode.loadTS = loadTS;
        return newListThresholdDataNode;
    }
    createListRetroThresholdDataNode = (uuDeCode, bucket, highDay, lowDay, thresholdValue, loadTS) => {
        const newListRetroThresholdDataNode = new listRetroThresholdDataNode();
        // newListThresholdDataNode.thresholdUuPkDto = newThresholdUuPkDtoNode;
        newListRetroThresholdDataNode.uuDeCode = uuDeCode;
        newListRetroThresholdDataNode.bucket = bucket;
        newListRetroThresholdDataNode.applVelocityHigh = highDay;
        newListRetroThresholdDataNode.applVelocityLow = lowDay;
        newListRetroThresholdDataNode.thresholdValue = thresholdValue;
        newListRetroThresholdDataNode.loadTS = loadTS;
        return newListRetroThresholdDataNode;
    }
    createThresholdNode = (icaBin, mso, system, thresholdOption, assocFlag, lastUpdatedUserId, name, listThresholdData) => {
        const threshold = new ThresholdNode();

        threshold.icaBin = icaBin;
        threshold.mso = mso;
        threshold.system = system;
        threshold.thresholdOption = thresholdOption;
        threshold.assocFlag = assocFlag;
        threshold.lastUpdatedUserId = lastUpdatedUserId;
        threshold.name = name;
        threshold.listThresholdUuData = listThresholdData
        return threshold;
    }
    createRetroThresholdNode = (icaBin, mso, system, thresholdOption, assocFlag, lastUpdatedUserId, name, listRetroThresholdUuData) => {
        const retroThreshold = new RetroThresholdNode();
        retroThreshold.icaBin = icaBin;
        retroThreshold.mso = mso;
        retroThreshold.system = system;
        retroThreshold.thresholdOption = thresholdOption;
        retroThreshold.assocFlag = assocFlag;
        retroThreshold.lastUpdatedUserId = lastUpdatedUserId;
        retroThreshold.name = name;
        retroThreshold.listRetroThresholdUuData = listRetroThresholdUuData;
        return retroThreshold;
    }
    getHierarchyResponses() {
        return this.http.get<any>('assets/data/hierarchy.json')
            .toPromise()
            .then(res => <Hierarchy[]>res.data)
            .then(hierarchydata => hierarchydata);
    }
    public fetchMso(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public retrieveThreshold(url, body): Observable<any> {
        return this.http.post(url, body);
    }
    public saveThreshold(url, body): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.put(url, body, { headers: headers });
    }
}
