import { Api } from "../util";

export let Share =  myApi();

function myApi () {
  return myExports ('/v3/api/share');
}

function myExports (base) {
  let api = new Api (base);
  return {
    api: api,
    connect: (query) => { return api.post('/connect', query)},
    load: (query) => { return api.post ('/load', query); },
    save: (data) => { return api.post ('/save', data); },
    update: (data) => { return api.post ('/update', data); },
    remove: (data) => { return api.post ('/remove', data); },
  }
}
