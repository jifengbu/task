var { post, saveClient, client } = require('../../utils');
var { clientPhone } = require('../../config');
var args = process.argv.splice(2);

var param = {
    phone: args[0] || clientPhone,
    password: '123456',
};

post('/client/login', param).then((obj) => {
    if (obj.success) {
        client.userId = obj.context.userId;
        saveClient(client);
    }
});
