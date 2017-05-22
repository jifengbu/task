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
            fingerRightCount: 0,
            fingerFailCount: 0,
            fingerFinish: false,
            text11: '"经开区任务根据提醒"的Touch ID',
            text12: '再试一次',
            text2: '请验证已有指纹',
            text31: '确  定',
            text32: '取  消',
            text41: '指纹验证成功',
            text42: '指纹验证失败',
        };
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_inpubBox_close}
                        style={styles.inputContainer}
                        />
                    {
                        this.state.fingerFinish &&
                        <Text style={styles.text_header3}>{this.state.text41}</Text>
                    }
                    {
                        !this.state.fingerFinish &&
                        <View>
                        <Text style={styles.text_header1}>{this.state.text11}</Text>
                        <Text style={styles.text_header2}>{this.state.text2}</Text>
                        </View>
                    }
                    <View style={styles.lineContainer}/>
                    <Button onPress={this.doShowProtocal} style={styles.protocal_button} textStyle={styles.protocal_button_text}>{this.state.text32}</Button>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top: 0,
        alignItems:'center',
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container2: {
        marginTop: 180,
        alignItems:'center',
        width:sr.w-100,
        height:140,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    inputContainer: {
        marginTop: 10,
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    text_header1: {
        marginTop: 6,
        fontSize: 16,
        color: '#858585',
        alignSelf: 'center',
    },
    text_header2: {
        marginTop: 6,
        fontSize: 12,
        color: '#858585',
        alignSelf: 'center',
    },
    text_header3: {
        marginTop: 18,
        marginBottom: 10,
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
        width: 260,
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
        fontSize: 14,
        color: '#f64136',
    },
});
