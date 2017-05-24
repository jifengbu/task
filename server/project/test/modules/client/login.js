var io = require('socket.io-client');
var { post, saveClient, client } = require('../../utils');
var { host, clientPhone } = require('../../config');
var { apiRoot, port } = require('../../../config');
var args = process.argv.splice(2);

var param = {
    phone: clientPhone,
    password: '123456',
};

post('/client/login', param).then((obj) => {
    if (obj.success) {
        client.userId = obj.context.userId;
        saveClient(client);
        if (args[0] === '--socket') {
            console.log('ws://' + host + ':' + port);
            var socket = io.connect('ws://' + host + ':' + port);
            socket.on('connect', function (obj) {
                console.log('connect to server');
                socket.emit('TEST_RQ', { username: 'fang', password: '123456' });
            }).on('disconnect', function (obj) {
                console.log('disconnect to server');
            }).on('connect_error', function (obj) {
                console.error('connect to server error');
            }).on('connect_timeout', function (obj) {
                console.error('connect to server timeout');
            }).on('reconnect', function (obj) {
                console.log('magenta@reconnect to server');
            }).on('reconnect_failed', function (obj) {
                console.error('reconnect to server failed');
            }).on('USER_LOGIN_RS', function (obj) {
                console.log(obj);
            });
        }
    }
});
