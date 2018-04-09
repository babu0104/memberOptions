import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { AuthenticationService, Auth_UserService } from '../app/_services/index';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { HeaderComponent } from '../app/shared/header/header.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  isUserPresent: any;
  loading = false;
  _jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router, private userService: Auth_UserService, private headerComponent: HeaderComponent) {
  }
  ngOnInit() {
    const authorisedUserModel = this.userService.getLoggedInUserDetails();
    if (authorisedUserModel.isAuthenticated == true) {
      const isaccesstokenexpired = this._jwtHelper.isTokenExpired(authorisedUserModel.authToken);
      const isrefreshtokenexpired = this._jwtHelper.isTokenExpired(authorisedUserModel.refreshToken);
      console.log(isaccesstokenexpired + "-" + isrefreshtokenexpired);
      if (isaccesstokenexpired != true && isrefreshtokenexpired != true) {
        //For Access token
        const expireDate = this._jwtHelper.getTokenExpirationDate(authorisedUserModel.authToken);
        const timeDifference = this.userService.getTimeDifference(expireDate);
        //For Refresh token
        const refreshTokenExpireDate = this._jwtHelper.getTokenExpirationDate(authorisedUserModel.refreshToken);
        const msRefreshToken = this.userService.getTimeDifference(refreshTokenExpireDate);

        this.userService.logoutOnRefreshTokenExpire(msRefreshToken);
        this.userService.accessTokenSetInterval(authorisedUserModel.authToken, authorisedUserModel.refreshToken, authorisedUserModel, timeDifference);
        this.userService.showGrowl(msRefreshToken);
      }
      else {
        this.headerComponent.signOut();
      }
    }
  }
  public isLoggedIn = (): boolean => {
    const currentUser = localStorage.getItem('currentUser');
    if (_.isNull(currentUser) || _.isUndefined(currentUser)) {
      this.isUserPresent = 'main-wrapper';
    } else {
      this.isUserPresent = 'loggedin';
    }
    return this.isUserPresent;
  }
  displayloader = () => {
    this.loading = true;
  }
  hideloader = () => {
    this.loading = false;
  }
}
