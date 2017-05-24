'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

const TimerMixin = require('react-timer-mixin');
const { Button, WebviewMessageBox } = COMPONENTS;

module.exports = React.createClass({
    mixins: [TimerMixin],
    statics: {
        title: '指纹服务协议',
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
            <ScrollView style={styles.container}>
                <Text style={styles.text_header1}>经开区任务根据提醒密码指纹服务协议</Text>
                <View style={styles.lineContainer}/>
                <Text style={styles.text_header2}>
                1、   本指纹服务协议条款（以下简称“本协议”）由您与经开区任务根据提醒签署。本协议适用于您使用经开区任务根据提醒手机应用“指纹密码”服务。本协议具有法律约束力。
                </Text>
                <Text style={styles.text_header2}>
                2、   您必须接受本协议才能开通指纹密码服务。如果您不同意本协议的任意内容，请不要进行后续操作。
                </Text>
                <Text style={styles.text_header2}>
                3、   用户开通指纹密码服务后，用户通过相应指纹的验证即可在经开区任务根据提醒手机应用上执行以下服务：指纹登录。
                </Text>
                <Text style={styles.text_header2}>
                4、   如需使用指纹密码服务，您使用的手机或其他智能移动终端需要具备指纹识别功能，且您已经在您的智能移动终端上添加了您的指纹，并且通过了经开区任务根据提醒手机应用的身份验证。
                </Text>
                <Text style={styles.text_header2}>
                5、   对您指纹特征的采集、识别、验证、比对等均由您使用的手机或其他智能移动终端及其系统完成。您使用的手机或其他智能移动终端的制造商将负责您指纹采集、识别、验证、比对等功能实现的质量，如因部分型号的手机或智能移动终端的硬件或系统原因，导致指纹特征的采集、识别、验证、比对等结果不准确或错误，给您造成损失的，经开区任务根据提醒不承担任何责任。
                </Text>
                <Text style={styles.text_header2}>
                6、   您的指纹特征由您录入指纹时使用的智能移动终端及其系统保存，经开区任务根据提醒不会以任何形式保存您的指纹特征。
                </Text>
                <Text style={styles.text_header2}>
                7、   您同意并保证，在开通指纹密码服务时，使用的是你本人的指纹开通您本人的经开区任务根据提醒账户的指纹密码服务。否则，因此给您自身或经开区任务根据提醒及其他第三方造成的一切损失，均由您自行承担。
                </Text>
                <Text style={styles.text_header2}>
                8、  经开区任务根据提醒有权不时对本协议进行更新，最新修改版本将公布在经开区任务根据提醒手机应用上，您应定期查看经开区任务根据提醒是否已做出更新。如您不同意修改，请立即停止使用经开区任务根据提醒提供的指纹密码服务。如果您继续使用本服务，则视为您接受并同意本协议相关条款的修改。
                </Text>
                <Text style={styles.text_header2}>
                9、   除本协议另有规定外，经开区任务根据提醒在提前邮件通知您或在网站和/或手机应用上公告的情况下，可以单方面终止向您提供指纹密码服务，并不承担任何赔偿责任。经开区任务根据提醒在终止提供指纹服务后，若发现您之前存在违法或违反本协议目的的使用行为，给经开区任务根据提醒造成损失的，则经开区任务根据提醒仍可据此要求您承担相应赔偿责任。
                </Text>
                <Text style={styles.text_header2}>
                10、 如您与经开区任务根据提醒之间发生任何争议且未能通过友好协商进行解决，双方同意将该争议提交仲裁而非诉讼。仲裁应提交至上海仲裁委员会。
                </Text>
                <Text style={styles.text_header2}>
                11、 除非适用法律另行规定，本协议将在您按照上述规定接受本协议后生效，直至您或经开区任务根据提醒按照本协议规定取消或终止服务。
                </Text>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 100,
        height: 120,
        marginTop: 20,
        alignSelf: 'center',
    },
    text_header1: {
        marginTop: 10,
        fontSize: 18,
        color: '#858585',
        alignSelf: 'center',
    },
    text_header2: {
        marginTop: 6,
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
        width: sr.w -40,
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
