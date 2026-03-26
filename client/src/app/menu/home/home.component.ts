import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fx-client-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input () config = {} as any;
  constructor() { }

  ngOnInit() {
  }
  home () {
    let u = this.config.url || '../';
    if (this.config.sameWindow) return window.location.assign (u)
    return window.open (u)
  }

}
