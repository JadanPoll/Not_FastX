import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { KeyStoreService } from "../key-store.service";
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'fx-ssh',
  templateUrl: './ssh.component.html',
  styleUrls: ['./ssh.component.css']
})
export class SshComponent implements OnInit {
  
  @Input () baseStage = 'login';
  @Input () successStages = ['success'];
  @Input () exec;
  @Input () data:any = {};
  @Input() adminLogin;
  @Input () set disable (b) {
    this.setDisable (b);
  };
  @Output () success = new EventEmitter ();
  @Output () cancel = new EventEmitter ();
  @Output () error = new EventEmitter ();
  @Output () unknownStage = new EventEmitter ();
  @Output() intermediateStage = new EventEmitter();
  @ViewChild ('pubKey', {static: false}) publicKeyStage;
  @ViewChild ("pw", {static: false}) pw;
  @ViewChild ("kb", {static: false}) kb;
  gen;
  currentStage;
  _disable;
  err;
  handled;
  currentKey;
  constructor(public ks: KeyStoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentStage = this.baseStage;
    this.ks.reset();
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(!changes?.data)
      return;
   
    this.switchStage(changes.data.currentValue);
    
  }
  stage () {
    return this.data.stage || this.baseStage;
  }
  async handle (d) {
    this.setDisable (true);
    try {
      if(!this.handled) {
        await this.ks.reset();
        this.handled = true;
      }
        
      let r = await this.exec (d)
      this.setDisable (false);
      this.data = r;
      this.switchStage (r);
    } catch(e) {
      this.data.stage = this.baseStage;
      this.currentStage = this.baseStage;
      this.error.emit (e);
      this.err = e;
      this.setDisable (false);
    }
    this.cdr.detectChanges();
  }
  onCancel ($event) {
    this.setDisable (false);
    this.cancel.emit ($event);
  }
  onError ($event) {
    this.setDisable (false);
    this.error.emit ($event);
    this.err = $event;
  }
  switchStage (r) {
    //ssh can have multiple success stages as defined by the consumer
    if (this.successStages.indexOf (r.stage) >= 0) {
      this.currentStage = r.stage;
      if(r.csrf) {
        localStorage.csrf = r.csrf;
      }
     
      return this.success.emit (r);
    }
    this.intermediateStage.emit(r.stage);
    switch (r.stage) {
      case 'sign':
        this.currentStage = r.stage;
        let pk = this.ks.getPk ();
        if (!pk) return;
  
        pk.then(p => {
          
          let sig = p ? p.sign(r.signData) : '';
        
          this.handle ({
            authtoken: r.authtoken,
            signature: sig || ''
          });
            
        });
        return 
      case "server":
        this.currentStage = r.stage;
        return;
      case "banner":
        this.currentStage = r.stage;
        return;
      case "password":
        if (this.currentStage === r.stage) { 
          this.pw.update ("Password failed. Try again."); 
        }
        this.currentStage = r.stage;
        return;
      case "keyboard-interactive":
        if (this.currentStage === r.stage) { this.kb.update (); }
        this.currentStage = r.stage;
        return;
      case 'public-key': 
        //move to the next key
        
        if (this.ks.current()?.key === this.currentKey?.key) { 
          this.ks.next ();
          if(this.publicKeyStage) 
            this.publicKeyStage.update ();
        }
        this.currentKey = this.ks.current();
        this.currentStage = r.stage;
        return;
      default: 
        this.currentStage = r.stage;
        this.unknownStage.emit (r);
        return;
    }
  }
  setDisable (b) {
    this._disable = b;
    this.cdr.detectChanges ();
  }
}
