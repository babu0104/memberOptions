import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { AppGlobal } from '../../_constants/global.static';
import { Observable } from 'rxjs/Observable';
import { EventTargetInterruptSource, Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { AuthState } from '../../_models/authstate';
import { ModalService } from '../../_services/modal.service';
import { Util } from '../../util';
import { Router } from '@angular/router';

@Component({
  selector: 'logoff-modal-comp',
  templateUrl: './logoff-modal.component.html',
  providers: [Util]
})
export class LogoffModalComponent {
  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;
  @Input() model: any;
  private apilogin: string;
  private userModel: any;
  _jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router,
    public activeModal: NgbActiveModal, 
    private http: Http,
    private appGlobal: AppGlobal,
    private idle: Idle,
    private modalService: ModalService,
    private utilObject: Util) {
    this.apilogin = environment.api;
  }
  logout() {
    this.activeModal.close('logout');
    this.idle.stop();
    this.idle.onTimeout.observers.length = 0;
    this.idle.onIdleStart.observers.length = 0;
    this.idle.onIdleEnd.observers.length = 0;
    AuthState.isLoggedIn = false;
    const userId = localStorage.getItem('currentUser');
    const body = { 'userId': userId };
    this.modalService.logout(body).subscribe(data => {
        this.utilObject.clearLocalStorage();
        this.router.navigate(['']);
      },
      err => {
        console.log('error' + err);
      }
    );
  }
}