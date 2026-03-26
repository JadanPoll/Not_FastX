import { Injectable } from '@angular/core';
import { User }  from "../api/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenData:any;
  gettingKeepalive = false;
  constructor() { }

  async keepalive(o = { refreshOnFailure: false}) {
    let ka;
    if(this.gettingKeepalive)
      return;
    
    this.gettingKeepalive = true;
    if(!this.tokenData) {
      try {
        ka = await User.keepalive();
      } catch(e) {
        console.log(e)
        if(o.refreshOnFailure)
          window.location.reload();
        else {
          this.gettingKeepalive = false;
          return;
        }
      }
      
    } else if(this.tokenData.exp && this.tokenData.iat) {
        let now = Date.now();
        let exp = this.tokenData.exp*1000;
        let iat = this.tokenData.iat*1000;
        if( (exp - now) > ((exp - iat)/2) ) {
          this.gettingKeepalive = false;
          return;
        }
         
        try {
          ka = await User.keepalive();
        } catch(e) {
          console.log(e)
          if(o.refreshOnFailure)
            window.location.reload();
          else {
            this.gettingKeepalive = false;
            return;
          }
        }
       
    } else {
      this.gettingKeepalive = false;
      return;
    }
    this.gettingKeepalive = false;
    if(ka && ka.token)
      this.tokenData = JSON.parse(atob(ka.token.split('.')[1]));
      window.localStorage['csrf'] = this.tokenData.jti;
  }
}
