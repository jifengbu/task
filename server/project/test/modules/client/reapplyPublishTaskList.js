var { until, post, client: { userId } } = require('../../utils');

var param = {
    userId,
    taskId: '593e4cec0d97685edf06f828',
};

post('/client/reapplyPublishTaskList', param);
