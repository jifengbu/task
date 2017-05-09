var { post, admin: { userId } } = require('../../utils');
var _ = require('lodash');

var types = [ 'news', 'publicity', 'policy', 'notice' ];
var titles = [
    '设置所属行业',
    '获得模板ID',
    '发送模板消息',
    '事件推送',
];
var contents = [
    '所有服务号都可以在功能->添加功能插件处看到申请模板消息功能的入口，但只有认证后的服务号才可以申请模板消息的使用权限并获得该权限',
    '需要选择公众账号服务所处的2个行业，每月可更改1次所选行业',
    '在所选择行业的模板库中选用已有的模板进行调用',
    '每个账号可以同时使用15个模板',
    '当前每个账号的模板消息的日调用上限为10万次，单个模板没有特殊限制。【2014年11月18日将接口调用频率从默认的日1万次提升为日10万次，可在MP登录后的开发者中心查看】。当账号粉丝数超过10W/100W/1000W时，模板消息的日调用上限会相应提升，以公众号MP后台开发者中心页面中标明的数字为准',
];

var param = {
    source: '刷我的卡官方平台',
    adminId: userId,
    type: types[_.random(0, 3)],
    title: titles[_.random(0, 3)],
    content: contents[_.random(0, 4)],
};

post('/sendNotify', param);
