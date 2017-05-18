var { post, admin: { userId, partmentId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    partmentId: args[0] || partmentId,
};

post('/admin/getPartmentDetail', param);
