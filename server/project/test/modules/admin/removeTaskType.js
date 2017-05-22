var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    taskTypeId,
};

post('/admin/removeTaskType', param);
