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
        title: '指纹密码',
    },
    doShowProtocal () {
        app.showModal(
            <WebviewMessageBox webAddress={app.route.ROUTE_USER_LICENSE} />,
            CONSTANTS.APP_NAME + '用户协议',
        );
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
                    source={app.img.leader_inpubBox_close}
                    style={styles.inputContainer}
                    />
                <Text style={styles.text_header1}>经开区任务根据提醒密码指纹服务</Text>
                <Text style={styles.text_header1}>开启后用于登录应用</Text>
                <View style={styles.lineContainer}/>
                <View style={styles.protocalContainer}>
                    <Button onPress={this.doShowProtocal} style={styles.protocal_button} textStyle={styles.protocal_button_text}>{'经开区任务根据提醒指纹服务协议'}</Button>
                    <TouchableOpacity onPress={this.changeProtocalState}>
                        <Image
                            resizeMode='cover'
                            source={this.state.protocalRead ? app.img.leader_inpubBox_close : app.img.leader_inpubBox_close}
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
        width: 100,
        height: 120,
        marginTop: 20,
        alignSelf: 'center',
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
