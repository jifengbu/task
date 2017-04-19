'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} = ReactNative;

const TimerMixin = require('react-timer-mixin');
const { Button, WebviewMessageBox } = COMPONENTS;

module.exports = React.createClass({
    mixins: [TimerMixin],
    statics: {
        title: '手机注册',
    },
    doRegister () {
        const { protocalRead, phone, password, rePassword, email } = this.state;
        if (!protocalRead) {
            Toast('注册前请先阅读用户协议');
            return;
        }
        if (!app.utils.checkPhone(phone)) {
            Toast('请填写正确的手机号码');
            return;
        }
        if (!app.utils.checkPassword(password)) {
            Toast('密码必须由 6-20 位的数字或，字母，下划线组成');
            return;
        }
        if (password !== rePassword) {
            Toast('两次输入的密码不一致');
            return;
        }
        if (!app.utils.checkMailAddress(email)) {
            Toast('邮箱地址不规范，请重新输入');
            return;
        }
        const param = {
            phone,
            email,
            password,
        };
        POST(app.route.ROUTE_REGISTER, param, this.doRegisterSuccess, true);
    },
    doRegisterSuccess (data) {
        if (data.success) {
            Toast('注册成功');
            this.props.changeToLoginPanel(this.state.phone);
            app.navigator.pop();
        } else {
            Toast(data.msg);
        }
    },
    doShowProtocal () {
        app.showModal(
            <WebviewMessageBox webAddress={app.route.ROUTE_USER_LICENSE} />,
            CONSTANTS.APP_NAME + '用户协议',
        );
    },
    getInitialState () {
        return {
            phone: '',
            password: '',
            rePassword: '',
            email: '',
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
                    source={app.img.login_input_border}
                    style={styles.inputContainer}
                    >
                    <Text style={styles.text_phone_header}>+86</Text>
                    <TextInput
                        placeholderTextColor='#FFFFFF'
                        placeholder='手机号'
                        maxLength={11}
                        onChangeText={(text) => this.setState({ phone: text })}
                        style={styles.text_input}
                        keyboardType='phone-pad'
                        />
                </Image>
                <Image
                    resizeMode='stretch'
                    source={app.img.login_input_border}
                    style={styles.inputContainer}
                    >
                    <TextInput
                        placeholderTextColor='#FFFFFF'
                        placeholder='请输入密码'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        style={styles.text_input2}
                        keyboardType='number-pad'
                        />
                </Image>
                <Image
                    resizeMode='stretch'
                    source={app.img.login_input_border}
                    style={styles.inputContainer}
                    >
                    <TextInput
                        placeholderTextColor='#FFFFFF'
                        placeholder='再次输入密码'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ rePassword: text })}
                        style={styles.text_input2}
                        />
                </Image>
                <Image
                    resizeMode='stretch'
                    source={app.img.login_input_border}
                    style={styles.inputContainer}
                    >
                    <TextInput
                        placeholderTextColor='#FFFFFF'
                        placeholder='密码找回邮箱'
                        onChangeText={(text) => this.setState({ email: text })}
                        style={styles.text_input2}
                        />
                </Image>
                <Button onPress={this.doRegister} style={styles.btnRegister} textStyle={styles.btnRegisterText}>注  册</Button>
                <View style={styles.bottomContainer}>
                    <View style={styles.protocalContainer}>
                        <TouchableOpacity onPress={this.changeProtocalState}>
                            <Image
                                resizeMode='cover'
                                source={this.state.protocalRead ? app.img.login_check : app.img.login_no_check}
                                style={styles.protocal_icon}
                                />
                        </TouchableOpacity>
                        <Text style={styles.protocal_text}>  我已阅读并同意 </Text>
                        <Button onPress={this.doShowProtocal} style={styles.protocal_button} textStyle={styles.protocal_button_text}>{CONSTANTS.APP_NAME + '用户协议'}</Button>
                    </View>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        backgroundColor: '#3BA9B0',
    },
    inputContainer: {
        width: 280,
        height: 46,
        marginLeft: (sr.w-280)/2,
        marginTop: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
        marginBottom: 20,
    },
    text_phone_header: {
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    text_input: {
        height:40,
        width: 180,
        color: '#FFFFFF',
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
    bottomContainer: {
        flex: 1,
    },
    protocalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 40,
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
        height: 18,
    },
    protocal_button_text: {
        fontSize: 13,
        color: '#1874CD',
    },
});
