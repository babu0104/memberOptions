import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../_services/contacts.service';
import { User } from '../../user';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { RequestMethod } from '@angular/http/src/enums';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss'],
  providers: [MessageService, ContactsService]
})
export class ViewContactsComponent implements OnInit {
  bidModified = false;
  binModified = false;
  zipcode: any = '';
  bofaxvalue: any = '';
  phonevalue: any = '';
  tcphonevalue: any = '';
  tcfaxvalue: any = '';
  phoneno:any;
  tcphoneno: any;
  user = new User();
  tempUser: any;
  icabins: string[] = [];
  filteredBins: any[];
  icabin: string;
  BINchanged: any;
  BIDchanged: any;
  setZip: any;
  tcfaxno: any;
  bofaxno: any;
  msgs: Message[] = [];
  constructor(
    private contactsService: ContactsService,
    private http: Http,
    private messageService: MessageService
  ) { }
  ngOnInit() { }
  saveContact() {}
  cancelContact() {}
  fetchBin(user) {}
  filterBins(user) {}
  fetchContact(user,user1) {}
}
 