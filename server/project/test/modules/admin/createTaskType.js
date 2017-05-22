var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    type: 1,
    name: '类型1',
};

post('/admin/createTaskType', param);
