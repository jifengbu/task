'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = ReactNative;

const Button = require('./Button.js');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            title: '温馨提示',
            content: '确定要执行操作吗？',
            cancelText: '取消',
            confirmText: '确定',
        };
    },
    doConfirm () {
        app.closeModal();
        this.props.doConfirm && this.props.doConfirm();
    },
    render () {
        const {title, content, cancelText, confirmText} = this.props;
        const hasTwoButton = !!this.props.doConfirm;
        return (
            <View style={styles.overlayContainer}>
                <View style={styles.container}>
                    <Text style={[styles.title, {color: app.THEME_COLOR}]}>{title}</Text>
                    <Text style={[styles.redLine, {backgroundColor: app.THEME_COLOR}]} />
                    <Text style={styles.content}>
                        {content}
                    </Text>
                    <Text style={styles.H_Line} />
                    <View style={styles.buttonViewStyle}>
                        {hasTwoButton &&
                            <TouchableHighlight
                                underlayColor='rgba(0, 0, 0, 0)'
                                onPress={app.closeModal}
                                style={styles.buttonStyleContain}>
                                <Text style={styles.buttonStyle}>{cancelText}</Text>
                            </TouchableHighlight>
                        }
                        {hasTwoButton &&
                            <Text style={styles.line} />
                        }
                        <TouchableHighlight
                            underlayColor='rgba(0, 0, 0, 0)'
                            onPress={this.doConfirm}
                            style={styles.buttonStyleContain}>
                            <Text style={styles.buttonStyle} >{confirmText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    buttonViewStyle: {
        flexDirection: 'row',
        width: sr.w * 5 / 6 - 20,
        height: 40,
    },
    H_Line: {
        marginTop: 10,
        width: sr.w * 5 / 6,
        height: 1,
        backgroundColor: '#b4b4b4',
    },
    redLine: {
        marginTop: 10,
        width: sr.w - 110,
        height: 1,
    },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#b4b4b4',
    },
    buttonStyleContain: {
        height: 50,
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyle: {
        fontSize: 15,
        color: '#000000',
    },
    container: {
        width:sr.w * 5 / 6,
        height:sr.h / 4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
    },
    title: {
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    content: {
        alignSelf:'center',
        color:'#000000',
        margin: 20,
    },
    overlayContainer: {
        position:'absolute',
        bottom: 0,
        alignItems:'center',
        justifyContent: 'center',
        width:sr.w,
        height:sr.h,
    },
});
