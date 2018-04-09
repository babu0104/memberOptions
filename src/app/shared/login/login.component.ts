import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { AuthenticationService, Auth_UserService } from '../../_services/index';
import * as _ from 'underscore';
import { AuthState } from '../../_models/authstate';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = new User();
  authState: AuthState;
  userName: any;
  error = '';
  loading = false;
  constructor(private router: Router, private userService: Auth_UserService, private App: AppComponent) { }
/*login(){
  this.router.navigateByUrl('home/ics-new');
}*/
  ngOnInit() {
  }
  login() {
    const _self = this;
    _self.App.displayloader();
      // let loginactive;
    // service to get username , pwd
      this.userService.validateUser(this.model.userName, this.model.password)
      .subscribe(result => {
        if (result.isAuthenticated === true) {
          _self.App.hideloader();
            _self.router.navigate(['home/ics-new']);
        } else {
          _self.App.hideloader();
          this.error = 'Invalid UserName or Password';
        }
      });
  }
}
