import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

export function dataServiceFactory (config: DataConfig) {
    return new DataService (config);
}


export class DataConfig {
    load (d) { return Promise.resolve ({}); }
    find (a, b) { return a.id === b.id }
}


export class DataService {
  private subject$ = new ReplaySubject (1);
  private data = {};
  protected config;
  constructor(config) { 
      this.config = config;
  }
  load (o = {}) {
    this.config.load (o)
    .then (d => {
      //merge in all the new ones;
     this.data = this.merge (this.data, d);
      this.subject$.next (this.data);
    })
    .catch (e => console.log (e));
  }
  localLoad (d) {
    this.data = this.merge (this.data, d);
    this.subject$.next (this.data);
  }
  update (d) {
    if (!d.id) return;
    this.data [d.id] = d;
    this.subject$.next (this.data);
  }
  delete (id) {
    delete this.data [id];
    this.subject$.next (this.data);
  }
  subscribe (fn = ((d) => {})) {
    return this.subject$.asObservable ().subscribe (fn);
  }
  private merge (data, d) {
    for (let i in data) {
      if (typeof d [i] === 'undefined') delete data [i];
      data [i] = d [i];
      delete d [i];
    }
    for (let i in d) {
      data [i] = d [i];
    }
    return data;
  }
}
