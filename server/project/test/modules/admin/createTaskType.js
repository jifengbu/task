var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
    key,
    name,
};

post('/admin/createTaskType', param);
