var { post, admin: { userId, partmentId } } = require('../../utils');

var param = {
    userId,
    partmentId,
};

post('/admin/removePartment', param);
