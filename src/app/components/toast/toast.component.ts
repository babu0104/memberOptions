// Copyright (C) 2016-2017 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg

import { Component, AfterViewInit } from '@angular/core';

import { Subject, Observable, Subscription } from 'rxjs/Rx';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ToastCommunicationService } from '../../_services/toast.service';

@Component({
    selector: 'demo-toast',
    template: ''
})
export class ToastComponent implements AfterViewInit {
    themes = [
        { name: 'Default Theme', code: 'default' }, 
        { name: 'Material Design', code: 'material' }, 
        { name: 'Bootstrap 3',code: 'bootstrap' }
    ];

    types = [
        { name: 'Default', code: 'default' }, 
        { name: 'Info', code: 'info' }, 
        { name: 'Success', code: 'success' }, 
        { name: 'Wait', code: 'wait' }, 
        { name: 'Error', code: 'error' }, 
        { name: 'Warning', code: 'warning'}
    ];

    positions = [
      { name: 'Top Left', code: 'top-left' }, 
      { name: 'Top Center', code: 'top-center' }, 
      { name: 'Top Right', code: 'top-right' }, 
      { name: 'Bottom Left', code: 'bottom-left' }, 
      { name: 'Bottom Center', code: 'bottom-center' }, 
      { name: 'Bottom Right', code: 'bottom-right' }, 
      { name: 'Center Center', code: 'center-center'}
    ];

    position: string = this.positions[2].code;
    
    

    options = {
        title: 'Toast It!',
        msg: 'Mmmm, tasties...',
        showClose: false,
        timeout: 10000,
        theme: this.themes[0].code,
        type: this.types[5].code
    };

    getTitle(num: number): string {
        return 'Your session will expire in: ' + num +' seconds';
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }

    constructor(private toastyService: ToastyService, private toastCommunicationService: ToastCommunicationService) { 
        this.toastCommunicationService.setPosition(this.position);
    }
    
    ngAfterViewInit() {
      //this.newCountdownToast();
      // this._toastyConfig.theme = 'bootstrap';
      let toastOptions: ToastOptions = {
        title: 'title',
        msg: 'my message',
        showClose: true,
        timeout: 15000,
        theme: "bootstrap",
        onAdd: (toast: ToastData) => {
          console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
          console.log('Toast ' + toast.id + ' has been removed!');
        }
      };
      //this.toastyService.success(toastOptions);
    }


    newCountdownToast(duration) {
        return new Promise((resolve, reject) => {
            let interval = 1000;
            let seconds = duration / 1000;
            let subscription: Subscription;
            let toastOptions: ToastOptions = {
                title: this.getTitle(seconds || 0),
                showClose: false,
                timeout: duration,
                theme: this.options.theme,
                onAdd: (toast: ToastData) => {
                    console.log('Toast ' + toast.id + ' has been added!');
                    // Run the timer with 1 second iterval
                    let observable = Observable.interval(interval).take(seconds);
                    // Start listen seconds bit
                    subscription = observable.subscribe((count: number) => {
                        // Update title
                        toast.title = this.getTitle(seconds - count - 1 || 0);
                        // Update message
                        //toast.msg = this.getMessage(seconds - count - 1 || 0);
                    });
    
                },
                onRemove: function(toast: ToastData) {
                    console.log('Toast ' + toast.id + ' has been removed!');
                    // Stop listenning
                    subscription.unsubscribe();
                }
            };
    
            switch (this.options.type) {
                case 'default': this.toastyService.default(toastOptions); break;
                case 'info': this.toastyService.info(toastOptions); break;
                case 'success': this.toastyService.success(toastOptions); break;
                case 'wait': this.toastyService.wait(toastOptions); break;
                case 'error': this.toastyService.error(toastOptions); break;
                case 'warning': this.toastyService.warning(toastOptions); break;
            }
        });
        
    }

    clearToasties() {
        this.toastyService.clearAll();
    } 

}
