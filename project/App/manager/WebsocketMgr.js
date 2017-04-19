'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Platform,
} = ReactNative;
const EventEmitter = require('EventEmitter');

class Manager extends EventEmitter {
    constructor () {
        super();
    }
    register (phone) {
        console.log('register');
        this.phone = phone;
        this.available = true;
        this.callbacks = {};
        this.connected = false;
        this.connect();
    }
    unregister () {
        this.available = false;
        this.connected = false;
        console.log('unregister');
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
    connect () {
        if (this.socket) {
            this.socket.close();
        }
        const url = 'ws://120.25.96.74:3008/?phone='+this.phone;
        // const url = 'ws://localhost:3008/?phone='+this.phone;
        console.log(url);
        this.socket = new WebSocket(url);
        this.socket.onopen = () => {
            console.log('onopen');
            this.connected = true;
            if (!this.available) {
                this.unregister();
            }
        };
        this.socket.onmessage = (e) => {
            console.log('onmessage', e.data);
            let param;
            try {
                param = JSON.parse(e.data);
            } catch (e) {
                Toast('解决Websocket出错');
            }
            this.onMessage(param.type, param.data);
        };
        this.socket.onerror = (e) => {
            console.log('onerror', e.message);
        };
        this.socket.onclose = (e) => {
            console.log('onclose');
            this.socket = null;
            this.connected = false;
            if (this.available) {
                setTimeout(this.reconnect.bind(this), 2000);
            }
        };
    }
    reconnect () {
        console.log('reconnect');
        this.connect();
    }
    sendData (type, data, callback, wait) {
        if (!this.socket) {
            Toast('网络不正常，请先连接网络');
            return;
        }
        if (typeof callback === 'boolean') {
            wait = callback;
            failed = null;
        }
        if (wait) {
            app.showProgressHud();
        }
        const param = { type, data };
        console.log('ws send:', type, data);
        this.callbacks[type] = {callback, wait};
        this.socket.send(JSON.stringify(param));
    }
    onMessage(type, data) {
        console.log('recv', type, data);
        if (/RS$/.test(type)) {
            const callback = this.callbacks[type.replace(/RS$/, 'RQ')];
            callback.callback && callback.callback(data);
            if (callback.wait) {
                app.dismissProgressHud();
            }
        }
        switch (type) {
            case 'NEW_TASK_APPLY_NF': {
                this.emit('NEW_TASK_APPLY_EVENT', data);
                break;
            }
            case 'NEW_TASK_PUBLISH_NF': {
                this.emit('NEW_TASK_PUBLISH_EVENT', data);
                break;
            }
            case 'TASK_LIST_UPDATE_NF': {
                this.emit('TASK_LIST_UPDATE_EVENT', data);
                break;
            }
            case 'ALERT_EXECUTOR_NF': {
                this.emit('ALERT_EXECUTOR_EVENT', data);
                break;
            }
        }
    }
}

module.exports = new Manager();
