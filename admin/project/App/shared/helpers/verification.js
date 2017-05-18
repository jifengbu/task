import moment from 'moment';

export default {
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
    chineseWeekDay (day) {
        return ['日', '一', '二', '三', '四', '五', '六'][day];
    },
    chineseNumber (n) {
        return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][n - 1] || n;
    },
    numberFormat (n) {
        return (n < 10 ? '0' : '') + n;
    },
    timeFormat (hour, minute, second) {
        if (second === undefined) { second = minute; minute = hour; hour = undefined; }
        return (hour === undefined ? '' : (hour < 10 ? '0' : '') + hour + ':') + (minute < 10 ? '0' : '') + minute + ':' + (second < 10 ? '0' : '') + second;
    },
    checkPhone (phone) {
        return /^1\d{10}$/.test(phone);
    },
    checkPassword (pwd) {
        return /^[\d\w_]{6,20}$/.test(pwd);
    },
    checkVerificationCode (code) {
        return /^\d{6}$/.test(code);
    },
    checkNumberCode (code) {
        return /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(code);
    },
    checkBankCardCode (code) {
        return /^(\d{16}|\d{19})$/.test(code);
    },
    checkEmailCode (code) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (re.test(code)) {
            return true;
        } else {
            return false;
        }
    },
};
