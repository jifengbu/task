'use strict';
const EventEmitter = require('EventEmitter');
const io = require('socket.io-client');

class Manager extends EventEmitter {
    register() {
        this.callbacks = {};
        this.socket = io.connect('ws://192.168.1.222:4000', {
            connect_timeout: 3000,
            transports: ['websocket'],
            path: '/api/socket',
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

        })._on('NEW_PUBLISH_TASK_NF', (obj) => {
            this.emit('NEW_PUBLISH_TASK_EVENT', obj);
        })._on('AGREE_PUBLISH_TASK_NF', (obj) => {
            this.emit('AGREE_PUBLISH_TASK_EVENT', obj);
        })._on('REJECT_PUBLISH_TASK_NF', (obj) => {
            this.emit('REJECT_PUBLISH_TASK_EVENT', obj);
        })._on('AGREE_FINISH_TASK_NF', (obj) => {
            this.emit('AGREE_FINISH_TASK_EVENT', obj);
        })._on('APPLY_FINISH_TASK_NF', (obj) => {
            this.emit('APPLY_FINISH_TASK_EVENT', obj);
        })._on('REJECT_FINISH_TASK_NF', (obj) => {
            this.emit('REJECT_FINISH_TASK_EVENT', obj);
        })._on('REMIND_TASK_NF', (obj) => {
            this.emit('REMIND_TASK_EVENT', obj);
        }).on(['LOGIN_RS'], (obj) => {
            console.log('LOGIN_RS===========', obj,this.callbacks);
            const {callback, wait} = this.callbacks['LOGIN_RQ'];
            callback && callback(obj);
            if (wait) {
                app.dismissProgressHud();
            }
        }).on(['LOGOUT_RS'], (obj) => {
            console.log('LOGOUT_RS===========', obj,this.callbacks);
            const {callback, wait} = this.callbacks['LOGOUT_RQ'];
            callback && callback(obj);
            if (wait) {
                app.dismissProgressHud();
            }
        });
    }
    sendData (type, data, callback, wait) {
        if (!app.socketconnect) {
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

        this.callbacks[type] = {callback, wait};
        console.log('ws send:', type, data,this.callbacks);
        this.socket.emit(type, data);
    }
    login ({phone, password}, callback) {
        this.sendData('LOGIN_RQ', {phone, password}, callback, true);
    }
    logout ({userId}, callback) {
        this.sendData('LOGOUT_RQ', {userId}, callback, true);
    }
}

module.exports = new Manager();
