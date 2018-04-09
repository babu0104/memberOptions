import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { Threshold, pcsThresholdBucket, payloadBucket } from '../_models/pcsthreshold/threshold';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Bucket, PcsThresholdFinalDataNode } from '../_models/pcsthreshold/pcsThresholdDataNode';
import { environment } from '../../environments/environment';
@Injectable()
export class PcsThresholdService {
    // intialize
    payloadBucketObj: payloadBucket;
    uuid_code: any = '';
    private api: string;
    constructor(private http: Http, private _http : HttpClient) {
        this.payloadBucketObj = new payloadBucket();
        this.api = environment.api;
    }
    public constructBucketData(BucketCollections, velocity) {
        const _self = this;
        const tempArr = [];
        this.payloadBucketObj = {};
        // _self.uuid_code = scopeObj.applVelo;
        _self.uuid_code = velocity;
        let bucketNumber = '';
        switch (_self.uuid_code) {
            case 'DESSN':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const oo = new payloadBucket();
                            oo.applVelocityHigh = BucketCollections[i].applVelHigh;
                            oo.appVelocityLow = BucketCollections[i].applVelLow;
                            oo.appVelocityThreshold = BucketCollections[i].ssn;
                            oo.appVelocityThresholdAmt = BucketCollections[i].appVelThresholdAmt;
                            tempArr.push(oo);
                        }
                        if (bucketNumber === '1') {
                            const p = new payloadBucket();
                            p.applVelocityHigh = BucketCollections[i].applVelHigh;
                            p.appVelocityLow = BucketCollections[i].applVelLow;
                            p.appVelocityThreshold = BucketCollections[i].ssn;
                            p.appVelocityThresholdAmt = BucketCollections[i].appVelThresholdAmt;
                            tempArr.push(p);
                        }
                        if (bucketNumber === '2') {
                            const q = new payloadBucket();
                            q.applVelocityHigh = BucketCollections[i].applVelHigh;
                            q.appVelocityLow = BucketCollections[i].applVelLow;
                            q.appVelocityThreshold = BucketCollections[i].ssn;
                            q.appVelocityThresholdAmt = BucketCollections[i].appVelThresholdAmt;
                            tempArr.push(q);
                        }
                        if (bucketNumber === '3') {
                            const r = new payloadBucket();
                            r.applVelocityHigh = BucketCollections[i].applVelHigh;
                            r.appVelocityLow = BucketCollections[i].applVelLow;
                            r.appVelocityThreshold = BucketCollections[i].ssn;
                            r.appVelocityThresholdAmt = BucketCollections[i].appVelThresholdAmt;
                            tempArr.push(r);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DESTA':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const o = new payloadBucket();
                            o.applVelocityHigh = BucketCollections[i].applVelHigh;
                            o.appVelocityLow = BucketCollections[i].applVelLow;
                            o.appVelocityThreshold = BucketCollections[i].idStateNumber;
                            o.appVelocityThresholdAmt = BucketCollections[i].idStateNumberAmt;
                            tempArr.push(o);
                        }
                        if (bucketNumber === '1') {
                            const p = new payloadBucket();
                            p.applVelocityHigh = BucketCollections[i].applVelHigh;
                            p.appVelocityLow = BucketCollections[i].applVelLow;
                            p.appVelocityThreshold = BucketCollections[i].idStateNumber;
                            p.appVelocityThresholdAmt = BucketCollections[i].idStateNumberAmt;
                            tempArr.push(p);
                        }
                        if (bucketNumber === '2') {
                            const q = new payloadBucket();
                            q.applVelocityHigh = BucketCollections[i].applVelHigh;
                            q.appVelocityLow = BucketCollections[i].applVelLow;
                            q.appVelocityThreshold = BucketCollections[i].idStateNumber;
                            q.appVelocityThresholdAmt = BucketCollections[i].idStateNumberAmt;
                            tempArr.push(q);
                        }
                        if (bucketNumber === '3') {
                            const r = new payloadBucket();
                            r.applVelocityHigh = BucketCollections[i].applVelHigh;
                            r.appVelocityLow = BucketCollections[i].applVelLow;
                            r.appVelocityThreshold = BucketCollections[i].idStateNumber;
                            r.appVelocityThresholdAmt = BucketCollections[i].idStateNumberAmt;
                            tempArr.push(r);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEADR':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const adr1 = new payloadBucket();
                            adr1.applVelocityHigh = BucketCollections[i].applVelHigh;
                            adr1.appVelocityLow = BucketCollections[i].applVelLow;
                            adr1.appVelocityThreshold = BucketCollections[i].fullAddress;
                            adr1.appVelocityThresholdAmt = BucketCollections[i].fullAddressAmt;
                            tempArr.push(adr1);
                        }
                        if (bucketNumber === '1') {
                            const adr2 = new payloadBucket();
                            adr2.applVelocityHigh = BucketCollections[i].applVelHigh;
                            adr2.appVelocityLow = BucketCollections[i].applVelLow;
                            adr2.appVelocityThreshold = BucketCollections[i].fullAddress;
                            adr2.appVelocityThresholdAmt = BucketCollections[i].fullAddressAmt;
                            tempArr.push(adr2);
                        }
                        if (bucketNumber === '2') {
                            const adr3 = new payloadBucket();
                            adr3.applVelocityHigh = BucketCollections[i].applVelHigh;
                            adr3.appVelocityLow = BucketCollections[i].applVelLow;
                            adr3.appVelocityThreshold = BucketCollections[i].fullAddress;
                            adr3.appVelocityThresholdAmt = BucketCollections[i].fullAddressAmt;
                            tempArr.push(adr3);
                        }
                        if (bucketNumber === '3') {
                            const adr4 = new payloadBucket();
                            adr4.applVelocityHigh = BucketCollections[i].applVelHigh;
                            adr4.appVelocityLow = BucketCollections[i].applVelLow;
                            adr4.appVelocityThreshold = BucketCollections[i].fullAddress;
                            adr4.appVelocityThresholdAmt = BucketCollections[i].fullAddressAmt;
                            tempArr.push(adr4);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEPHN':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const oo = new payloadBucket();
                            oo.bucket = bucketNumber;
                            oo.applVelocityHigh = BucketCollections[i].applVelHigh;
                            oo.appVelocityLow = BucketCollections[i].applVelLow;
                            oo.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            oo.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(oo);
                        }
                        if (bucketNumber === '1') {
                            const pp = new payloadBucket();
                            pp.bucket = bucketNumber;
                            pp.applVelocityHigh = BucketCollections[i].applVelHigh;
                            pp.appVelocityLow = BucketCollections[i].applVelLow;
                            pp.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            pp.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(pp);
                        }
                        if (bucketNumber === '2') {
                            const qq = new payloadBucket();
                            qq.bucket = bucketNumber;
                            qq.applVelocityHigh = BucketCollections[i].applVelHigh;
                            qq.appVelocityLow = BucketCollections[i].applVelLow;
                            qq.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            qq.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(qq);
                        }
                        if (bucketNumber === '3') {
                            const rr = new payloadBucket();
                            rr.bucket = bucketNumber;
                            rr.applVelocityHigh = BucketCollections[i].applVelHigh;
                            rr.appVelocityLow = BucketCollections[i].applVelLow;
                            rr.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            rr.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(rr);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEDVC':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const dev0 = new payloadBucket();
                            dev0.bucket = bucketNumber;
                            dev0.applVelocityHigh = BucketCollections[i].applVelHigh;
                            dev0.appVelocityLow = BucketCollections[i].applVelLow;
                            dev0.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            dev0.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(dev0);
                        }
                        if (bucketNumber === '1') {
                            const dev1 = new payloadBucket();
                            dev1.bucket = bucketNumber;
                            dev1.applVelocityHigh = BucketCollections[i].applVelHigh;
                            dev1.appVelocityLow = BucketCollections[i].applVelLow;
                            dev1.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            dev1.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(dev1);
                        }
                        if (bucketNumber === '2') {
                            const dev2 = new payloadBucket();
                            dev2.bucket = bucketNumber;
                            dev2.applVelocityHigh = BucketCollections[i].applVelHigh;
                            dev2.appVelocityLow = BucketCollections[i].applVelLow;
                            dev2.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            dev2.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(dev2);
                        }
                        if (bucketNumber === '3') {
                            const dev3 = new payloadBucket();
                            dev3.bucket = bucketNumber;
                            dev3.applVelocityHigh = BucketCollections[i].applVelHigh;
                            dev3.appVelocityLow = BucketCollections[i].applVelLow;
                            dev3.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            dev3.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(dev3);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEIPA':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const ip0 = new payloadBucket();
                            ip0.bucket = bucketNumber;
                            ip0.applVelocityHigh = BucketCollections[i].applVelHigh;
                            ip0.appVelocityLow = BucketCollections[i].applVelLow;
                            ip0.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            ip0.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(ip0);
                        }
                        if (bucketNumber === '1') {
                            const ip1 = new payloadBucket();
                            ip1.bucket = bucketNumber;
                            ip1.applVelocityHigh = BucketCollections[i].applVelHigh;
                            ip1.appVelocityLow = BucketCollections[i].applVelLow;
                            ip1.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            ip1.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(ip1);
                        }
                        if (bucketNumber === '2') {
                            const ip2 = new payloadBucket();
                            ip2.bucket = bucketNumber;
                            ip2.applVelocityHigh = BucketCollections[i].applVelHigh;
                            ip2.appVelocityLow = BucketCollections[i].applVelLow;
                            ip2.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            ip2.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(ip2);
                        }
                        if (bucketNumber === '3') {
                            const ip3 = new payloadBucket();
                            ip3.bucket = bucketNumber;
                            ip3.applVelocityHigh = BucketCollections[i].applVelHigh;
                            ip3.appVelocityLow = BucketCollections[i].applVelLow;
                            ip3.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            ip3.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(ip3);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEEML':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const eml0 = new payloadBucket();
                            eml0.bucket = bucketNumber;
                            eml0.applVelocityHigh = BucketCollections[i].applVelHigh;
                            eml0.appVelocityLow = BucketCollections[i].applVelLow;
                            eml0.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            eml0.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(eml0);
                        }
                        if (bucketNumber === '1') {
                            const eml1 = new payloadBucket();
                            eml1.bucket = bucketNumber;
                            eml1.applVelocityHigh = BucketCollections[i].applVelHigh;
                            eml1.appVelocityLow = BucketCollections[i].applVelLow;
                            eml1.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            eml1.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(eml1);
                        }
                        if (bucketNumber === '2') {
                            const eml2 = new payloadBucket();
                            eml2.bucket = bucketNumber;
                            eml2.applVelocityHigh = BucketCollections[i].applVelHigh;
                            eml2.appVelocityLow = BucketCollections[i].applVelLow;
                            eml2.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            eml2.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(eml2);
                        }
                        if (bucketNumber === '3') {
                            const eml3 = new payloadBucket();
                            eml3.bucket = bucketNumber;
                            eml3.applVelocityHigh = BucketCollections[i].applVelHigh;
                            eml3.appVelocityLow = BucketCollections[i].applVelLow;
                            eml3.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            eml3.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(eml3);
                        }
                    }
                    return tempArr;
                }
                break;
            case 'DEFUN':
                if (!_.isUndefined(BucketCollections)) {
                    for (let i = 0; i < BucketCollections.length; i++) {
                        bucketNumber = BucketCollections[i].bucket;
                        if (bucketNumber === '0') {
                            const f0 = new payloadBucket();
                            f0.bucket = bucketNumber;
                            f0.applVelocityHigh = BucketCollections[i].applVelHigh;
                            f0.appVelocityLow = BucketCollections[i].applVelLow;
                            f0.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            f0.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(f0);
                        }
                        if (bucketNumber === '1') {
                            const fun1 = new payloadBucket();
                            fun1.bucket = bucketNumber;
                            fun1.applVelocityHigh = BucketCollections[i].applVelHigh;
                            fun1.appVelocityLow = BucketCollections[i].applVelLow;
                            fun1.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            fun1.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(fun1);
                        }
                        if (bucketNumber === '2') {
                            const fun3 = new payloadBucket();
                            fun3.bucket = bucketNumber;
                            fun3.applVelocityHigh = BucketCollections[i].applVelHigh;
                            fun3.appVelocityLow = BucketCollections[i].applVelLow;
                            fun3.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            fun3.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(fun3);
                        }
                        if (bucketNumber === '3') {
                            const fun4 = new payloadBucket();
                            fun4.bucket = bucketNumber;
                            fun4.applVelocityHigh = BucketCollections[i].applVelHigh;
                            fun4.appVelocityLow = BucketCollections[i].applVelLow;
                            fun4.appVelocityThreshold = BucketCollections[i].phoneNumber;
                            fun4.appVelocityThresholdAmt = BucketCollections[i].phoneNumberAmt;
                            tempArr.push(fun4);
                        }
                    }
                    return tempArr;
                }
                break;
            default:
                break;
        }
        tempArr.push(this.payloadBucketObj);
        return tempArr;
    }
    public getMsos(payload): Observable<any> {
        const serviceUrl = this.api + '/mo/pcs/threshold/mso';
        return this._http.post(serviceUrl, payload);
    }
    public saveThresholdData(thresholdFormData): Observable<any>{
        const _self = this;
        const body = _.isUndefined(thresholdFormData) ? null : thresholdFormData;
        const url = this.api + '/mo/pcs/threshold';
        return this._http.put(url, body)
            // .map(data => data.json());
    }
    public getThresholdData(formData): Observable<any> {
        const url = this.api + '/mo/pcs/getThresAndOpt';
        const body = formData;
        return this._http.post(url, body)
            // .map(data => data.json());
    }
    
    public getHierarchyRankings(icaBin: string, mso: string): Observable<any> {
        const url = this.api + '/mo/pcs/getHierarchyRankings';
        const body = {
            'icaBin': icaBin, // "9908"
            'mso': mso  // "TT"
        };
        return this._http.post(url, body)
            // .map(data => data.json());
    }
    /* JSON Format creation */
    public createBucket = (applVelo, bucket, applVelocityHigh, appVelocityLow, appVelocityThreshold, appVelocityThresholdAmt) => {
        const newBucket = new Bucket();
        newBucket.applVelo = applVelo;
        newBucket.bucket = bucket;
        newBucket.applVelocityHigh = applVelocityHigh;
        newBucket.appVelocityLow = appVelocityLow;
        newBucket.appVelocityThreshold = appVelocityThreshold;
        newBucket.appVelocityThresholdAmt = appVelocityThresholdAmt;
        return newBucket;
    }
    public createPcsThresholdFinalDataNode = (icaBin, mso,system, reponseCode, lastUpdatedUserId, loadTS, pcsThresholdBucketList) => {
        const pcsThresholdDataNode = new PcsThresholdFinalDataNode();
        pcsThresholdDataNode.icaBin = icaBin;
        pcsThresholdDataNode.mso = mso;
        pcsThresholdDataNode.system=system;
        pcsThresholdDataNode.reponseCode = reponseCode;
        pcsThresholdDataNode.lastUpdatedUserId = lastUpdatedUserId;
        pcsThresholdDataNode.loadTS = loadTS;
        pcsThresholdDataNode.pcsThresholdUuDataDto = pcsThresholdBucketList;
        return pcsThresholdDataNode;
    }
}
