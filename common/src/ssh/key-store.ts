import  { KEYUTIL } from "jsrsasign";

export default function KeyStore () {}

KeyStore.prototype.add = function (name, key) {
    let k = Object.assign ({
        name: name,
        key: key
    }, getFormat (key));
    let keys = this.read ();
    keys.push (k);
    return this.write (keys);
}
KeyStore.prototype.read = function () {
    try {
        return JSON.parse (window.localStorage.getItem ('private-keys')) || [];
    } catch (e) {
        console.log (e);
    }
    return [];
}
KeyStore.prototype.write = function (keys) {
    window.localStorage.setItem ('private-keys', JSON.stringify (keys));
    return this.read ();
}
KeyStore.prototype.deleteKey = function(key) {
    let keys = this.read();
    keys = keys.filter(k => k.key !== key);
    return this.write(keys);
}
KeyStore.prototype.deleteIndex = function (index) {
    let keys = this.read ();
    if (index < 0 || index >= keys.length ) {
        return keys;
    }
    keys.splice (index, 1);
    return this.write (keys);
}

function getFormat (key) {
    let lines = key.split('\n');
    if(lines[0].search(/-----BEGIN RSA PRIVATE KEY-----/) >=0){
        return {
            format: 'pkcs1',
            encrypted: (lines[1].search(/ENCRYPTED/) >=0)
        };
    }else if(lines[0].search(/-----BEGIN PRIVATE KEY-----/) >= 0){
        return {
            format: 'pkcs8',
        }
    }else if(lines[0].search(/-----BEGIN ENCRYPTED PRIVATE KEY-----/) >= 0){
        return {
            format: 'pkcs8',
            encrypted:true,
        }
    } else if(lines[0].search(/-----BEGIN OPENSSH PRIVATE KEY-----/) >= 0) {
        /* TODO, enable encrypted */
        return {
            format: 'openssh'
        };
    } 
    return {};
}
