var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
    content: '这是我的反馈',
    email: '42550564@qq.com',
};

post('/client/submitFeedback', param);
