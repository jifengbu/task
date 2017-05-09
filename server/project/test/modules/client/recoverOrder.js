var { post, client: { userId, orderId } } = require('../../utils');

var param = {
    userId,
    orderId,
};

post('/client/recoverOrder', param);
