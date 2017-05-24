var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    pageNo: 0,
    pageSize: 3,
};

post('/client/getApplyPublishTaskList', param);
