var { post, client: { userId } } = require('../../utils');
var param = {
    userId,
    oldPassword: '123456',
    newPassword: '123',
};

post('/client/modifyPassword', param);
