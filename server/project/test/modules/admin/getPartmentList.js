var { post, saveAdmin, admin, admin: { userId } } = require('../../utils');

var args = process.argv.splice(2);

var param = {
    userId,
    keyword: args[0] || '',
    pageNo: 0,
    pageSize: 3,
};

post('/admin/getPartmentList', param).then((obj) => {
    if (obj.context.partmentList.length) {
        admin.partmentId = obj.context.partmentList[0].id;
        saveAdmin(admin);
    }
});
