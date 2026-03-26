import { Component, OnInit } from '@angular/core';
import { ClipboardService } from '../clipboard.service';
import { ClipboardService as ClipboardProcess } from "../../starnet"; 

@Component({
  selector: 'fx-client-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {

  constructor(private cs: ClipboardService, private cp: ClipboardProcess) { }
  cs$
  ngOnInit(): void {
    this.cs$ = this.cp.getSubject().subscribe(this.onclip.bind(this));
  }
  ngOnDestroy() {
    this.cs$.unsubscribe();
  }
  onclip(d) {
    
  }

}
