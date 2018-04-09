import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  msgs: Message[] = [];
  constructor() { }

  ngOnInit() {
  }
  login() {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'Your Password has been Changed' });
  }

}
