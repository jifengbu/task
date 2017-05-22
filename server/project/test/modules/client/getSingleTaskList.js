var { post, saveClient, client, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    type: 1,
    pageNo: 0,
    pageSize: 3,
};

post('/client/getSingleTaskList', param).then((obj) => {
    if (obj.context.taskList.length) {
        client.taskId = obj.context.taskList[0].id;
        saveClient(client);
    }
});
