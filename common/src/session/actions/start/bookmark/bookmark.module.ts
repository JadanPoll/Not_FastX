import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from '@Common/session/actions/start/bookmark/bookmark/bookmark.component';
import { BookmarkConfig, BookmarkService, bookmarkServiceFactory } from '@Common/session/actions/start/bookmark/bookmark.service';
import { dataArrayServiceFactory } from '@Common/data';
import { ElementComponent } from '@Common/session/actions/start/bookmark/element/element.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TagComponent } from '@Common/session/actions/start/bookmark/tag/tag.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faHeart as heartSolid, faTimes, faTh, faFilter,faXmark, faPlay, fas } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';
import { faPenField } from "@fortawesome/pro-regular-svg-icons";
import { faScreenUsers, fas as fasp} from "@fortawesome/pro-solid-svg-icons";
import { faCirclePlus} from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus as farCirclePlus, faFilter as farFilter } from "@fortawesome/pro-regular-svg-icons";
import { GridModule } from '@Common/grid';
import { ListActionsComponent } from './list-actions/list-actions.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule
  ],
  declarations: [BookmarkComponent, ElementComponent, TagComponent, ListActionsComponent],
  providers: [
    BookmarkConfig,
    { provide: BookmarkService, useFactory: bookmarkServiceFactory, deps: [BookmarkConfig] }
  ],
  exports: [
    BookmarkComponent
  ]
})
export class BookmarkModule {
  constructor (library: FaIconLibrary) {
    library.addIcons (heartOutline);
    library.addIcons (heartSolid);
    library.addIcons (faTimes);
    library.addIcons(faTh);
    library.addIcons(faFilter, farFilter);
    library.addIcons(faXmark);
    library.addIcons(faPenField);
    library.addIcons(faScreenUsers);
    library.addIcons(faCirclePlus, farCirclePlus);
    library.addIcons(faPlay);
    library.addIconPacks(fas, fasp);
  }
 }
