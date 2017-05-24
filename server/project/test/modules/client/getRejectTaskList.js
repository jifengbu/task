var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);
var roles = { 0: 'leader', 1: 'secretary', 2: 'executor' };
var param = {
    userId,
    role: roles[args[0] || 0],
    pageNo: 0,
    pageSize: 3,
};

post('/client/getRejectTaskList', param);
