var { post } = require('../../utils');
var { clientPhone } = require('../../config');
var args = process.argv.splice(2);

var param = {
    phone: args[0] || clientPhone,
    email: '42550564@qq.com',
};

post('/client/findPassword', param);
