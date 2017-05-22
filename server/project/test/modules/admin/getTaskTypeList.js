var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
};

post('/admin/getTaskTypeList', param);
