var { post, client: { userId, scheduleId } } = require('../../utils');

var param = {
    userId,
    scheduleId,
    content: '测试日程123',
};

post('/client/modifySchedule', param);
