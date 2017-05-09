var { post, client: { userId }, shipper: { roadmapId } } = require('../../utils');

var param = {
    userId,
    roadmapId,
};

post('/client/collectionRoadmap', param);
