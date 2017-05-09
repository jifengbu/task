var { post, client: { userId, orderId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    orderId: orderId || args[0],
};

post('/client/getOrderDetail', param);
