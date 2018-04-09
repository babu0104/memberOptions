import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class templateOptionProvider {
    Source: any[];
    responseObject: object = {};

    constructor( ) { }

    getAllOptions() {
        // The Actual Service call goes here
        this.Source = [
                                { name : 'Super Admin', id : '123' , value : 'super_admin'},
                                { name : 'Site Admin', id : '123' , value : 'site_admin'},
                                { name : 'ICS Member Options Change Tracking', id : '123' , value : 'ics_tracking'},
                                { name : 'BNS Member Options Change Tracking', id : '123' , value : 'bns_tracking'},
                                { name : 'ICS Member Options View', id : '123' , value : 'ics_view'},
                                { name : 'ICS Member Options Update', id : '123' , value : 'ics_update'},
                                { name : 'BNS Member Options View', id : '123' , value : 'bns_view'},
                                { name : 'BNS Member Options Update', id : '123' , value : 'bns_update'},
                                { name : 'Prescreen View', id : '123' , value : 'prescreen_view'},
                                { name : 'Prescreen Update', id : '123' , value : 'prescreen_update'},
                                { name : 'Prescreen Change Tracking', id : '123' , value : 'prescreen_tracking'},

                            ];
        return this.Source;



    }
}
