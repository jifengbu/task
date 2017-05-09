var { post, client: { userId } } = require('../../utils');

var param = {
    userId,
    pageNo: 0,
    pageSize: 3,
};

post('/client/getCollectionRoadmapList', param);
