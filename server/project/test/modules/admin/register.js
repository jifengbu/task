var { post } = require('../../utils');

var param = {
    phone: '18085192480',
    password: '123456',
    email: '42550564@qq.com',
};

post('/admin/register', param);
