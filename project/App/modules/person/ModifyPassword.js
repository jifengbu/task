'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    View,
    TextInput,
    Text,
} = ReactNative;

const { Button, Label } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '修改密码',
    },
    getInitialState () {
        return {
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
        };
    },
    goBack () {
        app.navigator.pop();
    },
    doSubmit () {
        const { oldPassword, newPassword1, newPassword2 } = this.state;
        const { checkPassword } = app.utils;
        if (!checkPassword(oldPassword) || !checkPassword(newPassword1)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        if (!oldPassword) {
            Toast('请填写旧密码');
            return;
        }
        if (!newPassword1) {
            Toast('请填写新密码');
            return;
        }
        if (!newPassword2) {
            Toast('请再次填写新密码');
            return;
        }
        if (newPassword2 !== newPassword1) {
            Toast('两次填写新密码不一致');
            return;
        }
        if (oldPassword === newPassword1) {
            Toast('新密码不能喝原来密码一样');
            return;
        }
        const param = {
            shopId: app.personal.info.shopId,
            oldPassword,
            newPassword: newPassword1,
        };
        POST(app.route.ROUTE_MODIFY_PASSWORD, param, this.doSubmitSuccess, true);
    },
    doSubmitSuccess (data) {
        if (data.success) {
            Toast('修改成功');
            this.goBack();
        } else {
            Toast(data.msg);
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>旧密码</Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='点击输入您的旧密码'
                        style={styles.text_input}
                        secureTextEntry
                        onChangeText={(text) => this.setState({ oldPassword: text })}
                        />
                </View>
                <View style={styles.line} />
                <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>新密码</Text>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='点击输入您的新密码'
                    style={styles.text_input}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ newPassword1: text })}
                    />
                </View>
                <View style={styles.line} />
                <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>再次输入</Text>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='请再次输入新密码'
                    style={styles.text_input}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ newPassword2: text })}
                    />
                </View>
                <Button onPress={this.doSubmit} textStyle={{fontSize: 15, fontWeight: '600'}} style={[styles.btnSubmit, { backgroundColor:'#20C5BB' }]}>确      认</Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    line: {
        height: 1,
        backgroundColor: '#999999',
        marginVertical: 6,
    },
    text: {
        marginLeft: 6,
        marginTop: 12,
        width: 60,
        fontSize: 14,
        color: '#666666',
    },
    text_input: {
        marginLeft: 20,
        width: 200,
        height: 40,
        fontSize: 14,
        backgroundColor: 'transparent',
        textAlignVertical: 'top',
    },
    btnSubmit: {
        width: sr.w - 50,
        height: 36,
        marginTop: 60,
        borderRadius: 4,
    },
});
