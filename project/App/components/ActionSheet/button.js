'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} = ReactNative;

module.exports = React.createClass({
    render () {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.button, this.props.buttonStyle]}
                onPress={this.props.onPress}>
                <Text style={[styles.buttonText, this.props.textStyle]}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    },
});

const styles = StyleSheet.create({
    buttonText: {
        color: '#A1A2A3',
        alignSelf: 'center',
        fontSize: 18,
    },
    button: {
        height: 50,
        backgroundColor: '#FEFFFF',
        borderColor: '#EDEEEF',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
});
