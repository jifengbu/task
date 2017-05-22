var { post, client: { userId, scheduleId } } = require('../../utils');

var param = {
    userId,
    scheduleId,
};

post('/client/removeSchedule', param);
