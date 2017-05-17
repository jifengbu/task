var { post, admin: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    keyword: args[0] || '',
    pageNo: 0,
    pageSize: 3,
};

post('/admin/getClientList', param);
