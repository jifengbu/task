// common
export login from './common/login';// 登录
export register from './common/register';// 注册
export findPassword from './common/findPassword';// 找回密码
export modifyPassword from './common/modifyPassword';// 修改密码
export getPersonalInfo from './common/getPersonalInfo';// 获取个人信息
export modifyPersonalInfo from './common/modifyPersonalInfo'; // 修改个人信息
export submitFeedback from './common/submitFeedback'; // 提交反馈意见

// task
export getTaskTypeList from './task/getTaskTypeList'; // 获取任务类型列表
export getTaskListByType from './task/getTaskListByType'; // 通过任务类型获取列表
export getMostCaredTaskList from './task/getMostCaredTaskList'; // 获取最关心任务列表
export getGroupTaskDetail from './task/getGroupTaskDetail'; // 获取群组任务的详情
export getSingleTaskDetail from './task/getSingleTaskDetail'; // 获取单一任务的详情
export modifyGroupTask from './task/modifyGroupTask'; // 修改群组任务
export modifyTask from './task/modifyTask'; // 修改单一任务
export removeGroupTask from './task/removeGroupTask'; // 删除群组任务
export removeTask from './task/removeTask'; // 删除单一任务

export leaderCreateTask from './task/leaderCreateTask'; // 领导创建任务
export secretaryCreateTask from './task/secretaryCreateTask'; // 秘书创建任务
export getApplyPublishTaskList from './task/getApplyPublishTaskList'; // 获取待审核发布的任务列表
export agreePublishTask from './task/agreePublishTask'; // 同意发布任务
export rejectPublishTask from './task/rejectPublishTask'; // 不同意发布任务

export applyFinishTask from './task/applyFinishTask'; // 申请完成任务
export getApplyFinishTaskList from './task/getApplyFinishTaskList'; // 获取待审核完成的任务列表
export agreeFinishTask from './task/agreeFinishTask'; // 同意完成任务
export rejectFinishTask from './task/rejectFinishTask'; // 不同意完成任务

export getRejectTaskList from './task/getRejectTaskList'; // 获取打回任务列表

// schedule
export createSchedule from './schedule/createSchedule'; // 创建日程
export modifySchedule from './schedule/modifySchedule'; // 修改日程
export removeSchedule from './schedule/removeSchedule'; // 删除日程
export getScheduleList from './schedule/getScheduleList'; // 获取日程列表
export finishSchedule from './schedule/finishSchedule'; // 完成日程

// progress
export getTaskProgressList from './progress/getTaskProgressList'; // 获取任务进度列表
export remaindTask from './progress/remaindTask'; // 提醒任务
export updateTaskProgress from './progress/updateTaskProgress'; // 更新任务进度

// client
export getClientList from './client/getClientList'; // 获取用户列表
export getClientDetail from './client/getClientDetail'; // 获取用户详情
