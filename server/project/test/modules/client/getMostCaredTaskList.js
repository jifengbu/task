var { post, client: { userId } } = require('../../utils');
var args = process.argv.splice(2);

var param = {
    userId,
    count: args[0] || 10,
};

post('/client/getMostCaredTaskList', param);
