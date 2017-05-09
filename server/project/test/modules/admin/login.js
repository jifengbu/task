var { post, saveAdmin, admin } = require('../../utils');

var param = {
    phone: '18085192480',
    password: '123456',
};

post('/admin/login', param).then((obj) => {
    if (obj.success) {
        admin.userId = obj.context.userId;
        saveAdmin(admin);
    }
});
