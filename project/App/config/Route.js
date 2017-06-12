'use strict';

const { BASE_SERVER } = CONSTANTS;
const ROOT_SERVER = 'http://' + BASE_SERVER + '/';
const API_SERVER = ROOT_SERVER + 'api/client/';

module.exports = {
    // 登录
    ROUTE_REGISTER: API_SERVER + 'register', // 注册
    ROUTE_LOGIN: API_SERVER + 'login', // 1登录
    ROUTE_GET_APPLY_PUBLISH_TASK_LIST: API_SERVER + 'getApplyPublishTaskList', // 领导获取待审批的任务列表
    ROUTE_GET_SINGLE_TASK_DETAIL: API_SERVER + 'getSingleTaskDetail', // 获取单一任务的详情
    ROUTE_GET_GROUP_TASK_DETAIL: API_SERVER + 'getGroupTaskDetail', // 获取群组任务的详情
    ROUTE_REJECT_PUBLISH_TASK: API_SERVER + 'rejectPublishTask', // 打回任务
    ROUTE_AGREE_PUBLISH_TASK: API_SERVER + 'agreePublishTask', // 通过任务
    ROUTE_CREATE_REMIND: API_SERVER + 'createRemind', // 创建提醒
    ROUTE_MODIFY_REMIND: API_SERVER + 'modifyRemind', // 修改提醒
    ROUTE_LEADER_CREATE_TASK: API_SERVER + 'leaderCreateTask', // 创建单一任务
    ROUTE_GET_CLIENT_LIST: API_SERVER + 'getClientList', // 获取用户列表
    ROUTE_GET_PERSONAL_INFO: API_SERVER + 'getPersonalInfo', //  获取个人信息
    ROUTE_MODIFY_PERSONAL_INFO: API_SERVER + 'modifyPersonalInfo', //  修改个人信息
    ROUTE_GET_TASK_PROGRESS_LIST: API_SERVER + 'getTaskProgressList', //  获取进度列表
    ROUTE_UPDATE_TASK_PROGRESS: API_SERVER + 'updateTaskProgress', //  更新任务进度
    ROUTE_REMIND_TASK: API_SERVER + 'remindTask', //  提醒任务
    ROUTE_REJECT_FINISH_TASK: API_SERVER + 'rejectFinishTask', //  打回完成发布任务
    ROUTE_AGREE_FINISH_TASK: API_SERVER + 'agreeFinishTask', //  同意完成任务的申请
    ROUTE_MODIFY_PASSWORD: API_SERVER + 'modifyPassword', //  修改个人密码
    ROUTE_UPDATE_FILE: API_SERVER + 'uploadFile', //  上传文件
    ROUTE_SUBMIT_FEEDBACK: API_SERVER + 'submitFeedback', //  意见反馈
    ROUTE_APPLY_FINISH_TASK: API_SERVER + 'applyFinishTask', //  申请完成任务
    ROUTE_SECRETARY_CREATE_TASK: API_SERVER + 'secretaryCreateTask', //  申请完成任务
    ROUTE_MODIFY_TASK: API_SERVER + 'modifyTask', //  修改任务

    // 网页地址
    ROUTE_USER_LICENSE: API_SERVER + 'protocals/user.html', // 用户协议
    ROUTE_SOFTWARE_LICENSE: API_SERVER + 'protocals/software.html', // 获取软件许可协议
    ROUTE_ABOUT_PAGE: API_SERVER + 'protocals/about.html', // 关于

    // 下载更新
    ROUTE_VERSION_INFO_URL: API_SERVER + 'app/version.json', // 版本信息地址
    ROUTE_JS_ANDROID_URL: API_SERVER + 'app/jsandroid.zip', // android jsbundle 包地址
    ROUTE_JS_IOS_URL: API_SERVER + 'app/jsios.zip', // ios jsbundle 包地址
    ROUTE_APK_URL: API_SERVER + 'app/cardc.apk', // apk地址

    //领导端
    ROUTE_GET_TASK_TYPE_LIST: API_SERVER + 'getTaskTypeList', // 获取任务类型
    ROUTE_GET_SCHEDULE_LIST: API_SERVER + 'getScheduleList', // 获取日程列表
    ROUTE_REMOVE_SCHEDULE: API_SERVER + 'removeSchedule', // 删除日程
    ROUTE_MODIFY_SCHEDULE: API_SERVER + 'modifySchedule', // 修改日程
    ROUTE_CREATE_SCHEDULE: API_SERVER + 'createSchedule', // 增加日程
    ROUTE_FINISH_SCHEDULE: API_SERVER + 'finishSchedule', // 完成日程
    ROUTE_GET_TASK_LIST_BY_TYPE: API_SERVER + 'getTaskListByType', // 根据类型获取任务列表
    ROUTE_GET_MOST_CARED_TASK_LIST: API_SERVER + 'getMostCaredTaskList', // 获取最关心任务
    ROUTE_GET_REJECT_TASK_LIST: API_SERVER + 'getRejectTaskList', // 获取打回任务
    ROUTE_GET_APPLY_FINISH_TASK_LIST: API_SERVER + 'getApplyFinishTaskList', // 获取审批完成任务
    ROUTE_GET_STATICS: API_SERVER + 'getStatics', // 获取统计数据
};
