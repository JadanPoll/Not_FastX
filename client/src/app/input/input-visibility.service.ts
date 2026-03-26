import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { TouchService } from '../screen/touch.service';



@Injectable()
export class InputVisibilityService {
    private touch;
    constructor (private ts: TouchService) {
        let t = this.ts.subscribe ((t) => {
            this.touch = t;
            this.input = { keyboard: this.touch, mouse: this.touch };
            this.subject.next (this.input);
        });
    }
    subject = new ReplaySubject (1);
    input = {
        keyboard: false,
        mouse: false,
    }
    subscribe (fn) {
        return this.subject.asObservable ().subscribe (fn);
    }
    setKeyboard(d) {
        this.input.keyboard = d || this.touch;
        this.subject.next (this.input);
    }
    setMouse(d) {
        this.input.mouse = d || this.touch;
        this.subject.next (this.input);
    }
}