import { Component, OnInit, TemplateRef } from '@angular/core';
import {PickListModule} from 'primeng/primeng';
import { templateOptionProvider } from '../../_services/templateoptionprovider.serivce';


@Component({
  selector: 'app-group-administration',
  templateUrl: './group-administration.component.html',
  styleUrls: ['./group-administration.component.scss'],
  providers : [templateOptionProvider],
})
export class GroupAdministrationComponent implements OnInit {
  sourceOption: any [];
  targetOption: any [];
  constructor(private _templateOptionProvider: templateOptionProvider) { }

  ngOnInit() {
    setTimeout(() => {
      this.sourceOption = this._templateOptionProvider.getAllOptions();
      console.log(this.sourceOption);
    }, 1000);

    this.targetOption = [];
  }

}
