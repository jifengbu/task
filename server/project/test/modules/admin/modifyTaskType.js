var { post, admin: { userId, taskTypeId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    taskTypeId: args[0] || taskTypeId,
    key: 1,
    name: '普通任务',
};

post('/admin/modifyTaskType', param);
