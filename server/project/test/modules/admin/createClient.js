var { post, admin: { userId, partmentId } } = require('../../utils');

var param = {
    userId,
    name: '方运江',
    phone: '18085192480',
    partment: partmentId,
};

post('/admin/createClient', param);
