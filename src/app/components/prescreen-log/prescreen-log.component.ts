import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescreen-log',
  templateUrl: './prescreen-log.component.html',
  styleUrls: ['./prescreen-log.component.scss']
})
export class PrescreenLogComponent implements OnInit {
  totalRecords:any;
  value:any;
  cars: any[];
  constructor() { }

  ngOnInit() {
  }

}
