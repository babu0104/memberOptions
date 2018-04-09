import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import {SecuritylogService} from '../../_services/securitylog.service';
export interface Car {
  userid?;
  tablename?;
  recordkey?;
  timestamp?;
  description?;
  action?;
}
@Component({
  selector: 'app-security-log',
  templateUrl: './security-log.component.html',
  styleUrls: ['./security-log.component.scss']
})
export class SecurityLogComponent implements OnInit {
  cars: Car[];
  totalRecords:any;
  value:any;
  // loading: boolean;
      cols: any[];
  constructor(private securitylogService: SecuritylogService) { }
  ngOnInit() {
    // this.loading = true;
    setTimeout(() => {
      this.securitylogService.getCarsSmall().then(cars => this.cars = cars);
      // this.loading = false;
  }, 1000);
    this.cols = [
      {field: 'userid', header: 'User ID'},
      {field: 'tablename', header: 'Table Name'},
      {field: 'recordkey', header: 'Record Key'},
      {field: 'timestamp', header: 'Timestamp'},
      {field: 'description', header: 'Description'},
      {field: 'action', header: 'Action'}
    ];
  }
}
