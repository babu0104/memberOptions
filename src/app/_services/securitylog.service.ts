import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../components/security-log/security-log.component';

@Injectable()
export class SecuritylogService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {
    return this.http.get<any>('./././assets/data/securitylog.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => data);
    }


}
