import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService, Auth_UserService } from '../_services/index';
import { User } from '../_models/user';
import { Role } from '../_models/Role';
import * as _ from 'underscore';

@Injectable()
export class AuthAnonymousGuard implements CanActivate {
    userModel = new User();
    roleModel = new Role();
    currentUserName: string;
    role: string;
    pages: any;
    flag: string;
    constructor(private router: Router, private auth: AuthenticationService, private userService: Auth_UserService) {
    }

    canActivate() {
        const authorisedUserModel = this.userService.getLoggedInUserDetails();
        if (this.auth.loggedIn()) {
            const _self = this;
            _self.router.navigate(['/home/ics-new']);
            // console.log('success');
            /*let _self = this;
            _self.userService.fetchPermittedPages(authorisedUserModel.role)
            .subscribe(result => {
                if (result) {
                    _self.router.navigate([ result[0].default ]);
                }
            });*/
        } else {
            return true;
        }
    }

}
