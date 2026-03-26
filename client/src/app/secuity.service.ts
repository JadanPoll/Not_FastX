import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";



@Injectable()
export class SecurityConfigService {
    subject = new ReplaySubject (1);
    subscribe (fn) {
        return this.subject.asObservable ().subscribe (fn);
    }
    next (d) {
        this.subject.next (d);
    }

}