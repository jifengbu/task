var { post, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    taskId: args[0],
    title: 'fang'
};

post('/client/modifyGroupTask', param);
