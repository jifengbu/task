// common
export login from './common/login'; // 登录
export register from './common/register'; // 注册
export findPassword from './common/findPassword'; // 找回密码
export modifyPassword from './common/modifyPassword'; // 修改密码
export removeUnusedMedia from './common/removeUnusedMedia'; // 删除无用的media文件

//client
export getClientList from './client/getClientList'; // 获取用户列表
export getClientDetail from './client/getClientDetail'; // 获取用户详情
export createClient from './client/createClient'; // 创建人员
export modifyClient from './client/modifyClient'; // 修改人员
export removeClient from './client/removeClient'; // 删除人员

// partment
export getPartmentList from './partment/getPartmentList'; // 获取部门列表
export getPartmentDetail from './partment/getPartmentDetail'; // 获取部门详情
export createPartment from './partment/createPartment'; // 创建部门
export modifyPartment from './partment/modifyPartment'; // 修改部门
export removePartment from './partment/removePartment'; // 删除部门

// taskType
export getTaskTypeList from './taskType/getTaskTypeList'; // 获取任务类型列表
export createTaskType from './taskType/createTaskType'; // 创建任务类型
export modifyTaskType from './taskType/modifyTaskType'; // 修改任务类型
export removeTaskType from './taskType/removeTaskType'; // 删除任务类型
