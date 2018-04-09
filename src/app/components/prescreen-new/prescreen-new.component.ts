import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileSelectionComponent } from '../../components/file-selection/file-selection.component';
import { DataElementsComponent } from '../../components/data-elements/data-elements.component';
import { AreacodeSelectionComponent } from '../../components/areacode-selection/areacode-selection.component';
import { ScfSelectionComponent } from '../../components/scf-selection/scf-selection.component';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-prescreen',
  templateUrl: './prescreen-new.component.html',
  styleUrls: ['./prescreen-new.component.scss']
})
export class PrescreenComponent implements OnInit {
  @ViewChild(FileSelectionComponent) FileSelectionComponent: FileSelectionComponent;
  @ViewChild(DataElementsComponent) DataElement: DataElementsComponent;
  @ViewChild(AreacodeSelectionComponent) AreaCode: AreacodeSelectionComponent;
  @ViewChild(ScfSelectionComponent) ScfSection: ScfSelectionComponent;
  dataForRetrieveingDataElement: any;
  constructor() { }
  getDataToRetrieve(data) {
    this.dataForRetrieveingDataElement = data;
  }
  ngOnInit() {
  }
  handleChange(e) {
    window.scrollTo(0, 0); // scroll back to top
    const _self = this;
    const index = e.index;
    if (index === 1) {
      _self.DataElement.getData();
    }
    if (index === 2) {
      _self.AreaCode.getData();
    }
    if (index === 3) {
      _self.ScfSection.getData();
    }
  }
}
