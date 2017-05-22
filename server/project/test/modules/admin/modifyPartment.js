var { post, admin: { userId, partmentId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    partmentId: args[0] || partmentId,
    name: '工信部456',
};

post('/admin/modifyPartment', param);
