import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import * as _ from 'underscore';
import { User } from '../_models/index';
import { Role } from '../_models/Role';
import { environment } from '../../environments/environment';
import { from } from 'rxjs/observable/from';
@Injectable()
export class AuthenticationService {
    public token: string;
    userModel = new User();
    roleModel = new Role();
    private api: string;
    constructor(private http: Http) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('id_token'));
        const currentUser = JSON.stringify(localStorage.getItem('id_token'));
        this.token = currentUser;
        this.api = environment.api;
    }
    getUserDefaultInfo(username: string): Observable<JSON> {
        const userName = _.isUndefined(username) ? false : username;
        let headerOption;
        console.log('user naeme received from login ' + userName);
        // return this.http.get('../assets/data/userinfo.json')
        // headerOption = this.api.getRequestOptions('application/json')
        return this.http.post(this.api + '/authenticate', username)
            .map((res: Response) =>
                res.json()
            );
    }
    login(username: string, password: string): Observable<boolean> {
        // get(service: String, action: String, data?: any, appendHeader: boolean = true)
        return this.http.post(this.api + '/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    loggedIn() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        // return tokenNotExpired(currentUserToken); ==> refer the actual format of jwt it should have 3 parts
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser === null || undefined) {
            return false;
        } else {
            return true;
        }
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
    }
}
