'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    WebView,
} = ReactNative;

const CareTaskList = require('../leader/CareTaskList.js');
const ExamineTaskList = require('../leader/ExamineTaskList.js');
const Statistics = require('../leader/Statistics.js');
const TimeManageList = require('../leader/TimeManageList.js');
const authorityEnum = require('../../data/authorityEnum.js');
const { DImage } = COMPONENTS;


module.exports = React.createClass({
    getInitialState () {
        return {
            tabIndex: 0,
        };
    },
    onWillFocus() {
        app.toggleNavigationBar(false);
    },
    onWillHide() {
        app.toggleNavigationBar(true);
    },
    changeTab (tabIndex) {
        this.setState({ tabIndex });
    },
    render () {
        const { tabIndex } = this.state;
        const menuAdminArray = ['最关心任务', '日程提醒', '统计'];
        let {phone, name, authority} = app.personal.info;
        return (
            <View style={styles.container}>
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_banner}
                    style={styles.bannerImage} >
                    <DImage
                        resizeMode='cover'
                        source={app.img.common_head}
                        style={styles.headerImage}/>
                    <View style={styles.infoView}>
                        <Text style={styles.phoneText}>{phone}</Text>
                        <View style={styles.dividerLine} />
                        <Text style={styles.nameText}>{name}</Text>
                        <View style={styles.dividerLine} />
                        <Text style={styles.phoneText}>{authorityEnum[authority]}</Text>
                    </View>
                </DImage>
                <View style={styles.tabContainer}>
                    {
                        menuAdminArray.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    underlayColor='rgba(0, 0, 0, 0)'
                                    onPress={this.changeTab.bind(null, i)}
                                    style={styles.touchTab}>
                                    {
                                        this.state.tabIndex === i ?
                                        <DImage
                                            resizeMode='stretch'
                                            source={app.img.home_check_menu}
                                            style={styles.checkImage} >
                                            <Text style={[styles.tabText, { color:'#fff000', fontSize: 14 }]} >
                                                {item}
                                            </Text>
                                        </DImage>
                                        :
                                        <View style={styles.tabButton}>
                                            <Text style={[styles.tabText, { color:'#FFFFFF', fontSize: 12 }]} >
                                                {item}
                                            </Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                <View style={styles.listStyle}>
                    {
                        this.state.tabIndex ===0&&
                        <CareTaskList />
                    }
                    {
                        this.state.tabIndex ===2&&
                        <Statistics />
                    }
                    {
                        this.state.tabIndex ===1&&
                        <TimeManageList />
                    }
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    bannerImage: {
        width: sr.w,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoView: {
        width: sr.w,
        position: 'absolute',
        left: 0,
        top: 155,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerLine: {
        width: 1,
        height: 20,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
    },
    phoneText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    nameText: {
        fontSize: 25,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },

    tabContainer: {
        width:sr.w,
        position: 'absolute',
        left: 0,
        top: 197,
        flexDirection: 'row',
    },
    touchTab: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
    },
    tabButton: {
        width: sr.w/3,
        height: 47,
        marginTop: 3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#ea372f',
    },
    tabText: {
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    checkImage: {
        width: sr.w/3,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
    },
    listStyle: {
        width: sr.w,
        marginTop: 47,
        flex: 1,
    },
});
