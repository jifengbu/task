var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    clientId: args[0] || userId,
};

post('/client/getClientDetail', param);
