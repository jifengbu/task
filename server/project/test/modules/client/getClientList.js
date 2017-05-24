var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    authority: args[0] || 1,
};

post('/client/getClientList', param);
