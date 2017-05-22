var { post, saveAdmin, admin, admin: { userId } } = require('../../utils');

var param = {
    userId,
};

post('/admin/getTaskTypeList', param).then((obj) => {
    if (obj.context.taskTypeList.length) {
        admin.taskTypeId = obj.context.taskTypeList[0].id;
        saveAdmin(admin);
    }
});
