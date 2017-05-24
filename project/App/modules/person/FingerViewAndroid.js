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
const { Button, WebviewMessageBox } = COMPONENTS;
const FingerProtocal = require('./FingerProtocal.js');

import { DeviceEventEmitter } from 'react-native';
const UtilsModule = NativeModules.UtilsModule;
const LocalDataMgr = require('../../manager/LocalDataMgr.js');

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
    doOk () {
        this.setState({showFinger: false});
    },
    componentDidMount () {
        this.haveFinger = LocalDataMgr.getValueFromKey('haveFinger');
        if (this.haveFinger && this.haveFinger==1) {
        }else {
            this.setState({showFinger: true});
            registerEvents(this.onFingerReturn, 'FINGER_RETURN');
            this.failCount = 0;
            UtilsModule.fingerPrint();
        }
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
                this.doOk();
                break;
            case 2:
                Toast(returnStr2);
                this.doOk();
                break;
            case 3:
                Toast(returnStr3);
                this.doOk();
                break;
            case 4:
                // Toast(returnStr4);
                break;
            case 5:
                this.failCount += 1;
                if (this.failCount == 2 && app.isandroid) {
                    UtilsModule.fingerPrintCancel();
                    this.setState({fingerFinish: true});
                    this.setState({textResult: '指纹验证失败'});
                    this.setState({textBtn: '确  定'});
                }else {
                    this.setState({text2: '请再次验证已有指纹'});
                }
                break;
            case 6:
                this.setState({textBtn: '确  定'});
                this.setState({textResult: '指纹验证成功,开启指纹登录'});
                this.setState({fingerFinish: true});
                LocalDataMgr.setValueAndKey('haveFinger', 1);
                break;
            case 7:
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
            text1: '"经开区任务根据提醒"的Touch ID',
            text2: '请验证已有指纹',
            textBtn: '取  消',
            textResult: '指纹验证失败',
            fingerFinish: false,
            showFinger:false,
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
                    <Button onPress={this.doShowProtocal} style={styles.protocal_button} textStyle={styles.protocal_button_text}>{'经开区任务根据提醒指纹服务协议  '}</Button>
                    <TouchableOpacity onPress={this.changeProtocalState}>
                        <Image
                            resizeMode='cover'
                            source={this.state.protocalRead ? app.img.leader_finger_prol_open : app.img.leader_finger_prol_close}
                            style={styles.protocal_icon}
                            />
                    </TouchableOpacity>
                </View>
                {
                    this.state.showFinger &&
                    <View style={styles.dlg_container}>
                        <View style={styles.dlg_container2}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.leader_finger}
                                style={styles.dlg_inputContainer}
                                />
                            {
                                this.state.fingerFinish &&
                                <Text style={styles.dlg_text_header3}>{this.state.textResult}</Text>
                            }
                            {
                                !this.state.fingerFinish &&
                                <View>
                                <Text style={styles.dlg_text_header1}>{this.state.text1}</Text>
                                <Text style={styles.dlg_text_header2}>{this.state.text2}</Text>
                                </View>
                            }
                            <View style={styles.dlg_lineContainer}/>
                            <Button onPress={this.doOk} style={styles.dlg_protocal_button} textStyle={styles.dlg_protocal_button_text}>{this.state.textBtn}</Button>
                        </View>
                    </View>
                }
            </View>
        );
    },
});

const styles = StyleSheet.create({
    dlg_container: {
        position:'absolute',
        top: 0,
        alignItems:'center',
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    dlg_container2: {
        marginTop: 160,
        alignItems:'center',
        width:sr.w-100,
        height:150,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    dlg_inputContainer: {
        marginTop: 10,
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    dlg_text_header1: {
        marginTop: 6,
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
    },
    dlg_text_header2: {
        marginTop: 6,
        fontSize: 12,
        color: '#858585',
        alignSelf: 'center',
    },
    dlg_text_header3: {
        marginTop: 18,
        marginBottom: 10,
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
    },
    dlg_lineContainer: {
        marginVertical: 10,
        height: 1,
        backgroundColor: '#999999',
        width: 260,
    },
    dlg_protocal_button: {
        backgroundColor: 'white',
        height: 18,
    },
    dlg_protocal_button_text: {
        fontSize: 14,
        color: '#f64136',
    },
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
