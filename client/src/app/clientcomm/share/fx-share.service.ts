const FX_SHARE = 'fx-share';

import { Injectable } from '@angular/core';
import { NotifyService } from '@Common/notify';
import { SendService } from '../send.service';
import { ReplaySubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FxShareService {
    private _map = new Map();
    private _clients = new ReplaySubject(1);
    private _me = new ReplaySubject(1);
    private _server = new ReplaySubject(1);
    private _config = new ReplaySubject(1);
    private _conf = {} as any;
    private _messageNumber = 1;
    private sd = {} as any;
    private cl = {} as any;
    constructor(
        private ns: NotifyService,
        private sendService: SendService
   ) { 
        this._map.set('hello', this._hello.bind(this));
        this._map.set('client-notify', this._clientNotify.bind(this));
        this._map.set('me-notify',  this._meNotify.bind(this));
        this._map.set('disconnect', this._disconnect.bind(this));
        this._map.set('message', this._message.bind(this));

        this.clients.subscribe(d => {
            this.cl = d as any;
        });
        this.serverData.subscribe(d => {
            this.sd = d;
        })
    }


    process(d) {
        let data = new TextDecoder("utf-8").decode(d.data);

        try {
            let json = JSON.parse(data);
            if(!this._map.has(json.method)) {
                console.log('fx-share: Unknown Message', d);
                return;
            }
            (this._map.get(json.method))(json);
        } catch(e) {
            console.log('ERROR', e);
        }
    }
    hello(data = {}) {
        let p = Object.assign(data, { version: "1.0" });
        this.sendService.send(FX_SHARE,{ 
            messageNumber: this._messageNumber++,
            data: JSON.stringify({
                method: "hello",
                params: p
            }) });
    }
    get clients() {
        return this._clients.asObservable();
    }
    get serverData() {
        return this._server.asObservable();
    }
    get config() {
        return this._config.asObservable();
    }
    get me() {
        return this._me.asObservable();
    }
    setVisibility(b) {
        this._conf.visible = b;
        this._config.next(this._conf);
    }
    updateClient(clients = []) {
        // role, status, name, client
        this.sendService.send(FX_SHARE, { 
            messageNumber: this._messageNumber++,
            data: JSON.stringify({
                method: 'update-client',
                params: clients
            })});

    }
    disconnect(clients = [], message = "") {
        this.sendService.send(FX_SHARE, { 
            messageNumber: this._messageNumber++,
            data: JSON.stringify({
            method: 'disconnect',
            params: {
                client: clients,
                message: message
            }
        })});

    }
    message(d) {
        this.sendService.send(FX_SHARE, { 
            messageNumber: this._messageNumber++,
            data: JSON.stringify({
            method: 'message',
            params: d
        })});
    }
    private _hello(d) {
        this._server.next(d.params);
    }
    private _clientNotify(d) {
         // client: The id of the client
        // version: The version sent in the hello message from that client
        // name: The name of the user of that client
        // role: The current role of the client
        // status: The current status of the client
        this._clients.next(d.params);
    }
    private _meNotify(d) {
        this._me.next(d.params);
    }
    private _disconnect() {

    }
    private _message(d) {
        console.log('fx-share: "message" method not implemented', d)
    }
}