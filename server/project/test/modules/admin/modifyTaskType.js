var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    taskTypeId,
    key,
    name,
};

post('/admin/modifyTaskType', param);
