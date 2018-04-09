import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../../userService';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss'],
  providers: [MessageService]
})
export class ViewOptionsComponent implements OnInit {
  filteredOptions: any[];
  switch = true;
  userservice = new UserService();
  msos: string[] = [];
  mso: string;
  msgs: Message[] = [];
  MOdata: any;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  constructor(
    private http: Http,
    // private messageService: MessageService
  ) { }
  ngOnInit() { }
  retrieve(value, icaBin, mso) {
    const div = document.getElementsByClassName('retrieve-data');
    div[value].classList.add('show');
    const body = { 'icaBin': icaBin, 'mso': mso };
    this.http.post('http://localhost:8082/mo/fetchMemberOption', body).subscribe(res => {
      const self = this;
      self.MOdata = res.json();
      self.userservice = res.json();
      self.switch = (self.userservice.nonBankcardMSO === '1') ? true : false;
    });
  }
  fetchMso(icaBin) {
    const body = { 'icaBin': icaBin };
    this.http.post('http://localhost:8082/mo/mso', body).subscribe(res => {
      this.msos = res.json();
    });
  }
  filterOptions(event) {
    this.filteredOptions = [];
    for (let i = 0; i < this.msos.length; i++) {
      const mso = this.msos[i];
      if (mso.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredOptions.push(mso);
      }
    }
  }
  // form submit
  onSubmit(data) {
    this.submitted = true;
    data['assocFlag'] = 'V';
    data['effectiveDate'] = '';
    data['loadTS'] = '';
    data['lastUpdateUserId'] = 'meghana';
    // this.data = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // let actionValue = "create";
    this.http.post('http://localhost:8082/mo/createMemberOption', JSON.stringify(data), options).subscribe(
      data => {
        this.showSuccess();
        console.log(data);
      },
      err => {
        this.showError();
      }
    );
    console.log(data);
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success!', detail: 'User updation successfull' });
  }
  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'User updation failed' });
  }
}
