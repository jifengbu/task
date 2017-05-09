var { post, admin: { userId } } = require('../../utils');
var param = {
    userId,
    oldPassword: '123456',
    newPassword: '123',
};

post('/admin/modifyPassword', param);
