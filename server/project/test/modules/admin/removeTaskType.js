var { post, admin: { userId, taskTypeId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    taskTypeId: args[0] || taskTypeId,
};

post('/admin/removeTaskType', param);
