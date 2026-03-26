import { Injectable } from '@angular/core';
import { Session } from "@Common/api/session";
import { Share, ShareData } from "@Common/api/share";
import { StartData, BookmarkStartData } from '@Common/session/actions/start/start-data';

@Injectable({
  providedIn: 'root'
})
export class SessionActionService {

  constructor() { }
  setRootPath (p) {
    return Session.api.setRootPath (p);
  }
  start (d: StartData) {
    return Session.start (d)
  }
  schedule (d: StartData) {
    return Session.schedule (d)
  }
  bookmarkStart (d: BookmarkStartData) {
    return Session.bookmarkStart (d);
  }
  bookmarkSchedule (d: BookmarkStartData) {
    return Session.bookmarkSchedule (d);
  }
  disconnect (d:  string | Array<string>, msg?: string) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.disconnect ({ id: c, message: msg || "The session was disconnected by the user" })); 
    return isArray ? a : a [0];
  }
  exec (d: string | Array<string>, e = {}) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.exec (Object.assign (e, { id: c }))); 
    return isArray ? a : a [0]; 
  }
  bgexec (d: string | Array<string>, e = {}) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.bgexec (Object.assign (e, { id: c }))); 
    return isArray ? a : a [0]; 
  }
  terminate (d: string | Array<string>, msg?: string) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.terminate ({ id: c, message: msg || "The session was terminated by the user" })); 
    return isArray ? a : a [0];
  }
  purge (d: string | Array<string>, msg?: string) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.purge ({ id: c })); 
    return isArray ? a : a [0];
  }
  params (d: string | Array<string>, params = {}) {
    let isArray = Array.isArray (d);
    let c = <Array<string>>(isArray ? d : [d]);
    let a = c.map (c => Session.params (Object.assign (params, { id: c }))); 
    return isArray ? a : a [0]; 
  }
  paramsForms () {
    return Session.paramsForm ({});
  }
  servers () {
    return Session.servers ({});
  }
  log (id: string) {
    return Session.log ({ id: id });
  }
  share (d) {
    return Share.save(d); 
  }
  
}
