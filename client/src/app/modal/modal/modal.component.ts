import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  content;
  title;
  home;
  _details = false;
  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }
  Title () {
    return this.title;
  }
  Content () {
   if (!this.content) return '';
   return this.content.split ('\n') [0];
  }
  More () {
    if (!this.content) return '';
    let c = this.content.split ('\n');
    if (c.length < 1) return '';
    return c.slice (1).join ('\n');
  }
  details () {
    return this._details;
  }
  toggleDetails () {
    this._details = ! this._details;
    this.cdr.detectChanges ();
  } 
  Home() {
    return this.home && !this.home.hide;
  }
  homeLink()  {
    return this.home.url ||  '../..';
  }
  sameWindow() {
    return this.home.sameWindow ? '_self' : '_blank';
  }

}
