import { Api } from "../util";

export let NoLogin =  myApi();

function myApi () {
  return myExports ('/v3/api/nologin');
}

function myExports (base) {
  let api = new Api (base);
  return {
    api: api,
    shareConnect: (query) => { return api.post ('/share/connect', query); },
  }
}
