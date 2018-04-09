import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { OptionsComponent } from '../../components/options/options.component';
import { ThresholdComponent } from '../../components/threshold/threshold.component';
import { AlertsInvalidsComponent } from '../../components/alerts-invalids/alerts-invalids.component';
import { RetroThresholdComponent } from '../../components/retro-threshold/retro-threshold.component';
import { ConnectionComponent } from '../../components/connection/connection.component';
import { DOCUMENT } from '@angular/platform-browser';
import * as _ from 'underscore';
import { inject } from '@angular/core/testing';
declare var $: any;
@Component({
  selector: 'app-ics-new',
  templateUrl: './ics-new.component.html',
  styleUrls: ['./ics-new.component.scss']
})
export class IcsNewComponent implements OnInit {
  @ViewChild(ContactsComponent) Contacts: ContactsComponent;
  @ViewChild(OptionsComponent) Options: OptionsComponent;
  @ViewChild(AlertsInvalidsComponent) Alert: AlertsInvalidsComponent;
  @ViewChild(ThresholdComponent) Threshold: ThresholdComponent;
  @ViewChild(RetroThresholdComponent) RetroThreshold: RetroThresholdComponent;
  @ViewChild(ConnectionComponent) Connection: ConnectionComponent;
  globalBin: string;
  constructor() { }
  changeGlobalBin(bin) {
    this.globalBin = bin;
  }
  handleChange(e) {
    window.scrollTo(0, 0); // scroll back to top
    const _self = this;
    const index = e.index;
    if (index === 0) {
      _self.Contacts.getData();
    } else if (index === 1) {
      _self.Options.getData();
    } else if (index === 2) {
      _self.Threshold.getData();
    } else if (index === 3) {
      _self.RetroThreshold.getData();
    } else if (index === 4) {
      _self.Alert.getData();
    } else if (index === 5) {
      _self.Connection.getData();
    }
  }
  ngOnInit() { }
}
