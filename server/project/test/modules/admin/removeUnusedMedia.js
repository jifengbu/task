var { post, admin: { userId } } = require('../../utils');

var param = {
    userId,
};

post('/admin/removeUnusedMedia', param);
