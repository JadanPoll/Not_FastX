(()=> { "use strict";  })();

export const APIPATH = 'v3/api'
export const TOKENHEADER = 'X-FASTX-TOKEN';
export const JTIHEADER = 'X-CSRF-TOKEN';

export class Api {
  constructor (base = '') {
    this.base = base;
    this.rootPath = '/'
  }
  setRootPath (b) {
    this.rootPath = b;
  }
  post (uri, data, headers = {}) {
    return this._method (uri, data, headers);
  }
  _method (uri, data, headers = {}) {
    let config =  {
      headers: {
        'Content-type': 'application/json',
        [JTIHEADER]: Token ()   
      },
      credentials: "include",
      method: 'POST',
      body: JSON.stringify (data)
    };
    Object.assign(config.headers, headers);
    
    let req = new Request (_createUrl (this.rootPath, this.base, uri), config);
    return new Promise ((resolve, reject) => {
      fetch (req)
      .then (res => {
        try {
           /* regardless of status, if it is json, parse it */
           _getJSON (res) 
           .then (data => {
             try {
               _validateResponse (data);
             } catch (e) {
               return reject (e);
             }
             return resolve (data.result);
           })
           .catch (e => {
             try {
                /* when json does not parse, check the status */
                _validateStatus (res);
                throw e;
             } catch (e) {
                reject (e);
             }
           });
  
        } catch (e) {
          return reject (e);
        }
      })
      .catch (reject);
    });
  }
}
export function Token () {
  return localStorage.csrf;
  //return _getCookie ('__session-fx3-token') || _getCookie ('fx3-token')
}

function _createUrl (root, base, uri) {
  return [ root, base ]
  .concat (
    uri.split ('/')
    .filter (c => { return !c.match (/^\s+$/); })
  ).filter (c => c)
  .join ('/')
  .replace (/\/+/g,"/");
}

function _validateStatus (res) {
  if (!res.ok) {
    throw new Error (res.statusText);
  }
}
function _getJSON (res) {
  return res.json ();
}
function _validateResponse (data) {
  if (!data) {
    throw errorObject({ message: 'Response missing data object' });
  }
  if (!data.result) {
    if (!data.error) {
      console.log (data);
      throw errorObject ({ message: 'Error missing error object' });
    }
    throw errorObject (data.error);
  }
}
function errorObject (e) {
  if (e.error) e = e.error;
  console.log (e);
  if (e.name === 'AuthError') {
    document.dispatchEvent (new CustomEvent ('snLoggedOut', {
      detail: e
    }));
  }
  return Object.assign ({
    name: 'Error',
    message: '',
    stack: ''
  }, e)
}


function _getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}