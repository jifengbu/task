'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');

const ITEM_NAME = 'TASK_TYPE';

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
                list = [];
            }
            this.list = list;
        });
    }
    set (list) {
        return new Promise(async(resolve, reject) => {
            this.list = list;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(list));
            resolve();
        });
    }
    getList () {
        return this.list;
    }
    setList (list) {
        this.set(list)
    }
    clear () {
        this.list = [];
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
