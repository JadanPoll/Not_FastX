import { Api } from "../util";

export let User = myExports ('/v3/api/user');

function myExports (base) {
  let api = new Api (base);
  return {
    api: api,
    list: (query) => { return api.post('/all-users', query); },
    profile: (query) => { return api.post('/profile/list', query); },
    getProfile: (query) => { return api.post('/profile/get', query); },
    me: (query) => { return api.post('/me', query); },
    editPreferences: (query) => { return api.post('/preferences/edit', query); },
    editNotifications: (query) => { return api.post('/notifications/edit', query); },
    shutdownLink: (query) => { return api.post('/link/shutdown', query); },
    shutdownLinkAll: (query) => { return api.post('/link/shutdown-all', query); },
    tokenDelete:  (query) => { return api.post('/token/delete', query); },
    tokenClear: (query) =>  { return api.post('/token/clear', query);},
    tokensGet: (query) =>  { return api.post('/tokens/get', query);},
    keepalive: (query) => { return api.post('/keepalive', query); },
    logout: (query) => { return api.post('/logout', query); },
    shutdown: (query) => { return api.post('/shutdown', query); },
  }
}
