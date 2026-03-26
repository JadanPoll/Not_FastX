import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ComponentLoaderService } from '@Common/component-loader';
import { Pane } from "@Common/modal/pane.directive";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input () component: Component;
  @Input() empty = false;
  @Output () loaded = new EventEmitter ();
  @ViewChild (Pane, {static: false}) pane;
  private ref: ComponentRef <Component>;
  constructor(private cl: ComponentLoaderService,  ) { }

  ngOnInit() {

  }
  ngAfterViewInit () {
    this.ref = this.cl.load (this.component, this.pane.vcr);
    this.loaded.emit (this.ref);
  }
  ngOnDestroy () {
    this.ref.destroy ();
  }
  
}
