var { post, admin: { userId }, client: { userId: clientId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    clientId: args[0] || clientId,
};

post('/admin/getClientDetail', param);
