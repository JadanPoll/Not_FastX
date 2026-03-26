import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlService {
  constructor() { }
  goToUrl (url) {
    url = url.replace(/\/+/g, "/");
     window.location.href = url;
  }
  newWindow (url) {
    return window.open (url, '_blank');
  }
}
