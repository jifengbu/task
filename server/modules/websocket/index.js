const WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var _ = require('lodash');
var url = require('url');
var moment = require('moment');

module.exports = (function() {

    function Mgr() {
        this.socketList = [];
        this.taskList = [];
        this.taskIndex = 0;
    }
    Mgr.prototype.register = function(app, server) {
        var wss = new WebSocketServer({server: server});
        var self = this;
        wss.on('connection', function (ws) {
            var location = url.parse(ws.upgradeReq.url, true);
            console.log('client connected', {phone: location.query.phone});
            ws.phone = location.query.phone;
            self.socketList.push(ws);
            ws.on('message', function (message) {
                var param = JSON.parse(message);
                self.onMessage(ws, param.type, param.data);
            });
            ws.on('close', function (message) {
                self.socketList = _.reject(self.socketList, (o)=>o.phone===ws.phone);
                console.log('disconnect', message);
            });
        });
    };
    Mgr.prototype.send = function(ws, type, data) {
        ws.send(JSON.stringify({
            type,
            data,
        }));
    };
    Mgr.prototype.notifyOthers = function(ws, type, data) {
        _.forEach(this.socketList, (_ws)=>{
            if (_ws.phone !== ws.phone) {
                _ws.send(JSON.stringify({
                    type,
                    data,
                }));
            }
        });
    };
    Mgr.prototype.notifyAll= function(type, data) {
        _.forEach(this.socketList, (ws)=>{
            ws.send(JSON.stringify({
                type,
                data,
            }));
        });
    };
    Mgr.prototype.onMessage = function(ws, type, data) {
        console.log('recv:', type, data);
        switch (type) {
            case 'APPLY_TASK_RQ': {
                data.state = 0; //任务状态，0：待审核 1：审核未通过，2：进行中，3：已完成
                data.id = this.taskIndex;
                data.readed = [];
                this.taskIndex++;
                _.forEach(data.taskList, (o)=>{
                    o.logsList = [{
                        title: '王秘书申请任务',
                        time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    }];
                })
                this.taskList.unshift(data);
                this.send(ws, 'APPLY_TASK_RS', {success: true});
                this.notifyAll('NEW_TASK_APPLY_NF', data);
                break;
            }
            case 'PUBLISH_TASK_RQ': {
                data.state = 2; //任务状态，0：待审核 1：审核未通过，2：进行中，3：已完成
                data.id = this.taskIndex;
                data.readed = [];
                this.taskIndex++;
                data.logsList = [{
                    title: '张局长发布任务',
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                }];
                this.taskList.unshift(data);
                this.send(ws, 'PUBLISH_TASK_RS', {success: true});
                this.notifyAll('NEW_TASK_PUBLISH_NF', data);
                break;
            }
            case 'GET_TASK_LIST_RQ': {
                this.send(ws, 'GET_TASK_LIST_RS', {success: true, taskList: this.taskList});
                break;
            }
            case 'ALERT_EXECUTOR_RQ': {
                var log = {
                    title: '监督者',
                    content: data.content,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    if (data.index && data.index > -1) {
                        if (modifyTask.taskList) {
                            modifyTask.taskList[data.index].logsList.unshift(log);
                        }
                    }else {
                        if (modifyTask.logsList) {
                            modifyTask.logsList.unshift(log);
                        }
                    }
                    modifyTask.readed = [];
                }
                this.send(ws, 'ALERT_EXECUTOR_RS', {success: true});
                this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                this.notifyOthers(ws, 'ALERT_EXECUTOR_NF', data);
                break;
            }
            case 'APPROVAL_TASK_RQ': {
                var log = {
                    title: data.agree?'同意发布任务':'不同意该任务发布',
                    content: data.content,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    modifyTask.state = data.agree ? 2 : 1;
                    var log = {
                        title: data.agree ? '张局长同意了申请任务' : '张局长拒绝了申请任务',
                        time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    };
                    _.forEach(modifyTask.taskList, (o)=>{
                        o.logsList.unshift(log);
                    })
                }
                this.send(ws, 'APPROVAL_TASK_RS', {success: true});
                this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                break;
            }
            case 'UPDATE_TASK_RQ': {
                var log = {
                    title: '王秘书变更了任务',
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    if (data.index != null) {
                        modifyTask.taskList[data.index].logsList.unshift(log);
                        Object.assign(modifyTask.taskList[data.index], data.childTask);
                        this.send(ws, 'UPDATE_TASK_RS', {success: true});
                        this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                    } else {
                        modifyTask.logsList.unshift(log);
                        Object.assign(modifyTask, data.childTask);
                        this.send(ws, 'UPDATE_TASK_RS', {success: true});
                        this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                    }
                    modifyTask.readed = [];
                } else {
                    this.send(ws, 'UPDATE_TASK_RS', {success: false});
                }
                break;
            }
            case 'UPDATE_EXECUTOR_RQ': {
                var log = {
                    title: '执行者',
                    content: data.content,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    if (data.index != null) {
                        modifyTask.taskList[data.index].logsList.unshift(log);
                    } else {
                        modifyTask.logsList.unshift(log);
                    }
                    modifyTask.readed = [];
                }
                this.send(ws, 'UPDATE_EXECUTOR_RS', {success: true});
                this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                break;
            }
            case 'REAPPLY_TASK_RQ': {
                var log = {
                    title: '王秘书重新申请任务',
                    content: '重新申请的任务',
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    if (modifyTask.taskList) {
                        _.forEach(modifyTask.taskList, (o)=>{
                            o.logsList.unshift(log);;
                        })
                    } else {
                        modifyTask.logsList.unshift(log);
                    }
                    modifyTask.state = 0;
                    modifyTask.readed = [];
                }
                this.send(ws, 'REAPPLY_TASK_RS', {success: true});
                this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                break;
            }
            case 'UPDATE_READED_RQ': {
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    modifyTask.readed = _.union(modifyTask.readed, [ws.phone]);
                    this.send(ws, 'TASK_LIST_UPDATE_NF', this.taskList);
                }
                break;
            }
            case 'CLOSE_TASK_RQ': {
                var modifyTask = _.find(this.taskList, (item) => item.id == data.id);
                if (modifyTask) {
                    modifyTask.state = 3;
                    this.send(ws, 'CLOSE_TASK_RS', {success: true});
                    this.notifyAll('TASK_LIST_UPDATE_NF', this.taskList);
                }
                break;
            }
        }
    };

    return new Mgr();
})();
