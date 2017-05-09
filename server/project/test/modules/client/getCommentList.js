var { post, client: { userId }, shipper: { roadmapId } } = require('../../utils');

var param = {
    userId,
    roadmapId,
    pageNo: 0,
    pageSize: 3,
};

post('/client/getCommentList', param);
