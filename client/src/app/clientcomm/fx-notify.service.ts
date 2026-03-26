import { Injectable } from '@angular/core';
import { NotifyService } from '@Common/notify';;
import { SendService } from './send.service';

const FX_NOTIFY = 'fx-notify';

@Injectable({
  providedIn: 'root'
})
export class FxNotifyService {
  private shareClient;
  constructor(
    private ns: NotifyService,
    private sendService: SendService,
) { 
 
    }
  process(d) {
    let data = new TextDecoder("utf-8").decode(d.data);
    try {
      let json = JSON.parse(data);
      let type = 'default';
      switch(json.icon) {
        case 'warning':
          type = "warning";
          break;
        case 'critical':
          type = "error"
          break;
        case 'question':
        case 'information':
          type = 'info';
          break;
        case 'success':
        case 'wait':
          type = json.icon;
          break;
        default:  
      }
      let msg = '<p>' + json.message + '</p>';
      if(json.buttons) {
        json.buttons.forEach(c => {
          msg += `<button class="btn" value="${c}" onclick="
          document.getElementsByTagName('iframe')[0].contentWindow.postMessage({ 
            msg: 'fx-notify', 
            body: { messageNumber: ${d.messageNumber}, data: '${c}' }
          }, '*');
          this.closest('.toast').remove();
          ">${c}</button>&nbsp;`;
        });
        
      } else if(d.messageNumber) {
        this.sendService.send(FX_NOTIFY, {
          messageNumber: d.messageNumber,
          data: ''
        });
      }  
      this.ns[type]({
        title: json.title,
        msg: msg,  
        showClose: json.hasOwnProperty('showClose') ? json.showClose : true,
        timeout: json.timeout ? json.timeout*1000 : 0,
        onTimeout: (toast) => {
          this.sendService.nack(FX_NOTIFY, {
            messageNumber: d.messageNumber,
            data: { name: 'timeout', message: 'Client notify timeout' }
          });
        },
        onClick: ($event) => {
          if(!$event.$event.target.value)
            return;
          this.sendService.send(FX_NOTIFY, {
            messageNumber: d.messageNumber,
            data: $event.$event.target.value
          });
        },
        onCloseClick: ($event) => {
          this.sendService.nack(FX_NOTIFY, {
            messageNumber: d.messageNumber,
            data: { name: 'cancel', message: 'Client notify cancel' }
          }); 
        },
        disableCloseOnClick: true
      });
    } catch(e) {
      if(d.messageNumber) {
        
        if(e.name === 'SyntaxError') {
          this.sendService.send(FX_NOTIFY, {
            messageNumber: d.messageNumber,
            data: ''
          });
        } else {
          this.sendService.nack(FX_NOTIFY, {
            messageNumber: d.messageNumber,
            data: { name: e.name, message: e.message }
          });
        }
        
      }
      this.ns.default({
        msg: data
      });
    }

  }
  
}
