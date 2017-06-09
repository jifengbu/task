'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    View,
    TextInput,
    ListView,
    Text,
    NativeModules,
    TouchableOpacity,
} = ReactNative;

const ForgetPassword = require('./ForgetPassword.js');
const Register = require('./Register.js');
const Home = require('../home/index.js');
const LocalDataMgr = require('../../manager/LocalDataMgr.js');
import { DeviceEventEmitter } from 'react-native';
const PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');

const { Button } = COMPONENTS;

const UtilsModule = NativeModules.UtilsModule;

function registerEvents (callback, type) {
    if (callback) {
        DeviceEventEmitter.addListener(type, function (result) {
            callback(result);
        });
    }
}

const WeixinQQPanel = React.createClass({
    render () {
        return (
            <View style={styles.thirdpartyContainer}>
                <View style={styles.sepratorContainer}>
                    <View style={styles.sepratorLine} />
                    <Text style={styles.sepratorText} >{app.isandroid ? '    ' : ''}或者您也可以</Text>
                </View>
                <View style={styles.thirdpartyButtonContainer}>
                    {
                        !!this.props.weixininstalled &&
                        <View style={styles.thirdpartyLeftButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_weixin_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>微信登录</Text>
                        </View>
                    }
                    {
                        !!this.props.qqinstalled &&
                        <View style={styles.thirdpartyRightButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_qq_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>QQ登录</Text>
                        </View>
                    }
                </View>
            </View>
        );
    },
});

const NoWeixinQQPanel = React.createClass({
    render () {
        return (
            <View style={styles.thirdpartyContainer2}>
                <Text style={[styles.thirdpartyContainer2_text, { color: app.THEME_COLOR }]} />
            </View>
        );
    },
});

module.exports = React.createClass({
    mixins: [SceneMixin],
    statics: {
        title: '',
    },
    getInitialState () {
        return {
            phone: app.login.list[0] || '',
            password: '',
            weixininstalled: false,
            qqinstalled: false,
            showPassword: false,
        };
    },
    componentDidMount () {
        app.toggleNavigationBar(false);

        this.haveFinger = LocalDataMgr.getValueFromKey('haveFinger');
        this.needLogin = LocalDataMgr.getValueFromKey('notNeedLogin');

        if (this.haveFinger && this.haveFinger==1) {
            registerEvents(this.onFingerReturn, 'FINGER_RETURN');
            this.failCount = 0;
            UtilsModule.fingerPrint();
        }else if (this.notNeedLogin && this.notNeedLogin==1) {
            this.getPersonalInfo();
        } else {
            this.showPassword();
        }
    },
    fingerNextStep(){
        this.notNeedLogin = LocalDataMgr.getValueFromKey('notNeedLogin');
        if (this.notNeedLogin && this.notNeedLogin==1) {
            this.getPersonalInfo();
        } else {
            this.showPassword();
        }
    },
    onFingerReturn(returnJson){
        // android 要弹toast。ios有界面，不用弹。
        let returnStr1 = "指纹功能启动失败";
        let returnStr2 = "当前设备没有设置密码";
        let returnStr3 = "当前设备没有设置指纹";
        let returnStr4 = "解锁开始";
        let returnStr5 = "解锁失败";
        let returnStr6 = "解锁成功";
        let returnStr7 = "跳到用户登录界面";//ios使用。

        console.log('onFingerReturn-----', returnJson.result);
        switch (returnJson.result) {
            case 1:
                Toast(returnStr1);
                this.fingerNextStep();
                break;
            case 2:
                Toast(returnStr2);
                this.fingerNextStep();
                break;
            case 3:
                Toast(returnStr3);
                this.fingerNextStep();
                break;
            case 4:
                Toast(returnStr4);
                break;
            case 5:
                this.failCount += 1;
                if (this.failCount == 2 && app.isandroid) {
                    Toast('验证失败转到密码登录');
                    this.showPassword();
                    UtilsModule.fingerPrintCancel();
                }
                break;
            case 6:
                Toast('登录成功');
                this.fingerNextStep();
                break;
            case 7:
                // ios 转到密码登录
                this.showPassword();
                break;
        }
    },
    doLogin() {
        const { phone, password } = this.state;
        if (!app.utils.checkPhone(phone)) {
            Toast('手机号码不是有效的手机号码');
            return;
        }
        if (!app.utils.checkPassword(password)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        const param = {
            phone,
            password,
        };

        // if (app.socketconnect) {
        //     app.socket.emit('CHECK_USER_LOGINED_RQ', param);
        // } else {
        //     Toast('网络不好，稍后再试');
        // }
        app.socket.login(param,(obj)=>{
            if (obj.success) {
                PersonalInfoMgr.setNeedLogin(false);
                app.personal.info.phone = this.state.phone;
                app.personal.info.userId = obj.userId;
                app.login.savePhone(this.state.phone);
                this.getPersonalInfo();
            } else {
                Toast(obj.msg);
            }
        });
    },
    // doLoginMessage () {
    //     const { phone, password } = this.state;
    //     if (!app.utils.checkPhone(phone)) {
    //         Toast('手机号码不是有效的手机号码');
    //         return;
    //     }
    //     if (!app.utils.checkPassword(password)) {
    //         Toast('密码必须有6-20位的数字，字母，下划线组成');
    //         return;
    //     }
    //     const param = {
    //         phone,
    //         password,
    //     };
    //     app.showProgressHud();
    //     POST(app.route.ROUTE_LOGIN, param, this.doLoginSuccess, this.doLoginError);
    // },
    // doLoginSuccess (data) {
    //     if (data.success) {
    //         app.personal.info.phone = this.state.phone;
    //         app.personal.info.userId = data.context.userId;
    //         // app.socket.register(data.context.userId);
    //         app.login.savePhone(this.state.phone);
    //         this.getPersonalInfo();
    //     } else {
    //         Toast('获取用户信息失败');
    //         app.dismissProgressHud();
    //     }
    // },
    // doLoginError (error) {
    //     LocalDataMgr.setValueAndKey('notNeedLogin', 0);
    //     app.dismissProgressHud();
    // },
    getPersonalInfo () {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_PERSONAL_INFO, param, this.getPersonalInfoSuccess, this.getPersonalInfoError);
    },
    getPersonalInfoSuccess (data) {
        if (data.success) {
            const context = data.context;
            context['userId'] = app.personal.info.userId;
            context['phone'] = this.state.phone;
            app.personal.set(context);
            this.getSupervisionClientList();
            this.getExecutorClientList();
            this.getTaskTypeList();
            app.navigator.replace({
                component: Home,
            });
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    getPersonalInfoError (error) {
        app.dismissProgressHud();
    },
    getSupervisionClientList() {
        const param = {
            userId: app.personal.info.userId,
            authority: 8,
        };
        POST(app.route.ROUTE_GET_CLIENT_LIST, param, this.getClientListSuccess.bind(null, 'supervision'));
    },
    getExecutorClientList() {
        const param = {
            userId: app.personal.info.userId,
            authority: 4,
        };
        POST(app.route.ROUTE_GET_CLIENT_LIST, param, this.getClientListSuccess.bind(null, 'executor'));
    },
    getClientListSuccess(type, data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                if (type==='supervision') {
                    app.supervisionClient.setList(data.context.clientList);
                } else if (type==='executor') {
                    app.executorClient.setList(data.context.clientList);
                }
            }
        }
    },
    getTaskTypeList() {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_TASK_TYPE_LIST, param, this.getTaskTypeListSuccess);
    },
    getTaskTypeListSuccess(data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                app.taskType.setList(data.context.taskTypeList);
            }
        }
    },
    showPassword () {
        this.setState({ showPassword: true });
    },
    onPhoneTextChange (text) {
        this.setState({phone: text});
    },
    render () {
        return (
            <Image
                resizeMode='stretch'
                source={app.img.login_background}
                style={styles.container}>
                    <View style={{height: sr.s(360)}} />
                    {
                        this.state.showPassword &&
                        <View>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_user}
                                style={styles.input_icon}
                                />
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#FFFFFF'
                                placeholder='请输入您的用户名'
                                maxLength={11}
                                onChangeText={this.onPhoneTextChange}
                                defaultValue={this.state.phone}
                                style={styles.text_input}
                                keyboardType='phone-pad'
                                />
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_line}
                                style={styles.line}
                                />
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_locked}
                                style={styles.input_icon}
                                />
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#FFFFFF'
                                placeholder='请输入您的密码'
                                secureTextEntry
                                onChangeText={(text) => this.setState({ password: text })}
                                defaultValue={this.state.password}
                                style={styles.text_input}
                                />
                            <Button onPress={this.doLogin} style={styles.btnLogin} textStyle={styles.btnLoginText}>登   录</Button>
                        </View>
                    }
                    {
                        !this.state.showPassword &&
                        <View>
                            <Image
                                resizeMode='stretch'
                                source={app.img.leader_finger}
                                style={styles.finger_icon}
                                />
                            <View style={styles.buView}>
                                <TouchableOpacity onPress={this.showPassword}>
                                    <Text style={styles.bkText}>{'用户名登录'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
            </Image>
        );
    },
});
// <Text style={styles.bkText}>{'忘记密码，请找管理员重置密码'}</Text>
const styles = StyleSheet.create({
    container: {
        width: sr.fw,
        height: sr.fh,
    },
    logoContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    logo: {
        width: 110,
        height: 110,
    },
    inputContainer: {
        width: 280,
        height: 60,
        marginTop: 20,
        overflow: 'hidden',
    },
    line: {
        width: sr.w,
        height: 2,
        marginBottom: 10,
    },
    input_icon: {
        width: 28,
        height: 28,
        marginLeft: 30,
    },
    finger_icon: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 100,
    },
    buView: {
        width: sr.w,
        height: 160,
        alignSelf: 'center',
        backgroundColor: '#1f0606',
    },
    text_input: {
        height:40,
        width: 200,
        marginLeft: 30,
        fontSize:14,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    btnForgetPassWordContainer: {
        height: 15,
        width: 280,
        marginLeft: (sr.w-280)/2,
        marginTop: 30,
    },
    btnLogin: {
        height: 50,
        width: sr.w,
        marginTop: 20,
        borderRadius: 0,
        backgroundColor: '#F2443D',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    bkText: {
        marginTop: 40,
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    thirdpartyContainer: {
        flex:1,
    },
    sepratorContainer: {
        height: 30,
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    sepratorLine: {
        top: 10,
        height: 2,
        width: sr.w - 20,
        backgroundColor: '#858687',
    },
    sepratorText: {
        backgroundColor:'#EEEEEE',
        color: '#A3A3A4',
        paddingHorizontal: 10,
    },
    thirdpartyButtonContainer: {
        marginTop: 30,
        height: 120,
        flexDirection: 'row',
    },
    thirdpartyLeftButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    thirdpartyRightButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    image_button: {
        width: 80,
        height: 80,
        margin: 10,
    },
    image_button_text: {
        color: '#4C4D4E',
        fontSize: 16,
    },
    thirdpartyContainer2: {
        marginTop: 30,
        height: 200,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    thirdpartyContainer2_text: {
        fontSize: 18,
        marginBottom:60,
    },
    list: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D7D7D7',
        width: 150,
        left: 80,
        paddingLeft: 10,
    },
    listHeightMin: {
        height: 30,
    },
    listHeightMax: {
        height: 184,
    },
    itemTextContainer: {
        height: 30,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 16,
    },
    separator: {
        backgroundColor: '#DDDDDD',
        height: 1,
    },
});
