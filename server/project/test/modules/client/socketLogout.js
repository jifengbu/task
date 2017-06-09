var io = require('socket.io-client');
var { post, saveClient, client } = require('../../utils');
var { host, clientPhone } = require('../../config');
var { apiRoot, port } = require('../../../config');
var args = process.argv.splice(2);

if (args[0] === '--socket') {
    console.log('ws://' + host + ':' + port, { path: apiRoot + '/socket' });
    var socket = io.connect('ws://' + host + ':' + port, { path: apiRoot + '/socket' });
    socket.on('connect', function (obj) {
        console.log('connect to server');
        socket.emit('LOGOUT_RQ', { userId: args[1]});
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
    }).on(['LOGOUT_RS'], function(obj) {
        console.log(obj);
    });
}
