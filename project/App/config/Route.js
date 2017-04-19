'use strict';

const { BASE_SERVER } = CONSTANTS;
const ROOT_SERVER = 'http://' + BASE_SERVER + '/';
const HTTP_SERVER = ROOT_SERVER + 'cardb/';
const API_SERVER = ROOT_SERVER + 'api/';
const SERVER = API_SERVER + 'cardb/';

module.exports = {
    // 登录
    ROUTE_REGISTER: SERVER + 'register', // 注册
    ROUTE_LOGIN: SERVER + 'login', // 1登录
    ROUTE_FIND_PASSWORD: SERVER + 'findPassword', // 忘记密码
    ROUTE_MODIFY_PASSWORD: SERVER + 'modifyPassword', // 修改密码

    // 个人中心
    ROUTE_GET_PERSONAL_INFO: SERVER + 'getShopInfo', // 获取店铺信息
    ROUTE_SUBMIT_FEEDBACK: SERVER + 'submitFeedback', // 提交信息反馈

    // 商家
    ROUTE_GET_CONSUME_RECORD: SERVER + 'getConsumeRecord', // 拉取店铺消费记录
    ROUTE_PUBLISH_CARD: SERVER + 'publishCard', // 发卡
    ROUTE_APPLY_PUBLISH_CARD_RIGHTS: SERVER + 'applyPublishCardRights', // 申请发卡权限

    // 客户
    ROUTE_GET_CUSTOMER_LIST: SERVER + 'getCustomerList', // 获取客户列表
    ROUTE_GET_CUSTOMER_DETAIL: SERVER + 'getCustomerDetail', // 获取客户详情
    ROUTE_CUSTOMER_CONSUME: SERVER + 'customerConsume', // 客户消费

    // 公共接口
    ROUTE_UPDATE_FILE: API_SERVER + 'uploadFile', // 上传文件
    ROUTE_GET_NOTIFY_LIST: API_SERVER + 'notify', // 获取通知列表
    ROUTE_GET_STATISTICS: API_SERVER + 'getStatistics', // 获取统计数据

    // 网页地址
    ROUTE_USER_LICENSE: HTTP_SERVER + 'protocals/user.html', // 用户协议
    ROUTE_SOFTWARE_LICENSE: HTTP_SERVER + 'protocals/software.html', // 获取软件许可协议
    ROUTE_ABOUT_PAGE: HTTP_SERVER + 'protocals/about.html', // 关于

    // 下载更新
    ROUTE_VERSION_INFO_URL: HTTP_SERVER + 'app/version.json', // 版本信息地址
    ROUTE_JS_ANDROID_URL: HTTP_SERVER + 'app/jsandroid.zip', // android jsbundle 包地址
    ROUTE_JS_IOS_URL: HTTP_SERVER + 'app/jsios.zip', // ios jsbundle 包地址
    ROUTE_APK_URL: HTTP_SERVER + 'app/cardc.apk', // apk地址
};
