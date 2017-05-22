var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
    content: '测试日程',
};

post('/client/createSchedule', param);
