var { post, client: { userId, scheduleId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    taskId: args[0],
    reason: '不合格',
};

post('/client/rejectFinishTask', param);
