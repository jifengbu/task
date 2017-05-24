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
const moment = require('moment');
const SingleTaskContent = require('./SingleTaskContent.js');
const InputBoxUpdate = require('./InputBoxUpdate.js');

module.exports = React.createClass({
    statics: {
        title: '任务详情',
        index: 0,
    },
    getInitialState () {
        return {
            taskDetail: null,
            ProgressList: [],
        };
    },
    componentDidMount () {
        this.getSingleTaskDetail();
        this.getTaskProgressList();
    },
    getSingleTaskDetail () {
        const param = {
            userId: app.personal.info.userId,
            taskId: this.props.data.id,
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
    getTaskProgressList () {
        const param = {
            userId: app.personal.info.userId,
            taskId: this.props.data.id,
        };
        POST(app.route.ROUTE_GET_TASK_PROGRESS_LIST, param, this.getTaskProgressListSuccess);
    },
    getTaskProgressListSuccess (data) {
        if (data.success) {
            if (data.context) {
                this.setState({ProgressList: data.context.ProgressList});
            }
        } else {
            Toast('获取数据错误，请稍后重试！');
        }
    },
    changeTab (index) {
        this.setState({ index });
        const {userId} = app.personal.info;
        const {id} = this.props.data;
        switch (index) {
            case 0: {
                app.showModal(
                    <InputBoxUpdate
                        doConfirm={(content)=>{
                            this.content = content;
                            const param = {
                                userId,
                                content,
                                taskId: id,
                            };
                            POST(app.route.ROUTE_UPDATE_TASK_PROGRESS, param, this.doSuccess.bind(null, 0));
                        }}
                    />
                );
                break;
            }
            case 1: {
                const param = {
                    userId,
                    taskId: id,
                };
                POST(app.route.ROUTE_REMAIND_TASK, param, this.doSuccess.bind(null, 1));
                break;
            }
            case 2: {

                break;
            }
            case 3: {
                const param = {
                    userId,
                    taskId: id,
                };
                POST(app.route.ROUTE_AGREE_FINISH_TASK, param, this.doSuccess.bind(null, 3));
                break;
            }
            case 4: {
                const param = {
                    userId,
                    taskId: id,
                };
                POST(app.route.ROUTE_REJECT_FINISH_TASK, param, this.doSuccess.bind(null, 4));
                break;
                break;
            }
            default:
        }
    },
    doSuccess (index, data) {
        if (data.success) {
            switch (index) {
                case 0:
                    const param = {
                        createTime: moment().format('YYYY-MM-DD HH:mm'),
                        content: this.content,
                        userName: app.personal.info.name,
                        id: this.props.taskId
                    };
                    let {ProgressList} = this.state;
                    ProgressList.push(param);
                    this.setState({ProgressList});
                    Toast('任务更新成功');
                    break;
                case 1:
                    Toast('该任务提醒成功');
                    break;
                case 2:
                    break;
                case 3:
                    Toast('同意该任务结束');
                    break;
                case 4:
                    Toast('驳回该任务结束');
                    break;
                default:

            }
        } else {
            Toast(data.msg);
        }
    },
    render () {
        const { index, taskDetail, ProgressList } = this.state;
        const menuAdminArray = ['任务更新', '任务提醒', '任务变更'];
        const {state} = this.props.data;
        if (state != 1 && state != 2) {
            menuAdminArray.push('确认结束');
            menuAdminArray.push('驳回结束');
        }
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
                    {
                        !!ProgressList.length&&
                        <TaskStepList listData={ProgressList} />
                    }
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
                                    <View style={[styles.tabButton, {backgroundColor: index === i ? '#ea372f' : '#dcdcdc'}]}>
                                        <Text style={[styles.tabText, { color: index === i ? '#FFFFFF' : '#000000', fontSize: 12 }]} >
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
