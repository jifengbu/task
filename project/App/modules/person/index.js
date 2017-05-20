'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

const Settings = require('./Settings');
const EditPersonInfo = require('./EditPersonInfo.js');

const { Button } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '个人中心',
    },
    doLogout () {
        app.navigator.resetTo({
            component: require('../login/Login.js'),
        }, 0);
    },
    doEditPersonInfo () {
        app.navigator.push({
            component: EditPersonInfo,
        });
    },
    render () {
        const {phone} = app.personal.info;
        return (
            <View style={styles.container}>
                <View style={styles.headImgBg}>
                    <TouchableOpacity onPress={this.doEditPersonInfo}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.common_head}
                            style={styles.headStyle}
                            />
                    </TouchableOpacity>
                    <Text style={styles.nameText}>
                        {phone}
                    </Text>
                </View>
                <Settings />
                <Button onPress={this.doLogout} style={styles.btnLogout} textStyle={styles.btnLogoutText}>退出登录</Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#E6EBEC',
    },
    headImgBg:{
        height: 160,
        width: sr.w,
        alignItems:'center',
    },
    ItemBg: {
        marginTop: 22,
        padding: 10,
        height: 55,
        width: 233,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderColor: '#5CB6BC',
        borderWidth: 1,
    },
    headStyle: {
        marginTop: 38,
        width: 87,
        height: 87,
        borderWidth: app.isandroid ? 0 : 3,
        borderColor: '#FFFFFF',
        borderRadius: 43.5,
    },
    infoStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    icon_item: {
        width: 25,
        height: 25,
    },
    itemNameText: {
        fontSize: 12,
        color: '#666666',
        alignSelf: 'center',
        marginLeft: 15,
    },
    nameText: {
        marginTop: 12,
        fontSize: 19,
        color: '#444444',
        backgroundColor: 'transparent',
    },
    btnLogout: {
        height: 46,
        width: sr.w - 60,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 100,
        borderRadius: 6,
        backgroundColor: '#A52A2A',
    },
    btnLogoutText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
