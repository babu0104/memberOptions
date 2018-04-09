import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-alerts-invalids',
  templateUrl: './view-alerts-invalids.component.html',
  styleUrls: ['./view-alerts-invalids.component.scss']
})
export class ViewAlertsInvalidsComponent implements OnInit {
  nonBankcard: string;
  SSNalerts: any[];
  SSNinvalids: any[];
  Addressalerts: any[];
  Addressinvalids: any[];
  Phonealerts: any[];
  Phoneinvalids: any[];
  defaultMso = 0;
  ssnAlerts: any;
  ssnInvalids: any;
  addrAlerts: any;
  addrInvalids: any;
  phoneAlerts: any;
  phoneInvalids: any;
  filteredOptions: any[];
  
  MOAlertData: string[] = [];
  msos: string[] = [];
  mso: string;
  
  api: string;
  submitted = false; 
  constructor() { }
  ngOnInit() {
  }
}
