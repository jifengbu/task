'use strict';

const React = require('react');const {    PropTypes,} = React;const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} = ReactNative;

const DEFAULT_OPACITY = 0.2;

module.exports = React.createClass({
    propTypes: {
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        textStyle: Text.propTypes.style,
        activeOpacity: PropTypes.number,
    },
    render () {
        const touchableProps = {
            activeOpacity: this.props.disable ? 1 : this.props.activeOpacity ? this.props.activeOpacity : DEFAULT_OPACITY,
        };
        if (!this.props.disable) {
            touchableProps.onPress = this.props.onPress;
        }
        return (
            <TouchableOpacity
                style={[styles.container, { backgroundColor:app.THEME_COLOR }, this.props.style]} {...touchableProps}
                testID={this.props.testID}>
                <Text style={[styles.text, this.props.disable ? styles.disableText : null, this.props.textStyle]}
                    numberOfLines={1}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    disableText: {
        color: '#dcdcdc',
    },
});
