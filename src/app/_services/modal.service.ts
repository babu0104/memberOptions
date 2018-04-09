import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
    private apilogin: string;
    constructor(private ngbModal: NgbModal, private http: Http) {
        this.apilogin = environment.api;
    }

    open(content: any, config?: any) {

        let modal = this.ngbModal.open(content, config)
        let instance = (modal as any)._windowCmptRef.instance
        // setImmediate(() => {
        instance.windowClass = 'custom-show'
        // })

        let fx = (modal as any)._removeModalElements.bind(modal);
        (modal as any)._removeModalElements = () => {
            instance.windowClass = ''
            setTimeout(fx, 250)
        }

        return modal
    }
    logout(body): Observable<any> {
        const url = this.apilogin + '/userLogout';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, JSON.stringify(body), options).map((res) => {
            let data = res.json();
            return data;
        });
    }
    
}