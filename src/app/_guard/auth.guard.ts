import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthenticationService, Auth_UserService } from '../_services/index';
import { User } from '../_models/user';
import { Role } from '../_models/Role';
import * as _ from 'underscore';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { HeaderComponent } from '../shared/header/header.component';

@Injectable()
export class AuthGuard implements CanActivateChild {
    userModel = new User();
    roleModel = new Role();
    role: string;
    currentUserName: string;
    _jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router, private auth: AuthenticationService, private userService: Auth_UserService, private headerComponent: HeaderComponent) { }
    canActivateChild = () => {
        const authorisedUserModel = this.userService.getLoggedInUserDetails();
        if (authorisedUserModel.isAuthenticated == true) {
            const isaccesstokenexpired = this._jwtHelper.isTokenExpired(authorisedUserModel.authToken);
            const isrefreshtokenexpired = this._jwtHelper.isTokenExpired(authorisedUserModel.refreshToken);
            if (isaccesstokenexpired != true && isrefreshtokenexpired != true)
                return true;
            else {
                this.headerComponent.signOut();
                return false;
            }

        } else {
            // not logged authenticated, redirect to login page
            //this.router.navigate(['']);
            this.headerComponent.signOut();
            return false;
        }
    }
    getToken = () => {
        return localStorage.getItem("authToken");
    }




}
