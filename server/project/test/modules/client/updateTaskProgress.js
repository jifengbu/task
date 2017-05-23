var { post, client: { userId } } = require('../../utils');
var args = process.argv.splice(2);

var param = {
    userId,
    taskId: args[0],
    content: '测试进度',
};

post('/client/updateTaskProgress', param);
