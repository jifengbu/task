var { apiServer } = require('../../../../../config.js');
var server = apiServer + 'admin/';

module.exports = {
    login: server + 'login', // 登录
    register: server + 'register', // 注册
    forgotPwd: server + 'findPassword', // 忘记密码
    modifyPassword: server + 'modifyPassword', // 修改密码

    //部门
    partments: server + 'getPartmentList', // 获取部门列表
    partment: server + 'getPartmentDetail', // 获取部门详情
};
