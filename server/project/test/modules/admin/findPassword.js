var { post } = require('../../utils');

var param = {
    phone: '18085192480',
    email: '42550564@qq.com',
};

post('/admin/findPassword', param);
