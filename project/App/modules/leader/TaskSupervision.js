'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    ListView,
    TouchableOpacity,
} = ReactNative;

const { Button, TaskStepList, DImage } = COMPONENTS;
const SingleTaskContent = require('./SingleTaskContent.js');

module.exports = React.createClass({
    statics: {
        title: '任务详情',
        tabIndex: 0,
    },
    getInitialState () {
        return {
            taskDetail: null,
        };
    },
    componentDidMount () {
        this.getSingleTaskDetail();
    },
    getSingleTaskDetail () {
        const param = {
            userId: app.personal.info.userId,
            taskId: this.props.taskId,
        };
        POST(app.route.ROUTE_GET_SINGLE_TASK_DETAIL, param, this.getSingleTaskDetailSuccess);
    },
    getSingleTaskDetailSuccess (data) {
        if (data.success) {
            if (data.context) {
                const taskDetail = data.context;
                this.setState({taskDetail});
            }
        } else {
            Toast('获取数据错误，请稍后重试！');
        }
    },
    changeTab (tabIndex) {
        this.setState({ tabIndex });
    },
    render () {
        const { tabIndex, taskDetail } = this.state;
        const menuAdminArray = ['任务更新', '任务提醒', '结束任务'];
        const { title, expectFinishTime } = this.state.taskDetail || {};
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <DImage
                        resizeMode='stretch'
                        source={app.img.home_title_bg}
                        style={styles.titleBgImage}>
                        <Text style={styles.titleText}>{title}</Text>
                        <View style={styles.rightTitleView}>
                            <Text style={styles.rightTitleText}>{'剩余时间：'}</Text>
                            <Text style={styles.numberText}>{app.utils.getSurplusTimeString(expectFinishTime)}</Text>
                        </View>
                    </DImage>
                    {
                        taskDetail&&
                        <SingleTaskContent data={taskDetail} />
                    }
                    <View style={styles.emptyStyle}/>
                    <TaskStepList listData={[]} />
                </ScrollView>
                <View style={styles.bottomContainer}>
                    {
                        menuAdminArray.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    underlayColor='rgba(0, 0, 0, 0)'
                                    onPress={this.changeTab.bind(null, i)}
                                    style={styles.touchTab}>
                                    <View style={[styles.tabButton, {backgroundColor: tabIndex === i ? '#ea372f' : '#dcdcdc'}]}>
                                        <Text style={[styles.tabText, { color: tabIndex === i ? '#FFFFFF' : '#000000', fontSize: 12 }]} >
                                            {item}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 40,
    },
    titleBgImage: {
        width: sr.w,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        width: sr.w-140,
        marginLeft: 10,
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    rightTitleView: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginRight: 25,
    },
    rightTitleText: {
        fontSize: 14,
        color: '#fbeb34',
    },
    numberText: {
        fontSize: 16,
        color: '#fbeb34',
        fontFamily: 'STHeitiSC-Medium',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width:sr.w,
        height: 40,
        backgroundColor: '#dcdcdc',
        flexDirection: 'row',
    },
    touchTab: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    tabButton: {
        flex: 1,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#ea372f',
    },
    tabText: {
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    taskItem: {
        marginTop: 10,
    },
    emptyStyle: {
        width: sr.w,
        height: 30,
    },
});
