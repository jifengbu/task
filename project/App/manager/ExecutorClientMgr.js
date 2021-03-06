'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');

class Manager extends EventEmitter {
    constructor () {
        super();
        this.list = [];
    }
    getList () {
        return this.list;
    }
    setList (list) {
        this.list = list;
    }
    clear () {
        this.list = [];
    }
}

module.exports = new Manager();
