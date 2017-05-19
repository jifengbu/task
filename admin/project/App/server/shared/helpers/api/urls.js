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
    createPartment: server + 'createPartment', // 创建部门
    modifyPartment: server + 'modifyPartment', // 修改部门信息
    removePartment: server + 'removePartment', // 删除部门

    //用户
    clients: server + 'getClientList', // 获取用户列表
    client: server + 'getClientDetail', // 获取人员详情
    createClient: server + 'createClient', // 创建人员
    modifyClient: server + 'modifyClient', // 修改人员信息
    removeClient: server + 'removeClient', // 删除人员
};
