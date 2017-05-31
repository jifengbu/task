var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    key: 2,
    name: '加急任务',
};

post('/admin/createTaskType', param);
