'use strict';
const React = require('react');
const Secretary = require('../secretary');
const Leader = require('../leader');
const Executor = require('../executor');
const Supervisor = require('../supervisor');

module.exports = React.createClass({
    componentDidMount() {
        const component = {
            '1': Executor,
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
