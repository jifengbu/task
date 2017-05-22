var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
};

post('/client/getTaskTypeList', param);
