'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    NativeModules,
} = ReactNative;

const TimerMixin = require('react-timer-mixin');
const FingerProtocal = require('./FingerProtocal.js');
const LocalDataMgr = require('../../manager/LocalDataMgr.js');
const { Button, WebviewMessageBox } = COMPONENTS;

import { DeviceEventEmitter } from 'react-native';
const UtilsModule = NativeModules.UtilsModule;
function registerEvents (callback, type) {
    if (callback) {
        DeviceEventEmitter.addListener(type, function (result) {
            callback(result);
        });
    }
}

module.exports = React.createClass({
    mixins: [TimerMixin],
    statics: {
        title: '指纹密码',
    },
    componentDidMount () {
        this.setTimeout(()=>{
            registerEvents(this.onFingerReturn, 'FINGER_RETURN');
            UtilsModule.fingerPrint();
        }, 400);
    },
    onFingerReturn(returnJson){
        // android 要弹toast。ios有界面，不用弹。
        let returnStr1 = "指纹功能启动失败";
        let returnStr2 = "当前设备没有设置密码";
        let returnStr3 = "当前设备没有设置指纹";
        let returnStr4 = "验证开始";
        let returnStr5 = "验证失败";
        let returnStr6 = "验证成功";
        let returnStr7 = "跳到用户登录界面";//ios使用。

        console.log('onFingerReturn-----', returnJson.result);
        switch (returnJson.result) {
            case 1:
                Toast(returnStr1);
                this.setTimeout(()=>{
                    app.navigator.pop();
                }, 200);
                break;
            case 2:
                Toast(returnStr2);
                this.setTimeout(()=>{
                    app.navigator.pop();
                }, 200);
                break;
            case 3:
                Toast(returnStr3);
                this.setTimeout(()=>{
                    app.navigator.pop();
                }, 200);
                break;
            case 4:
                Toast(returnStr4);
                break;
            case 5:
                Toast(returnStr5);
                this.setTimeout(()=>{
                    app.navigator.pop();
                }, 200);
                break;
            case 6:
                Toast('验证成功,开启指纹登录');
                LocalDataMgr.setValueAndKey('haveFinger', 1);
                break;
            case 7:
                Toast('用户使用密码登录');
                break;
        }
    },
    doShowProtocal () {
        app.navigator.push({
            component: FingerProtocal,
        });
    },
    getInitialState () {
        return {
            protocalRead: true,
            overlayShow:false,
        };
    },
    changeProtocalState () {
        this.setState({ protocalRead: !this.state.protocalRead });
    },
    render () {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode='stretch'
                    source={app.img.leader_finger}
                    style={styles.inputContainer}
                    />
                <Text style={styles.text_header1}>经开区任务根据提醒密码指纹服务</Text>
                <Text style={styles.text_header1}>开启后用于登录应用</Text>
                <View style={styles.lineContainer}/>
                <View style={styles.protocalContainer}>
                    <Button onPress={this.doShowProtocal} style={styles.protocal_button} textStyle={styles.protocal_button_text}>{'经开区任务根据提醒指纹服务协议   '}</Button>
                    <TouchableOpacity onPress={this.changeProtocalState}>
                        <Image
                            resizeMode='cover'
                            source={this.state.protocalRead ? app.img.leader_finger_prol_open : app.img.leader_finger_prol_close}
                            style={styles.protocal_icon}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 96,
        height: 100,
        marginTop: 40,
        alignSelf: 'center',
        marginBottom: 20,
    },
    text_header1: {
        marginTop: 10,
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
    },
    text_header2: {
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
    },
    text_input2: {
        marginLeft: 30,
        height: 40,
        width: 220,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    btnRegister: {
        height: 46,
        width: sr.w - 100,
        marginLeft: 50,
        marginTop: 20,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
    },
    btnRegisterText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#60BBC0',
    },
    lineContainer: {
        marginVertical: 10,
        height: 1,
        backgroundColor: '#999999',
        width: sr.w-40,
        marginLeft: 20,
    },
    protocalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    protocal_icon: {
        height: 18,
        width: 18,
        marginRight: 10,
    },
    protocal_text: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    protocal_button: {
        backgroundColor: 'white',
        height: 18,
    },
    protocal_button_text: {
        fontSize: 13,
        color: '#999999',
    },
});
