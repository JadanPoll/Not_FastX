import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";

export interface SnMessage {
  msg: string;
  body: any;
}
@Injectable()
export class IframeService {
  private frame;
  private queue = [];
  private ready;
  private sub$ = new ReplaySubject<SnMessage> (1);
  constructor () { 
    this.createFrame ();
    this.loaded ();
    this.listen ();
  }
  focus () {
    if (this.frame.contentWindow) this.frame.contentWindow.focus ();
  }
  getFrame () {//
    return this.frame;
  }
  getSubject (): Observable<SnMessage> {
    return this.sub$.asObservable ();
  }
  destroy () {
    if (!this.frame.parentNode) return;
    this.frame.parentNode.removeChild (this.frame);
  }
  resize(size) {
    this.frame.style.width = size.width + 'px';
    this.frame.style.height = size.height + 'px';
  }
  refresh(d = {}) {
    this.send("refresh", d);
  }
  show() {
    this.frame.style.display = 'block';
  }
  hide() {
    this.frame.style.display = 'none';
  }
  hasCanvas() {
    return this.frame.contentWindow?.document.querySelector('#_windowId_0');
  }
  send (msg, body) {
    if (!this.ready) {
      this.queue.push ({ msg: msg, body: body});
      return;
    }
    this.post ({
			msg:  msg,
			body: body
		});
  }
  private post (o) {
    this.frame.contentWindow.postMessage (o, '*');
  }
  private createFrame () {
    this.frame = document.createElement ('iframe');
		this.frame.src = 'protocol';
    this.frame.style.display = 'none';
    //this.frame.style.overflow = 'hidden';
    /*this.frame.style.margin ='auto'; */
    this.frame.scrolling = 'no';
    // this.frame.style.width = '100%';
    // this.frame.style.height = '100%'; //window.innerHeight + 'px';
    console.log ('Frame Created');
  }
  size() {
    let c = this.frame.contentWindow.document.body.querySelectorAll("canvas")[0];
    return [c.width, c.height];
  }
  private listen () {
    window.addEventListener ('message', (e: MessageEvent) => {
        if (!e.data || !e.data.msg) return;
        this.sub$.next (e.data);
    });
  }
  public loaded () {
    if (this.ready) return Promise.resolve (true);
    return new Promise ((resolve, reject) => {
      this.frame.onload = (() => { 
        let p;
        while (p = this.queue.shift ()) {
          this.post (p);
        }
        this.ready = true;
        console.log ('Frame loaded')
        resolve (true);
      });
    })
    
  }
  
}