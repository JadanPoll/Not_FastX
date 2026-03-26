import  { Api } from "../util";

export let Bookmark = myExports ('/v3/api/bookmark');

function myExports (base) {
  let api = new Api (base);
  return {
    api: api,
    list: () => { return api.post ('/list'); },
    edit: (b) => { return api.post ('/edit', b); },
    delete: (b) => { return api.post ('/delete', b); },
    favorite: (b) => { return api.post ('/favorite', b); },
    unfavorite: (b) => { return api.post ('/unfavorite', b); },
  }
}
