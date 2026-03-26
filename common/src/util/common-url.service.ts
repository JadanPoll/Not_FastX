import { Injectable } from '@angular/core';
import { ExternalUrlService } from "@Common/util/external-url.service";
import { ConfigService } from "@Common/config";

@Injectable({
  providedIn: 'root'
})
export class CommonUrlService {
    config = <any>{};
    constructor (private externalUrl: ExternalUrlService, private cs: ConfigService) {
        this.cs.subscribe (d => {
            this.config = d;
        });
    }
    release () {
        return "https://www.starnet.com/help/fastx3-3-server-release-notes/";
    }
    poweredBy () {
        return "https://www.starnet.com/fastx" + (this.config.build? '/?source=FastX3-' + this.config.build : "");
    }
}
