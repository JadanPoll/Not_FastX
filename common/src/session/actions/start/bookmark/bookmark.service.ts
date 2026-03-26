import { Injectable } from '@angular/core';
import { Bookmark } from "@Common/api/bookmark";
import { ReplaySubject } from "rxjs";
import { DataService, DataConfig } from '@Common/data';

export function bookmarkServiceFactory (config: BookmarkConfig) {
  return new BookmarkService (config);
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkConfig extends DataConfig {
  load () {
    return Bookmark.list ()
  }
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService extends DataService {
  setRootPath (p) {
    Bookmark.api.setRootPath (p);
  }
  edit (b) {
    return Bookmark.edit (b);
  }
  remove (id) {
    return Bookmark.delete ({ id: id });
  }
  favorite (id) {
    return Bookmark.favorite({ id: id });
  }
  unfavorite (id) {
    return Bookmark.unfavorite({ id: id });
  }

  

  mergeAllBookmarks(d) {
    let all = [];
   
    for(let i in d) {
      switch(i) {
        case "system":
        case "user": 
          all = all.concat(d[i].map(c => {
            if(!c.tags)
              c.tags = [];
            c.tags.push(i);
            if(d.favorites && d.favorites.indexOf(c.id) >= 0)
              c.tags.push('favorites');
            c.tags.push('all');
            return c;
          }));
          
          break;
        case "favorites":
        case "history":
        default:
          break;
      }
    }
    return all;
  }
  makeTagSet(b) {
    let s = new Set();
    b.forEach(c => {
      if(typeof c !== 'object')
        return;
      if(!c.tags)
        c.tags = [];
      c.tags.forEach(d => {
        s.add(d);
      });
    });
    let tags = Array.from(s.values());
    let fav, all, system, user;
    let i = tags.findIndex(c => c === 'favorites');
    if(i >= 0)
      fav = tags.splice(i, 1)[0];
    i = tags.findIndex(c => c === 'system');
    if(i >= 0)
      system = tags.splice(i, 1)[0];
    i = tags.findIndex(c => c === 'user');
    if(i >= 0)
      user = tags.splice(i, 1)[0];
    i = tags.findIndex(c => c === 'all');
    if(i >= 0)
      all = tags.splice(i, 1)[0];

    tags = tags.sort();
    if(user)
      tags.unshift(user)
    if(fav)
      tags.unshift(fav);
    if(system)
      tags.push(system);
    if(all)
      tags.push(all);
    return tags;
  }

  // filterByTag (b, tag) {
  //   switch (tag) {
  //     case "favorites":
  //       return this.getFavorites ();
  //     case "system":
  //       return (b.system || []);
  //     case "user": 
  //       return (b.user || []);
  //     case "history":
  //       return (b.history || []);
  //     case "all":
  //       return ((b.system || [])
  //         .concat (b.user || []));
  //     default: 
  //       return (this.getFiltered (tag, b.system)
  //         .concat (this.getFiltered (tag, b.user))).filter (this.filterByText.bind (this));;
  //   }
  // }
  sortCaseInsensitive (arr = []) {
    return arr.sort ((a, b) => a.toLowerCase ().localCompare (b.toLowerCase ()));
  }
  // tagLengths () {
  //   let b = this.getBookmarks ();
  //   return  {
  //     favorites: this.filterByTag (b, 'favorites').length,
  //     system: this.filterByTag (b, 'system').length,
  //     user: this.filterByTag (b, 'user').length,
  //     history: this.filterByTag (b, 'history').length
  //   }
  // }
  constructor (config: BookmarkConfig) {
    super (config);
  }
}
