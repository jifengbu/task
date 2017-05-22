var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    taskTypeId,
    key: 1,
    name: '普通任务',
};

post('/admin/modifyTaskType', param);
