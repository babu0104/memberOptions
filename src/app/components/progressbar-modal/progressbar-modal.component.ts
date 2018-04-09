import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { AppGlobal } from '../../_constants/global.static';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'progressbarmodal',
  templateUrl: './progressbar-modal.component.html'
})
export class ProgressBarModalComponent {

  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;
  @Input() model: any;
  private apilogin: string;
  private userModel: any;
  _jwtHelper: JwtHelper = new JwtHelper();
  constructor(public activeModal: NgbActiveModal, private http: Http, private appGlobal: AppGlobal) {
    this.apilogin = environment.api;
  }
  callRefreshToken = (body): Observable<any> => {
    const url = this.apilogin + '/refreshToken';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(body), options).map((res) => {
        let data = res.json();
        return data;
    });
  }
  continue = () => {
    this.activeModal.close(null);
    const body = { 'userId': this.model.userId, 'refreshToken': this.model.refreshToken };
    return this.callRefreshToken(body).subscribe(data => {
        const result = data;
        this.model.authToken = result.accessToken;
        this.model.refreshToken = result.refreshToken;
        if (this.model.authToken && this.model.refreshToken) {
          const newTokenExpireDate = this._jwtHelper.getTokenExpirationDate(this.model.authToken);
          localStorage.setItem("authToken", this.model.authToken);
          localStorage.setItem('refreshToken', this.model.refreshToken);
        }
      },
      err => {
        console.log(err);
      }
    );

  }
  
  logout() {
    this.activeModal.close('logout');
  }
}