import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { Util } from '../../util';
import { Router } from '@angular/router';
import { AuthState } from '../../_models/authstate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { Keepalive } from '@ng-idle/keepalive';
import { ProgressBarModalComponent } from '../../components/progressbar-modal/progressbar-modal.component';
import { EventTargetInterruptSource, Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { ModalService } from '../../_services/modal.service';
import { AppGlobal } from '../../_constants/global.static';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from 'environments/environment';
import { ToastCommunicationService } from '../../_services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Util,ToastCommunicationService]
})
export class HeaderComponent implements OnInit {
  authState: AuthState;
  isUserPresent: boolean;
  public token: string;
  idleState = 'NOT_STARTED';
  timedOut = false;
  lastPing?: Date = null;
  progressBarPopup: NgbModalRef;
  logoImage: any = "../assets/ICS/visa_logo.png";
  stopRefreshTokenSetInterval = false;
  private apilogin: string;
  toastyComponentPosition: string;

  constructor(
    private router: Router,
    private utilObject: Util,
    private idle: Idle,
    private keepalive: Keepalive,
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private appGlobal: AppGlobal,
    private toastCommunicationService: ToastCommunicationService
  ) {
    this.apilogin = environment.api;
    this.toastCommunicationService.position$.subscribe(pos => this.toastyComponentPosition = pos); 
  }
  ngOnInit() {
    //const param = localStorage.getItem("idleTime");
    //console.log('refresh called');

    //this.appGlobal.DEFAULT_IDLE_TIME= (!_.isUndefined(param) && !_.isNull(param)) ? param :'';
    //this.appGlobal.DEFAULT_IDLE_TIME=29;
       
    if (localStorage.getItem("authToken") != null)
      this.watchSession(this.idle, this.keepalive, this.appGlobal.DEFAULT_IDLE_TIME, {});
  }
  public watchSession = (idle, keepalive, time, usermodel) => {
    //console.log(time);
    if (localStorage.getItem("authToken") != null && (localStorage.getItem("authToken").length) > 0) {
      console.log('Idle called');
      // sets an idle timeout of 15 minutes. idle time for user
      idle.setIdle(time); //time for idle state
      // sets a timeout period of 5 minutes.
      idle.setTimeout(15); //from count down to show in warning popup
      // sets the interrupts like Keydown, scroll, mouse wheel, mouse down, and etc
      let wrapper = document.getElementById('wrapper');
      idle.setInterrupts([new EventTargetInterruptSource(wrapper, 'keydown keypress keydown DOMMouseScroll mouseover mousewheel mousedown mouseenter touchstart touchmove scroll wheel resize')]);
      //idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'NO_LONGER_IDLE';
      });

      idle.onTimeout.subscribe(() => {
        this.idleState = 'Your session has expired. Click Refresh to continue';
        this.timedOut = true;
        //this.closeProgressForm();
      });

      idle.onIdleStart.subscribe((result) => {
        //this.idleState = 'IDLE_START',
        this.openProgressForm(10);
      });

      idle.onTimeoutWarning.subscribe((countdown: any) => {
        this.idleState = 'IDLE_TIME_IN_PROGRESS';
        this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
        this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
        this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
        this.progressBarPopup.componentInstance.countSeconds = countdown % 60;
        this.progressBarPopup.componentInstance.model = usermodel;
      });
      keepalive.interval(15);
      this.reset();
    }
  }
  ngOnDestroy() {
    this.resetTimeOut();

  }
  reverseNumber = (countdown: number) => {
    return (300 - (countdown - 1));
  }

  reset = () => {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  openProgressForm = (count: number) => {
    this.progressBarPopup = this.modalService.open(ProgressBarModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
    this.progressBarPopup.componentInstance.count = count;
    this.progressBarPopup.result.then((result: any) => {
      if (result !== '' && 'logout' === result) {
        this.logout();
      } else {
        this.reset();
      }
    });
  }
  logout = () => {
    this.resetTimeOut();
  }
  closeProgressForm = () => {
    this.progressBarPopup.close();
    //this.signOut();
  }

  resetTimeOut = () => {
    this.signOut();
  }

  public signOut = () => {
    this.idle.stop();
    this.idle.onTimeout.observers.length = 0;
    this.idle.onIdleStart.observers.length = 0;
    this.idle.onIdleEnd.observers.length = 0;
    this.idle.onTimeoutWarning.observers.length = 0;
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
  public isLoggedIn = (): boolean => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (_.isNull(isAuthenticated) || _.isUndefined(isAuthenticated)) {
      this.isUserPresent = false;
    } else {
      this.isUserPresent = true;
    }
    return this.isUserPresent;
  }
}
