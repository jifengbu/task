const moment = require('moment');
module.exports = {
    until (test, iterator, callback) {
        if (!test()) {
            iterator((err) => {
                if (err) {
                    return callback(err);
                }
                this.until(test, iterator, callback);
            });
        } else {
            callback();
        }
    },
    toThousands (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    getPercentages (list) {
        const sum = _.sum(list);
        return list.map((v) => Math.round(v * 100 / sum) + '%');
    },
    date2str (date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        (month < 10) && (month = '0' + month);
        (day < 10) && (day = '0' + day);
        return year + '-' + month + '-' + day;
    },
    dateFormat (date, fmt) {
        const o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
        return fmt;
    },
    getVisibleText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n + 2) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen) + '..';
        }
        return text;
    },
    cutLimitText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen);
        }
        return text;
    },
    getCurrentDateStr () {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        (month < 10) && (month = '0' + month);
        (day < 10) && (day = '0' + day);
        return year + '-' + month + '-' + day;
    },
    str2date (str) {
        return new Date(str);
    },
    checkPhone (phone) {
        return /^1\d{10}$/.test(phone);
    },
    checkIdentifyNumber (number) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(number);
    },
    checkPassword (pwd) {
        return /^[\d\w_]{6,20}$/.test(pwd);
    },
    checkVerificationCode (code) {
        return /^\d{6}$/.test(code);
    },
    checkMailAddress (code) {
        const reg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(code);
    },
    createDateData (now) {
        const date = [];
        const iy = now.year(), im = now.month() + 1, id = now.date();
        for (let y = iy; y <= iy + 1; y++) {
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    let leapMonth = (!(y % 4) & (!!(y % 100))) | (!(y % 400)) ? 29 : 28;
                    for(let k=1;k<=leapMonth;k++){
                        day.push(k+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[y+'年'] = month;
            date.push(_date);
        }
        return date;
    },
    createTimeData (now) {
        const time = []
        const ih = now.hour(), it = now.minute();
        const iih = this.isToday ? ih : 0;
        for (let h = iih; h < 24; h++) {
            const minute = [];
            const iit = (this.isToday && h == ih) ? it : 0;
            for (let t = iit; t < 60; t++) {
                minute.push(t + '分');
            }
            let _time = {};
            _time[h + '时'] = minute;
            time.push(_time);
        }
        return time;
    },
    getSurplusTimeString (str) {
        const now = moment();
        const time = moment(str);
        const days = time.diff(moment(), 'days');
        const hours = time.diff(moment(), 'hours');
        const mut = time.diff(moment(), 'minutes');
        if (days >= 1) {
            return (days + '天');
        } else {
            if (hours >= 1) {
                return (hours + '小时');
            } else {
                return mut>0?(mut + '分钟'):'已过期';
            }
        }
    },
};
