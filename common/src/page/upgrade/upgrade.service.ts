import { Injectable } from '@angular/core';
import { ConfigService } from '@Common/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  upgrades: any;
  r;
  constructor(private cs: ConfigService, private http: HttpClient) { 
    this.cs.subscribe (this.checkUpgrade.bind (this));
    this.upgrades = new Promise((resolve, reject) => {
      this.r = resolve;
    });
  }
  config = {} as any;
  checkUpgrade (d) {
    this.config = d;
    if (!d.build) {
      this.r({});
      return;
    }
     
    if(!d.upgrade) {
      this.r({});
      return;
    }
      
    this.http.jsonp (d.upgrade, 'callback').subscribe (this.processUpgrade.bind (this));
  }
  processUpgrade (d) {
    if (typeof d !== 'object') {
      this.r({});
      return;
    }
    this.r(d);
  }
 
  async getUpgrades () {
    return await this.upgrades;
  }
 
}
