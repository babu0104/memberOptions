import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-memberoptions-home',
  templateUrl: './memberoptions-home.component.html',
  styleUrls: ['./memberoptions-home.component.scss']
})
export class MemberOptionsHomeComponent implements OnInit {
  constructor(private router: Router, private App: AppComponent) { }
  ngOnInit() { }
  onTabOpen = (e) => {
    const index = e.index;
    if (index === 0) {
      this.App.displayloader();
      this.router.navigateByUrl('home/ics-new');
      this.App.hideloader();
    } else if (index === 1) {
      this.App.displayloader();
      this.router.navigateByUrl('home/pcs-new');
      this.App.hideloader();
    } else if (index === 2) {
      this.App.displayloader();
      this.router.navigateByUrl('home/prescreen-new');
      this.App.hideloader();
    } else if (index === 3) {
      this.App.displayloader();
      this.router.navigateByUrl('home/change-password');
      this.App.hideloader();
    }
  }
}
