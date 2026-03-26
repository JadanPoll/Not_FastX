import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {

  }
  
  val = 0;
  oldPercent = 0;

  @Input () set disabled(i) {
    this.options.disabled = i;
    this.options = Object.assign({}, this.options);
  }
  @Output () valueChange = new EventEmitter ();
  @Input () set min(i) {
    this.options.floor = i || 0;
    this.options = Object.assign({}, this.options);
  }	
  @Input () set max(i) {
    this.options.ceil = i || 100;
    this.options = Object.assign({}, this.options);
  }
  @Input () set step(i) {
    this.options.step= i || 1;
    this.options = Object.assign({}, this.options); 
  };
  @Input () 
  get value() {
    
    return this.progValue;
  };
  set value (v) {
    this.progValue = v; 
  }
  options: Options = {
    floor: 1,
    ceil: 100,
    step: 1
  };
 
  public progValue = 0;
  
 
  
  ngOnInit() {
  }
  nearest (number) {
    return Math.round(number/this.step) * this.step;
  }
  userChange(v) {
    this.valueChange.emit(v.value);
  }

  

}
