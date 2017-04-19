'use strict';
const React = require('react');
const Secretary = require('../secretary');
const Leader = require('../leader');
const Executor = require('../executor');
const Supervisor = require('../supervisor');

module.exports = React.createClass({
    componentDidMount() {
        const component = {
            '18085192480': Secretary,
            '18085192481': Leader,
            '18085192482': Supervisor,
            '18085192483': Executor,
        }[app.personal.info.phone];
        app.navigator.replace({
            component,
        });
    },
    render () {
        return null;
    },
});
