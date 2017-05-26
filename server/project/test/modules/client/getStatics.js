var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
    typeList: [1, 2, 3],
};

post('/client/getStatics', param);
