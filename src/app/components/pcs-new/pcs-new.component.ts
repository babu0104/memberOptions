import { Component, OnInit, ViewChild } from '@angular/core';
import { PcsContactComponent } from '../../components/pcs-contact/pcs-contact.component';
import { PcsOptionsComponent } from '../../components/pcs-options/pcs-options.component';
import { PcsThresholdComponent } from '../../components/pcs-threshold/pcs-threshold.component';
import { PcsAlertsInvalidsComponent } from '../../components/pcs-alerts-invalids/pcs-alerts-invalids.component';
import { PcsHeirarchyComponent } from '../../components/pcs-heirarchy/pcs-heirarchy.component';
import { PcsConnectionComponent } from '../../components/pcs-connection/pcs-connection.component';
import { PcsHierarchy } from '../../_models/pcshierarchy/pcshierarchy';

import * as _ from 'underscore';
@Component({
  selector: 'app-pcs-new',
  templateUrl: './pcs-new.component.html',
  styleUrls: ['./pcs-new.component.scss']
})
export class PcsNewComponent implements OnInit {
  pcshierarchy = new PcsHierarchy();
  @ViewChild(PcsContactComponent) PcsContact: PcsContactComponent;
  @ViewChild(PcsOptionsComponent) PcsOptions: PcsOptionsComponent;
  @ViewChild(PcsAlertsInvalidsComponent) PcsAlert: PcsAlertsInvalidsComponent;
  @ViewChild(PcsThresholdComponent) PcsThreshold: PcsThresholdComponent;
  @ViewChild(PcsHeirarchyComponent) PcsHeirarchy: PcsHeirarchyComponent;
  @ViewChild(PcsConnectionComponent) PcsConnection: PcsConnectionComponent;

  globalBin: string;
  constructor() {
  }
  changeGlobalBin(bin) {
    this.globalBin = bin;
  }
  handleChange(e) {
    window.scrollTo(0, 0); // scroll back to top
    const _self = this;
    const index = e.index;
    if (index === 0) {
      _self.PcsContact.getBin();
    } else if (index === 1) {
      _self.PcsOptions.getBin();
    } else if (index === 2) {
      _self.PcsThreshold.getBin();
    } else if (index === 3) {
      _self.PcsAlert.getBin();
    } else if (index === 4) {
      _self.PcsHeirarchy.getBin();

    } else if (index === 5) {
      _self.PcsConnection.getBin();
    }
  }
  ngOnInit() {
  }
}
