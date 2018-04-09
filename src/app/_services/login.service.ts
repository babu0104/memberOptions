import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
//import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
import { Role } from '../_models/Role';
import { environment } from '../../environments/environment';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { HeaderComponent } from '../shared/header/header.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppGlobal } from '../_constants/global.static';
import { setInterval, clearInterval } from 'timers';
import 'rxjs/add/observable/interval';
import { ModalService } from '../_services/modal.service';
import { LogoffModalComponent } from '../components/logoff-modal/logoff-modal.component';
import { ToastComponent } from '../components/toast/toast.component';



@Injectable()
export class Auth_UserService {
    userModel: User;
    roleModel = new Role();
    public token: string;
    public role: string;
    private subject = new Subject<boolean>();
    private api: string;
    private apilogin: string;
    private subscription;
    message: any;
    _jwtHelper: JwtHelper = new JwtHelper();
    constructor(
        private http: Http,
        private _http: HttpClient,
        private _header: HeaderComponent,
        private idle: Idle,
        private keepalive: Keepalive,
        private appGlobal: AppGlobal,
        private modalService: ModalService,
        private toastComponent: ToastComponent
    ) {
        this.userModel = new User();
        this.api = environment.api;
        this.apilogin = environment.api;


        //this.apirefreshToken = environment.refreshTokenURL;
    }
    getUserDefaultInfoTest(username: string): Observable<JSON> {
        const userName = !_.isUndefined(username) ? username : '';
        let headerOption;
        return this.http.get('../assets/data/userinfo.json')
            // headerOption = this.api.getRequestOptions('application/json')
            // return this.http.post('/api/authenticate', username)
            .map((res: Response) =>
                res.json()
            );
    }
    getURLMapping(): Observable<JSON> {
        return this.http.get('../assets/data/app.urlmap.json')
            .map((res: Response) => res.json());
    }
    validateUser = (username, password): Observable<User> => {
        const _self = this;
        const encryptUserName = btoa(username);
        const encryptPwd = btoa(password);
        const IdleTime: any = "";

        return this.http.post(this.apilogin + '/login', JSON.stringify({ username: username, password: password }))
            // return this.http.post('http://localhost:8083/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                //debugger;
                //console.log('test'+response);

                const token = response.status === 200 && response.headers.get('accessToken');
                const refreshToken = response.status === 200 && response.headers.get('refreshToken');
                if (token && refreshToken) {
                    this.userModel.authToken = token;
                    this.userModel.refreshToken = refreshToken;
                    //For Access token
                    const decodedToken = this._jwtHelper.decodeToken(token);
                    const accessTokenExpireDate = this._jwtHelper.getTokenExpirationDate(token);
                    console.log(accessTokenExpireDate);
                    const isexpired = this._jwtHelper.isTokenExpired(token);
                    //For Refresh Token
                    const decodedRefreshToken = this._jwtHelper.decodeToken(refreshToken);
                    const refreshTokenExpireDate = this._jwtHelper.getTokenExpirationDate(refreshToken);
                    const refrshTokenIsExpired = this._jwtHelper.isTokenExpired(refreshToken);

                    const msRefreshToken = this.getTimeDifference(refreshTokenExpireDate);
                    // const refreshTokenInSecs = Math.floor(msRefreshToken / 1000); 
                    //console.log(refreshTokenInSecs + " refreshTokenInSecs");

                    this.userModel.userId = (decodedToken.sub != '') ? decodedToken.sub : username;
                    this.userModel.role = _.isNull(decodedToken.scopes[0]) ? '' : decodedToken.scopes[0].authority;
                    this.userModel.isAuthenticated = true;
                    // this.util.setRoleLable(this.userModel.role);
                    const accessTokenMillSeconds = this.getTimeDifference(accessTokenExpireDate);
                    console.log(accessTokenMillSeconds);
                    const accessTokenSeconds = accessTokenMillSeconds / 1000;
                    console.log(accessTokenSeconds + " accessTokenSeconds");
                    this.appGlobal.DEFAULT_IDLE_TIME = accessTokenSeconds;
                    this.setLoggedInUserDetails(username, this.userModel.role, this.userModel.authToken, this.appGlobal.DEFAULT_IDLE_TIME, this.userModel.refreshToken, this.userModel.isAuthenticated);
                    this._header.watchSession(this.idle, this.keepalive, this.appGlobal.DEFAULT_IDLE_TIME, this.userModel);
                    // set default Interval time to get new token 
                    this.logoutOnRefreshTokenExpire(msRefreshToken);
                    this.accessTokenSetInterval(token, refreshToken, this.userModel, accessTokenMillSeconds);
                    this.showGrowl(msRefreshToken);
                    return this.userModel;
                } else {
                    this.userModel.isAuthenticated = false;
                    this.userModel.authToken = null;
                    this.userModel.refreshToken = null;
                    return this.userModel;
                }
            });
    }
    showGrowl = (milliSeconds) => {
        let _self = this;
        const duration = 60000;
        setTimeout(function () {
            var isPopupShown = document.getElementsByClassName("custom-show");
            if (isPopupShown.length == 0 && _self._header.isLoggedIn()) {
                _self.toastComponent.newCountdownToast(duration).then(res => _self.logoutOnRefreshTokenExpire(milliSeconds));
            }
        }, (milliSeconds - duration));
    }
    // startTimer=(duration, display)=> {
    //     var timer = duration, minutes, seconds;
    //     setInterval(function () {
    //         minutes = parseInt(timer / 60, 10)
    //         seconds = parseInt(timer % 60, 10);

    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;

    //         display.textContent = minutes + ":" + seconds;

    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000);
    // }
    logoutOnRefreshTokenExpire = (milliSeconds) => {
        //debugger;
        let _self = this;
        setTimeout(() => {
            this.idle.stop();
            this.idle.onTimeout.observers.length = 0;
            this.idle.onIdleStart.observers.length = 0;
            this.idle.onIdleEnd.observers.length = 0;
            this.idle.onTimeoutWarning.observers.length = 0;
            var isPopupShown = document.getElementsByClassName("custom-show");
            if (isPopupShown.length != 0){ 
                this._header.closeProgressForm();
            }
            this.modalService.open(LogoffModalComponent, {
                backdrop: 'static',
                keyboard: false
            });
        }, milliSeconds);
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
    accessTokenSetInterval = (authToken, refreshToken, model, timeStamp): any => {
        let _self = this;
        setTimeout(() => {
            var isPopupShown = document.getElementsByClassName("custom-show");
            // _self._header.isLoggedIn();
            //const isAuthenticated = localStorage.getItem('isAuthenticated');            
            if (isPopupShown.length == 0 && _self._header.isLoggedIn()) {
                const url = _self.apilogin + '/refreshToken';
                const body = { 'userId': model.userId, 'refreshToken': refreshToken };
                return this.callRefreshToken(body).subscribe(
                    data => {
                        const result = data;
                        model.authToken = result.accessToken;
                        model.refreshToken = result.refreshToken;
                        if (model.authToken && model.refreshToken) {
                            const newTokenExpireDate = _self._jwtHelper.getTokenExpirationDate(model.authToken);
                            localStorage.setItem("authToken", model.authToken);
                            localStorage.setItem('refreshToken', model.refreshToken);
                            let newTokenExpireTime = _self.getTimeDifference(newTokenExpireDate);
                            const calcSecs = newTokenExpireTime / 1000;
                            _self.appGlobal.DEFAULT_IDLE_TIME = calcSecs;
                            localStorage.setItem('idleTime', _self.appGlobal.DEFAULT_IDLE_TIME);
                            _self.accessTokenSetInterval(model.authToken, model.refreshToken, model, newTokenExpireTime);
                        }
                    },
                    err => {
                    }
                );
            }
        }, 60000);
    }
    getTimeDifference = (expireDate: Date) => {
        let r = expireDate.getTime() - (new Date().getTime());// - dateObj.getTime()); //- dateObj.getTime()
        return r;
    }
    // getRefreshTokenTimeDifference = (refreshTokenExpireDate: Date) => {
    //     let dateObj = new Date();
    //     let counter = Math.ceil(refreshTokenExpireDate.getTime());
    //     return counter;
    // }
    setLoggedInUserDetails = (username, role, token, defaultIdleTime, refreshToken, isAuthenticated) => {
        const _self = this;
        const encryptedRole = btoa(role);
        localStorage.setItem('currentUser', username);
        localStorage.setItem('role', encryptedRole);
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('idleTime', defaultIdleTime);
        return true;
    }
    getLoggedInUserDetails = () => {
        const _self = this;
        const validUserModel = new User(); // new instance for successful logedin user
        validUserModel.clear(); // rest the model
        const decryptedRole = atob(localStorage.getItem('role'));
        validUserModel.userId = localStorage.getItem('currentUser');
        validUserModel.userName = localStorage.getItem('currentUser');
        validUserModel.authToken = localStorage.getItem('authToken');
        validUserModel.refreshToken = localStorage.getItem('refreshToken');
        validUserModel.isAuthenticated = new Boolean(localStorage.getItem('isAuthenticated')); // typecast string boolean to actual boolean
        validUserModel.role = decryptedRole;
        return validUserModel;
    }
    fetchRole(): Observable<any> {
        return this.http.get('../assets/data/user-role.json')
            .map((res: Response) => res.json());
    }
    fetchPages(role: string): Observable<any> {
        return this.http.get('../assets/data/app.urlmap.json')
            .map((res) => {
                const data = res.json();
                const result = [];
                Object.keys(data).forEach(key => {
                    if (data[key].role === role) {
                        result.push(data[key]);
                    }
                });
                return result;
            });
    }
    isUserNameExist() {
        const userName = localStorage.getItem('userName');
        if (_.isUndefined(userName) || _.isNull(userName)) {
            return false;
        } else {
            return true;
        }
    }
    setUserNameStatus(message: string) {
        // this.subject.next({ text: message });
    }
    getUserNameStatus(): Observable<any> {
        return this.subject.asObservable();
    }
    fetchPermittedPages(role: string): Observable<Array<any>> {
        return this.http.get('/assets/data/app.urlmap.json')
            .map((res) => {
                const data = res.json();
                const result = [];
                Object.keys(data).forEach(key => {
                    if (data[key].role === role) {
                        result.push(data[key]);
                    }
                });
                return result;
            });
    }

}
