import { Api } from "../util";

export let Session = myExports ('/v3/api/session');

function myExports (base) {
  let api = new Api (base); 
  return {
    api: api,
    list: (query) => { return api.post ('/', query); },
    listShared: (query) => { return api.post ('/list-shared', query); },
    listAllUsers: (query) => { return api.post ('/list-all-users', query); },
    params: (data) => { return api.post ('/params', data); },
    paramsForm: (data) => { return api.post ('/params-form/list', data)},
    servers: (data) => { return api.post ('/servers/list', data)},
    connect: (data) => { return api.post ('/connect', data); },
    connectShortcut: (data) => { return api.post ('/shortcut', data); },
    exec: (data) => { return api.post ('/exec', data); },
    bgexec: (data) => { return api.post ('/exec-bg', data); },
    disconnect: (data) => { return api.post ('/disconnect', data); },
    purge: (data)=> { return api.post ('/purge', data); },
    terminate: (data) => { return api.post ('/terminate', data); },
    start: (data) => { return api.post ('/start', data); },
    bookmarkStart: (data) => { return api.post ('/start/bookmark-start', data); },
    bookmarkSchedule: (data) => { return api.post ('/start/bookmark-schedule', data); },
    schedule: (data) => { return api.post ('/start/schedule', data); },
    screenshot: (data) => { return api.post ('/screenshot', data); },
    log: (data) => { return api.post ('/log', data); },
    profilesList: (data) => { return api.post('/profiles/list', data); },
  }
}
