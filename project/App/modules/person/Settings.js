'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} = ReactNative;

const Help = require('./Help.js');
const About = require('./About.js');
const UpdatePage = require('../update/UpdatePage');
const Feedback = require('./Feedback');
const ModifyPassword = require('./ModifyPassword.js');

const { Button, WebviewMessageBox } = COMPONENTS;

const CHILD_PAGES = [
    { title:'意见反馈', module: Feedback, img:app.img.common_point, info:'' },
    { title:'修改密码', module: ModifyPassword, img:app.img.common_point, info:'' },
];

const MenuItem = React.createClass({
    showChildPage () {
        const { module } = this.props.page;
        app.navigator.push({
            component: this.props.page.module,
        });
    },
    render () {
        const { title, img, info, seprator } = this.props.page;
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.showChildPage}
                style={styles.ItemBg}>
                <Text style={styles.itemNameText}>{title}</Text>
                <Image
                    resizeMode='stretch'
                    source={app.img.common_go}
                    style={styles.icon_go} />
            </TouchableOpacity>
        );
    },
});

module.exports = React.createClass({
    statics: {
        title: '设置',
    },
    render () {
        const info = app.personal.info;
        return (
            <View style={styles.container}>
                <View style={styles.blankView} />
                {
                    CHILD_PAGES.map((item, i) => {
                        return (
                            !item.hidden &&
                            <MenuItem page={item} key={i} />
                        );
                    })
                }
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ececec',
    },
    blankView: {
        width: sr.w,
        height: 30,
    },
    ItemBg: {
        marginTop: 1,
        padding: 10,
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon_go: {
        width: 8,
        marginRight: 10,
        height: 15,
    },
    infoStyle: {
        flex: 3,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    icon_item: {
        width: 25,
        height: 25,
    },
    itemNameText: {
        fontSize: 13,
        color: '#444444',
        alignSelf: 'center',
        marginLeft: 10,
    },
});
