var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
};

post('/client/getPersonalInfo', param);
