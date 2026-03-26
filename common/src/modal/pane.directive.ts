import {  Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: 'pane'
  })
  export class Pane {
    constructor (public vcr: ViewContainerRef) {}
  }
  