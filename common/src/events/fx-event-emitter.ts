import { EventEmitter } from "@angular/core";

export class FxEventEmitter extends EventEmitter<any> {
    constructor () {
        super ();
    }
    before (d?: any) { return Promise.resolve (d); }
    beforeError (e) { console.log (e); }
    after (d?: any) {  }
    emit (evt?: any): void {
        this.before (evt)
        .then (d => {
            super.emit (d);
            this.after (d);
        })
        .catch (this.beforeError);
    };
  }