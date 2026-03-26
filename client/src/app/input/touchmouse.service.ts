import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";



@Injectable()
export class TouchMouseService {
    subject = new ReplaySubject (1);
    subscribe (fn) {
        return this.subject.asObservable ().subscribe (fn);
    }
    update (pos) {
        this.subject.next (pos);
    }
}