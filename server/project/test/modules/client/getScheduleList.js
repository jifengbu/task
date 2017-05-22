var { post, saveClient, client, client: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    pageNo: 0,
    pageSize: 3,
};

post('/client/getScheduleList', param).then((obj) => {
    if (obj.context.scheduleList.length) {
        client.scheduleId = obj.context.scheduleList[0].id;
        saveClient(client);
    }
});
