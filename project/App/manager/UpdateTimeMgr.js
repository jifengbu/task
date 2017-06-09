'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');

const ITEM_NAME = 'UPDATE_TIME';

class Manager extends EventEmitter {
    constructor () {
        super();
        this.list = [];
        this.get();
    }
    get () {
        return new Promise(async(resolve, reject) => {
            let list = [];
            try {
                const infoStr = await AsyncStorage.getItem(ITEM_NAME);
                list = JSON.parse(infoStr);
            } catch (e) {
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
    getListTimes (timeId) {
        const date = _.find(this.list, (item) => item.timeId === timeId);
        return date ? date.time : '';
    }
    setListTime (timeId, time) {
        const date = _.find(this.list, (item) => item.timeId === timeId);
        if (date) {
            date.time = time;
        } else {
            this.list.push({ timeId, time });
        }
        this.set(this.list);
    }
    clear () {
        this.list = [];
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
