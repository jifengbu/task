// common
export login from './common/login';// 登录
export register from './common/register';// 注册
export findPassword from './common/findPassword';// 找回密码
export modifyPassword from './common/modifyPassword';// 修改密码
export getPersonalInfo from './common/getPersonalInfo';// 获取个人信息
export modifyPersonalInfo from './common/modifyPersonalInfo'; // 修改个人信息
export submitFeedback from './common/submitFeedback'; // 提交反馈意见

// task
export createTask from './task/createTask'; // 创建任务
export modifyTask from './task/modifyTask'; // 修改任务
export removeTask from './task/removeTask'; // 删除任务
export getTaskList from './task/getTaskList'; // 获取任务列表
export getTaskDetail from './task/getTaskDetail'; // 获取任务详情

// task
export createSchedule from './task/createSchedule'; // 创建日程
export modifySchedule from './task/modifySchedule'; // 修改日程
export removeSchedule from './task/removeSchedule'; // 删除日程
export getScheduleList from './task/getScheduleList'; // 获取日程列表
export getScheduleDetail from './task/getScheduleDetail'; // 获取日程详情

//client
export getClientList from './client/getClientList'; // 获取用户列表
export getClientDetail from './client/getClientDetail'; // 获取用户详情
