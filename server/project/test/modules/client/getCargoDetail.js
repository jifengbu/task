var { post, client: { userId }, shop: { cargoId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    cargoId: args[0] || cargoId,
};

post('/shipper/getCargoDetail', param);
