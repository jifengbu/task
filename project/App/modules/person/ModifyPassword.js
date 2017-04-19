'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    View,
    TextInput,
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
                <Label img={app.img.login_user}>请输入旧密码</Label>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='请输入旧密码'
                    style={styles.text_input}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ oldPassword: text })}
                    />
                <Label img={app.img.login_user}>请输入新密码</Label>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='请输入新密码'
                    style={styles.text_input}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ newPassword1: text })}
                    />
                <Label img={app.img.login_user}>请再次输入新密码</Label>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='请再次输入新密码'
                    style={styles.text_input}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ newPassword2: text })}
                    />
                <Button onPress={this.doSubmit} style={[styles.btnSubmit, { backgroundColor:app.THEME_COLOR }]}>提交</Button>
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
    text_input: {
        height: 40,
        fontSize: 14,
        paddingLeft: 10,
        backgroundColor: 'white',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#DBDBDB',
    },
    btnSubmit: {
        position: 'absolute',
        width: sr.w - 50,
        marginLeft: 25,
        height: 40,
        bottom: 60,
        borderRadius: 10,
    },
});
