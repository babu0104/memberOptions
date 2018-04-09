import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-connection',
  templateUrl: './view-connection.component.html',
  styleUrls: ['./view-connection.component.scss']
})
export class ViewConnectionComponent implements OnInit {
  check = false;
  checked = false;
  
  finalPartners = [];
  partnersForIteration = ['I', 'P', 'D', 'S', 'O', 'N'];
  allPartnersData = [];
  totalPartners = 6;
  
  api: string;
  submitted = false; // form not submited : default
  data: any; // this variable contains our data
  bidModified = false;
  binModified = false;
  zipcode: any = '';
  bofaxvalue: any = '';
  phonevalue: any = '';
  tcphonevalue: any = '';
  tcfaxvalue: any = '';
  bopmfaxvalue: any = '';
  bopmphonevalue: any = '';
  tcphoneno: any = '';
  tcfaxno: any = '';
  BIDchanged:any;
  phoneno:any;
  BINchanged:any;
  setZip:any;
  tempUser: any;
  icabins: string[] = [];
  filteredBins: any[];
  icabin: string;
  
  newBin = false;
  display = false;
  today = Date();
  lastModifiedOnBid: string;
  lastModifiedOnBin: string;
  constructor() { }
  ngOnInit() { }

}
