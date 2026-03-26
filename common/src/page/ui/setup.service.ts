import { Injectable } from '@angular/core';
import {NgbModalConfig, NgbNavConfig, NgbAccordionConfig, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class SetupService {
  constructor(
    private modalConfig: NgbModalConfig,
    private navConfig: NgbNavConfig,
    private accConfig: NgbAccordionConfig,
    private dropConfig: NgbDropdownConfig
  ) { }
  load() {
    this.modalConfig.animation = false;
    this.navConfig.animation = false;
    this.accConfig.animation = false;
  //  this.dropConfig.animation = false;
  }

}
