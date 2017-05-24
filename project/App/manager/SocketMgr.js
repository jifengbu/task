'use strict';
var io = require('socket.io-client/socket.io');

class Manager {
    register() {
        this.socket = io.connect('ws://127.0.0.1:8888', {
            connect_timeout: 3000,
            transports: ['websocket'],
        });
        this.socket._on = (type, callback) => {
            return this.socket.on(type, (obj) =>{
                console.log('recv:', type, obj);
                callback(obj);
            });
        };

        this.socket._on('connect', (obj) => {
            app.socketconnect = true;
        })._on('disconnect', (obj) => {
            app.socketconnect = false;
            Toast('服务器断开了连接');
        })._on('connect_error', (obj) => {
        })._on('connect_timeout', (obj) => {
        })._on('reconnect', (obj) => {
            app.socketconnect = true;
            Toast('服务器重新连接连接成功');
        })._on('reconnect_error', (obj) => {
        })._on('reconnect_failed', (obj) => {
        })._on('USER_REGISTER_RS', (obj) => {

        });
    }
    emit(type, data, notNeedCheckOnline) {
        console.log('send:', type, data);
        if (!notNeedCheckOnline && !app.loginMgr.online) {
            console.log('you are offline');
            return;
        }
        this.socket.emit(type, data);
    }
}

module.exports = new Manager();
