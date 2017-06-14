'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');
const moment = require('moment');

const ITEM_NAME = 'CUSTOM_TIME';

class Manager extends EventEmitter {
    constructor () {
        super();
        this.list = [];
        this.isStart = true;
        this.isPublish = false;
        this.get();
    }
    get () {
        return new Promise(async(resolve, reject) => {
            let list = [];
            try {
                const infoStr = await AsyncStorage.getItem(ITEM_NAME);
                list = JSON.parse(infoStr);
            } catch (e) {
                list = [];
            }
            this.list = list || [];
        });
    }
    set (list) {
        return new Promise(async(resolve, reject) => {
            this.list = list;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(list));
            resolve();
        });
    }
    setTiming() {
        if (this.isStart) {
            console.log('<><><>');
            this.intervalID = setInterval(() => {
                if (this.list.length === 0) {
                    clearInterval(this.intervalID);
                    this.intervalID = null;
                    this.isStart = false;
                }
                let date = _.first(this.list);
                let time = '';
                if (!date) {
                    return;
                } else {
                    time = date.time;
                }
                const startMoment = moment(time), nowMoment = moment();
                const isNotice = moment(startMoment).isBefore(moment(nowMoment));
                console.log('..>...',this.list,startMoment.format('YYYY-MM-DD HH:mm:ss'),nowMoment.format('YYYY-MM-DD HH:mm:ss'));
                console.log('<',this.intervalID,isNotice,this.isPublish);
                if (this.intervalID != null && isNotice && this.isPublish) {

                    this.emit('TIMING_TASK_EVENT', date);
                    console.log('TIMING_TASK_EVENT',date);
                    _.remove(this.list, (o) => o === date);
                    if (this.list.length === 0) {
                        clearInterval(this.intervalID);
                        this.intervalID = null;
                        this.isStart = false;
                        this.set(this.list);
                    }
                }
            }, 1000);
        }
    }
    getCustomTimes(id) {
        let time = '';
        for (var i = 0; i < this.list.length; i++) {
            let date = _.find(this.list[i].timeText,(o) => o.id === id);
            if (date) {
                time = this.list[i].time;
            }
        }
        return time;
    }
    setCustomTime (time, id, content,title,type) {
        console.log('...',time,id,content,title,type,this.isStart,this.isPublish);
        if (!this.isStart) {
            this.isStart = true;
            this.setTiming();
        }
        const date = _.find(this.list, (item) => item.time === time);
        if (date) {
            date.timeText.push({id,content,title});
        } else {
            this.list.push({ time:time, type: type, timeText:[{id, content, title}]});
        }
        this.list.sort(function(a,b){
            return !moment(a.time).isBefore(moment(b.time));
        });
        this.set(this.list);
    }
    clear () {
        this.list = [];
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
