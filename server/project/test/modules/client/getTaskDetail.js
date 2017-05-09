var { post, client: { userId, taskId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    taskId: taskId || args[0],
};

post('/client/getTaskDetail', param);
