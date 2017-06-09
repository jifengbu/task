'use strict';
const React = require('react');
const Secretary = require('../secretary');
const Leader = require('../leader');
const Executor = require('../executor');
const Supervisor = require('../supervisor');

module.exports = React.createClass({
    componentDidMount() {
        //1：普通权限 2：拥有领导权限，4：拥有综合部权限，8：拥有监督者权限
        const component = {
            '1': Supervisor,
            '2': Leader,
            '4': Secretary,
            '8': Supervisor,
        }[app.personal.info.authority];
        app.navigator.replace({
            component,
        });
    },
    render () {
        return null;
    },
});
