var io = require('socket.io-client');
var { post, saveClient, client } = require('../../utils');
var { host, clientPhone } = require('../../config');
var { apiRoot, port } = require('../../../config');
var args = process.argv.splice(2);

var param = {
    phone: clientPhone,
    password: '123456',
};

if (args[0] === '--socket') {
    console.log('ws://' + host + ':' + port, { path: apiRoot + '/socket' });
    var socket = io.connect('ws://' + host + ':' + port, { path: apiRoot + '/socket' });
    socket.on('connect', function (obj) {
        console.log('connect to server');
        socket.emit('LOGIN_RQ', { phone: args[1],password:args[2]});
    }).on('disconnect', function (obj) {
        console.log('disconnect to server');
    }).on('connect_error', function (obj) {
        console.error('connect to server error');
    }).on('connect_timeout', function (obj) {
        console.error('connect to server timeout');
    }).on('reconnect', function (obj) {
        console.log('reconnect to server');
    }).on('reconnect_failed', function (obj) {
        console.error('reconnect to server failed');
    }).on(['LOGIN_RS'], function(obj) {
        console.log(obj);
        if (obj.success) {
            client.userId = obj.userId;
            saveClient(client);
        } else {
            console.log(obj.msg);
        }

    });
}
