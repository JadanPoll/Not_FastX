import { Injectable } from '@angular/core';
import { WindowRef } from '@Common/browser';

import { SendService } from './send.service';

const FX_URL = 'fx-url';

@Injectable({
  providedIn: 'root'
})
export class FxUrlService {
  constructor(
    private sendService: SendService,
    private wref: WindowRef) { 
 
    }
    process(d) {
        let data = new TextDecoder("utf-8").decode(d.data);
        try {
        let json = JSON.parse(data);
        if(!json.url)
            return;
        this.wref.open(json.url,'_blank');  
        } catch(e) {
        this.wref.open(data,'_blank');
        }

        if(d.messageNumber) {
        this.sendService.send(FX_URL, {
            messageNumber: d.messageNumber,
            data: null
        });
    }
  }  
}
