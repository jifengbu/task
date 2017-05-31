var { post, admin: { userId, partmentId } } = require('../../utils');

var args = process.argv.splice(2);

if (!args[0]) {
    console.log("请传入clientId");
    process.exit(0);
}

var param = {
    userId,
    clientId: args[0],
    name: '方运江123',
    phone: '18085192484',
    partment: partmentId,
};

post('/admin/modifyClient', param);
