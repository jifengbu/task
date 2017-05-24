var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    isExecutor: !!args[0],
    pageNo: 0,
    pageSize: 3,
};

post('/client/getRejectFinishTaskList', param);
