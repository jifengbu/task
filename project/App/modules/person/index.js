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
const PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');

const { Button } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '个人中心',
    },
    doLogout () {
        app.socket.logout({userId:app.personal.info.userId},(obj)=>{
            if (obj.success) {
                PersonalInfoMgr.setNeedLogin(true);
                app.navigator.resetTo({
                    component: require('../login/Login.js'),
                }, 0);
            } else {
                console.log(obj.msg);
                Toast('退出登录失败');
            }
        });

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
                            resizeMode='cover'
                            defaultSource={app.img.personal_default_head}
                            source={{uri:app.personal.info.head||''}}
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
        height: 40,
        width: sr.w,
        marginTop: 20,
        marginBottom: 180,
        borderRadius: 0,
        backgroundColor: '#F1443E',
    },
    btnLogoutText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
