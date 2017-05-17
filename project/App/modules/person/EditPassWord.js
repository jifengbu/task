'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
} = ReactNative;

const dismissKeyboard = require('dismissKeyboard');
const moment = require('moment');
const EditInformationBox = require('./EditInformationBox.js');
const PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');
const Subscribable = require('Subscribable');
const Camera = require('@remobile/react-native-camera');

const { Button } = COMPONENTS;

const DEFAULT_OPACITY = 0.5;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin, SceneMixin],
    statics: {
        title: '修改密码',
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.containerStyle}>
                    <View style={styles.itemBgStyle} >
                        <Text style={styles.headText}>旧密码</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ name: text })}
                            onFocus={this.onTextInputFocus}
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输入您的旧密码'}
                            placeholderTextColor={'#BABABA'}
                            style={styles.text_input} />
                    </View>
                    <Text style={styles.lowSeprator} />
                    <View style={styles.itemBgStyle} >
                        <Text style={styles.headText}>新密码</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ post: text })}
                            onFocus={this.onTextInputFocus}
                            underlineColorAndroid={'transparent'}
                            placeholder={'请输入您的新密码'}
                            placeholderTextColor={'#BABABA'}
                            style={styles.text_input} />
                    </View>
                    <Text style={styles.lowSeprator} />
                    <View style={styles.itemBgStyle} >
                        <Text style={styles.headText}>再次输入</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ post: text })}
                            onFocus={this.onTextInputFocus}
                            underlineColorAndroid={'transparent'}
                            placeholder={'请再次输入您的新密码'}
                            placeholderTextColor={'#BABABA'}
                            style={styles.text_input} />
                    </View>
                    <Text style={styles.lowSeprator} />
                    <Button onPress={this.doAnonymousLogin} style={styles.btnSubmit} textStyle={styles.btnSubmitText}>{'确    认'}</Button>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
    },
    containerStyle: {
        height: sr.h - 55,
        width: sr.w,
        flexDirection: 'column',
    },
    lowSeprator: {
        width: sr.w-20,
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#ececec',
    },
    headText: {
        width: 74,
        fontSize: 16,
        marginLeft: 33,
        fontFamily: 'STHeitiSC-Medium',
        color: '#747474',
        alignSelf : 'center',
    },
    text_input: {
        height: 40,
        width: 233,
        fontSize: 16,
        fontFamily: 'STHeitiSC-Medium',
        marginLeft: 20,
        paddingLeft: 0,
        color: '#BABABA',
        alignSelf: 'center',
    },
    itemBgStyle: {
        width: sr.w,
        height: 48,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    btnSubmit: {
        height: 35,
        width: sr.w - 80,
        marginTop: 60,
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 30,
        backgroundColor: '#20c5bb',
    },
    btnSubmitText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
