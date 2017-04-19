'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    TextInput,
} = ReactNative;

const { Button } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '意见反馈',
    },
    doSubmit () {
        if (!this.state.content) {
            Toast('请填写您需要反馈的内容');
            return;
        }
        const param = {
            shopId: app.personal.info.shopId,
            content: this.state.content,
        };
        POST(app.route.ROUTE_SUBMIT_FEEDBACK, param, this.doSubmitSuccess);
    },
    doSubmitSuccess (data) {
        if (data.success) {
            Toast('提交成功');
            app.navigator.pop();
        } else {
            Toast(data.msg);
        }
    },
    getInitialState () {
        return {
            content: '',
        };
    },
    render () {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.contentInput}
                    onChangeText={(text) => this.setState({ content: text })}
                    value={this.state.content}
                    underlineColorAndroid={'transparent'}
                    multiline
                    placeholderTextColor={'#888888'}
                    placeholder={'请填写反馈意见~！\r你的意见是我们成长的基石'}
                    />
                <View style={styles.buttonContainer}>
                    <Button onPress={this.doSubmit} style={styles.btnSubmit}>提    交</Button>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    contentInput: {
        width: sr.w - 12,
        height: 247,
        marginLeft: 6,
        marginTop: 7,
        fontSize: 15,
        padding:10,
        color: '#444444',
        borderRadius: 5,
        textAlignVertical: 'top',
        backgroundColor:'#FFFFFF',
    },
    buttonContainer: {
        marginTop: 20,
        width: sr.w,
        height: 50,
        alignItems: 'center',
    },
    btnSubmit: {
        width: 130,
        height: 35,
        borderRadius: 5,
        backgroundColor:'#34a9b1',
    },
});
