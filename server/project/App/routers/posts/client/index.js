// common
export login from './common/login';// 登录
export register from './common/register';// 注册
export findPassword from './common/findPassword';// 找回密码
export modifyPassword from './common/modifyPassword';// 修改密码
export getPersonalInfo from './common/getPersonalInfo';// 获取个人信息
export modifyPersonalInfo from './common/modifyPersonalInfo'; // 修改个人信息
export submitFeedback from './common/submitFeedback'; // 提交反馈意见

// task
export createSingleTask from './task/createSingleTask'; // 创建单一任务
export createGroupTask from './task/createGroupTask'; // 创建综合任务

export modifyTask from './task/modifyTask'; // 修改任务
export removeTask from './task/removeTask'; // 删除任务
export getTaskList from './task/getTaskList'; // 获取任务列表
export getTaskDetail from './task/getTaskDetail'; // 获取任务详情

// schedule
export createSchedule from './schedule/createSchedule'; // 创建日程
export modifySchedule from './schedule/modifySchedule'; // 修改日程
export removeSchedule from './schedule/removeSchedule'; // 删除日程
export getScheduleList from './schedule/getScheduleList'; // 获取日程列表

//client
export getClientList from './client/getClientList'; // 获取用户列表
export getClientDetail from './client/getClientDetail'; // 获取用户详情
