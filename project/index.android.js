'use strict';
var React = require('react');
var ReactNative = require('react-native');
var App = require('./App/index.js');

var GHwgh = React.createClass({
    render() {
        return(
            <App />
        );
    }
});

ReactNative.AppRegistry.registerComponent('GHwgh', () => GHwgh);
