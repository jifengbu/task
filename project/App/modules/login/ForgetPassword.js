'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
} = ReactNative;

const { Button, Label } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '忘记密码',
    },
    getInitialState () {
        return {
            phone: this.props.phone || '',
            email: '',
        };
    },
    doSubmit () {
        const { phone, email } = this.state;
        if (!app.utils.checkPhone(phone)) {
            Toast('请填写正确的手机号码');
            return;
        }
        if (!app.utils.checkMailAddress(email)) {
            Toast('邮箱地址不规范，请重新输入');
            return;
        }
        const param = {
            phone,
            email,
        };
        POST(app.route.ROUTE_FIND_PASSWORD, param, this.doSubmitSuccess, true);
    },
    doSubmitSuccess (data) {
        if (data.success) {
            Toast('新的密码已经发送到您的邮箱，请注意查收');
            app.navigator.pop();
        } else {
            Toast(data.msg);
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.upContainer}>
                    <Text style={styles.info}>
                        {'       请正确填写注册该电话号码时的邮箱，我们会将新的密码发送到您的这个邮箱，请注意查收.'}
                    </Text>
                    <Label style={styles.label} img={app.img.login_user} textStyle={{ color: '#FFFFFF' }}>请输入电话号码</Label>
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
                            defaultValue={this.props.phone}
                            style={styles.text_input}
                            keyboardType='phone-pad'
                            />
                    </Image>
                    <Label style={styles.label} img={app.img.login_user} textStyle={{ color: '#FFFFFF' }}>请输入密码找回邮箱</Label>
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
                </View>
                <Button onPress={this.doSubmit} style={styles.btnSubmit} textStyle={styles.btnSubmitText}>确   定</Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3BA9B0',
    },
    info: {
        fontSize: 16,
        color: '#CD8500',
        marginBottom: 30,
    },
    upContainer: {
        paddingTop: 40,
    },
    label: {
        marginTop: 20,
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
        marginHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    text_input: {
        height:46,
        width: 180,
        color: '#FFFFFF',
    },
    text_input2: {
        marginLeft: 20,
        height: 46,
        width: 240,
        color: '#FFFFFF',
    },
    btnSubmit: {
        height: 46,
        width: sr.w - 100,
        marginLeft: 50,
        marginTop: 30,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
    },
    btnSubmitText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#60BBC0',
    },
});
