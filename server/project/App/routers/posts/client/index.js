// common
export login from './common/login';// 登录
export register from './common/register';// 注册
export findPassword from './common/findPassword';// 找回密码
export modifyPassword from './common/modifyPassword';// 修改密码
export getPersonalInfo from './common/getPersonalInfo';// 获取个人信息
export modifyPersonalInfo from './common/modifyPersonalInfo'; // 修改个人信息
export submitFeedback from './common/submitFeedback'; // 提交反馈意见


export getTaskTypeList from './task/getTaskTypeList'; // 获取任务类型列表
export getTaskListByType from './task/getTaskListByType'; // 通过任务类型获取列表
export searchTaskList from './task/searchTaskList'; // 搜索任务列表
export getMostCaredTaskList from './task/getMostCaredTaskList'; // 获取最关心任务列表
// 领导端
export leaderCreateTask from './task/leader/leaderCreateTask'; // 领导创建任务
export leaderGetToExamineTaskList from './task/leader/leaderGetToExamineTaskList'; // 获取待审核的任务列表
export leaderGetDenyPublishTaskList from './task/leader/leaderGetDenyPublishTaskList'; // 获取打回任务列表
// 秘书端
export secretaryCreateTask from './task/secretary/secretaryCreateTask'; // 秘书创建任务
export secretaryGetDenyPublishTaskList from './task/secretary/secretaryGetDenyPublishTaskList'; // 获取打回任务列表


// schedule
export createSchedule from './schedule/createSchedule'; // 创建日程
export modifySchedule from './schedule/modifySchedule'; // 修改日程
export removeSchedule from './schedule/removeSchedule'; // 删除日程
export getScheduleList from './schedule/getScheduleList'; // 获取日程列表

//client
export getClientList from './client/getClientList'; // 获取用户列表
export getClientDetail from './client/getClientDetail'; // 获取用户详情
