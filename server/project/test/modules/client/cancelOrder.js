var { post, client: { userId, orderId } } = require('../../utils');

var param = {
    userId,
    orderId,
};

post('/client/cancelOrder', param);
