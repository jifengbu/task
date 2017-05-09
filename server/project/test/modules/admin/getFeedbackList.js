var { post, admin: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    type: '',
    keyword: args[0] || '',
    pageNo: 0,
    pageSize: 3,
};

post('/admin/getFeedbackList', param);
