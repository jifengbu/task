import _ from 'lodash';
import moment from 'moment';
import nodemailer from 'nodemailer';
import { host, port, apiRoot } from '../../config';

export function registerUser (model, user, password) {
    return new Promise((resolve) => {
        model.register(user, password, (error) => {
            if (error) {
                resolve(error.name);
            }
            resolve();
        });
    });
}
export function setPassword (user, password) {
    return new Promise((resolve) => {
        user.setPassword(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                resolve(passwordErr);
            }
            resolve();
        });
    });
}
export function authenticatePassword (user, password) {
    return new Promise((resolve) => {
        user.authenticate(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                resolve(passwordErr);
            }
            resolve();
        });
    });
}
export function genRandomPassword () {
    let pwd = '';
    let ranges = [[48, 57], [65, 90], [97, 122]];
    for (let i = 0; i < 6; i++) {
        let range = ranges[_.random(0, 2)];
        pwd += String.fromCharCode(_.random(range[0], range[1]));
    }
    return pwd;
}
export function getMediaPath (id) {
    return id ? 'http://' + host + ':' + port + apiRoot + '/image?id=' + id : undefined;
}
export function getMediaId (url) {
    return url ? url.replace(/.*id=/, '') : undefined;
}
export function getKeywordCriteriaForTask (keyword, criteria = {}) {
    if (keyword) {
        const regex = new RegExp('.*' + (keyword || '') + '.*', 'gim');
        criteria = _.omitBy(criteria, _.isNil);
        criteria = { ...criteria, $or: [{ name: regex }, { phone: regex }] };
    }
    return criteria;
}
export function getKeywordCriteriaForClient (keyword, criteria = {}) {
    if (keyword) {
        const regex = new RegExp('.*' + (keyword || '') + '.*', 'gim');
        criteria = _.omitBy(criteria, _.isNil);
        criteria = { ...criteria, $or: [{ name: regex }, { phone: regex }] };
    }
    return criteria;
}
export function getKeywordCriteriaForPartment (keyword, criteria = {}) {
    if (keyword) {
        const regex = new RegExp('.*' + (keyword || '') + '.*', 'gim');
        criteria = _.omitBy(criteria, _.isNil);
        criteria = { ...criteria, $or: [{ name: regex }, { phone: regex }] };
    }
    return criteria;
}
export function omitNil (obj) {
    return _.omitBy(obj, _.isNil);
}
export function formatMedia (obj, ...keys) {
    for (var key of keys) {
        obj[key] = getMediaPath(obj[key]);
    }
}
export function formatTime (obj, ...keys) {
    for (var key of keys) {
        obj[key] && (obj[key] = moment(obj[key]).format('YYYY-MM-DD HH:mm:ss'));
    }
}
export function testPhone(phone) {
    return /^1\d{10}$/.test(phone);
}
export function sendFindPasswordMail (address, password) {
    const name = '刷我的卡';
    const serverName = '刷我的卡官网';
    const serverUrl = 'mailto:cocos@chukong-inc.com';
    const transporter = nodemailer.createTransport({
        host: 'smtp.163.com',   // 支持列表 https://github.com/andris9/nodemailer-wellknown#supported-services
        port: 25, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: 'use_myself_card@163.com',
            pass: 'card123456',
        },
    });
    const options = {
        from: 'use_myself_card@163.com', // 发件地址
        to: address, // 收件列表
        subject: `【${name}】请在30分钟内重设您的密码`, // 标题
        html: `
        <div style="border-top:1px solid #808080;margin:0px 0 10px;padding:20px 0">
                <p style="font-size:14px;font-weight:bold;font-family:'Helvetica Neue',Helvetica,STheiti,Arial,Tahoma,微软雅黑,sans-serif,serif;color:#222;padding:0;margin:0">${address}</span>，感谢您使用刷我的卡帐号</p>
                <div style="font-size:14px;font-family:'Helvetica Neue',Helvetica,STheiti,Arial,Tahoma,微软雅黑,sans-serif,serif;color:#464646;padding:0;margin:20px 0 5px;line-height:1.6">您正在申请重新设置您的${name}帐号密码，请确认是本人操作</div>
                <div style="font-size:14px;font-family:'Helvetica Neue',Helvetica,STheiti,Arial,Tahoma,微软雅黑,sans-serif,serif;color:#464646;padding:0;margin:20px 0 5px;line-height:1.6">你的重置密码为：${password}，请在30分钟内在${name}App中修改密码。</div>
                <p style="font-size:12px;font-family:'Helvetica Neue',Helvetica,STheiti,Arial,Tahoma,微软雅黑,sans-serif,serif;color:#666;padding:0;margin:0;line-height:1.6">如您有任何问题，请联系：<a href="${serverUrl}" target="_blank">${serverName}</a></p>
                <p style="font-size:12px;font-family:'Helvetica Neue',Helvetica,STheiti,Arial,Tahoma,微软雅黑,sans-serif,serif;color:#666;padding:0;margin:0;line-height:1.6">${name}帐号系统</p>
        </div>
        `, // 内容
    };
    return new Promise(async (resolve) => {
        transporter.sendMail(options, (error, info) => {
            console.log(error, info);
            if (error) {
                resolve(false);
            }
            resolve(true);
        });
    });
}
