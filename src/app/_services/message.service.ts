import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private newSubject = new Subject<any>();
    sendMessage(message: boolean) {
        this.subject.next({ text: message });
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
}
