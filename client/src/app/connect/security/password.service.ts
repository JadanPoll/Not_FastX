import { Injectable } from '@angular/core';
import { PasswordService as PS } from "../../starnet";
import { SecurityConfigService } from "../../secuity.service";
import { CloseService } from '../../close.service';


@Injectable()
export class PasswordService {
  id;
  config;
  pw;
  constructor(private sec: PS, private configSec: SecurityConfigService, private cl: CloseService) {
      this.sec.getSubject ().subscribe (this.handle.bind (this));
  }
  private handle (d) {
    this.configSec.subscribe (c => {
      if (!c) {
        this.cl.disconnect ("Password Security required");
        console.log ("No Security Config Loaded");
        return;
      } 
      console.log ('Password Security',c );
      return  this.sec.send ({ login: c.login, password: c.password });
    });
  }
}
