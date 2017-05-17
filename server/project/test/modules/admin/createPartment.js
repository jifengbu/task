var { post, admin: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    name: '工信部',
    descript: '这是最好的一个部门',
    phoneList: ['0851-98989000', '0851-98989001'],
};

post('/admin/createPartment', param);
