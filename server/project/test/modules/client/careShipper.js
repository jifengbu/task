var { post, client: { userId }, shipper: { shipperId } } = require('../../utils');

var param = {
    userId,
    shipperId,
};

post('/client/careShipper', param);
