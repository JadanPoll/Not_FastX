import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { ActivatedRoute } from "@angular/router";
import { ClientCommService } from '../client-comm.service';

import { SendService } from '../send.service';
@Component({
  selector: 'fx-client-client-comm',
  templateUrl: './client-comm.component.html',
  styleUrls: ['./client-comm.component.css']
})
export class ClientCommComponent implements OnInit {
  comDebug = false;
  form: FormGroup;
  sub$;
  formVisible = false;
  id: string;
  constructor(private fb: FormBuilder, private ss: SendService, private route: ActivatedRoute, private cc: ClientCommService, 
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      channel: [""],
      data: [""]
    });
    this.sub$ = this.route.paramMap.subscribe((params: any) => {
      this.id = params.id;
      this.comDebug = Boolean(params.get('com-debug'));
      this.cc.setDebug(this.comDebug);
      this.cdr.detectChanges();
    });
   

  }
  toggleForm() {
    this.formVisible = !this.formVisible;
  }
  showForm() {
    return this.formVisible;
  }
  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
  sendComm() {
    let v = this.form.value;
    this.ss.send(v.channel, { data: JSON.stringify(JSON.parse(v.data)) });
    console.log('SEND CLIENTCOM DEBUG', v.channel, JSON.parse(v.data));
  }

}
