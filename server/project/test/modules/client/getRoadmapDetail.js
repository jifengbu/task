var { post, client: { userId }, shipper: { roadmapId } } = require('../../utils');
var args = process.argv.splice(2);

var param = {
    userId,
    roadmapId: args[0] || roadmapId,
};

post('/client/getRoadmapDetail', param);
