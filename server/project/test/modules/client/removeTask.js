var { post, client: { userId, taskId } } = require('../../utils');

var param = {
    userId,
    taskId,
};

post('/client/removeTask', param);
