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

const { Button, TaskStepList, DImage, MessageBox} = COMPONENTS;
const moment = require('moment');
const SingleTaskContent = require('./SingleTaskContent.js');
const InputBoxUpdate = require('./InputBoxUpdate.js');
const ModifyTask = require('./ModifyTask.js');

module.exports = React.createClass({
    statics: {
        title: '任务详情',
        selectedTag: 0,
        leftButton: {  handler: ()=>{app.scene.goBack()}},
    },
    goBack() {
        app.navigator.pop();
        this.props.UpdateTimeBack&&this.props.UpdateTimeBack();
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
    onWillFocus () {
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
    changeTab (tag) {
        this.setState({ selectedTag: tag });
        const {userId} = app.personal.info;
        const {id} = this.props.data;
        switch (tag) {
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
                app.showModal(
                    <MessageBox
                        content={`你确定提醒该任务吗？`}
                        doConfirm={()=>{
                            const param = {
                                userId,
                                taskId: id,
                            };
                            POST(app.route.ROUTE_REMIND_TASK, param, this.doSuccess.bind(null, 1));
                        }}
                        />
                );
                break;
            }
            case 2: {
                app.navigator.push({
                    component: ModifyTask,
                    passProps: {taskDetail: this.state.taskDetail,isPop: true}
                })
                break;
            }
            case 3: {
                app.showModal(
                    <MessageBox
                        content={`你确定同意结束该任务吗？`}
                        doConfirm={()=>{
                            const param = {
                                userId,
                                taskId: id,
                            };
                            POST(app.route.ROUTE_AGREE_FINISH_TASK, param, this.doSuccess.bind(null, 3));
                        }}
                        />
                );
                break;
            }
            case 4: {
                app.showModal(
                    <MessageBox
                        content={`你确定驳回结束该任务吗？`}
                        doConfirm={()=>{
                            const param = {
                                userId,
                                taskId: id,
                            };
                            POST(app.route.ROUTE_REJECT_FINISH_TASK, param, this.doSuccess.bind(null, 4));
                        }}
                        />
                );
                break;
            }
            case 5: {
                app.showModal(
                    <MessageBox
                        content={`你确定申请结束该任务吗？`}
                        doConfirm={()=>{
                            const param = {
                                userId,
                                taskId: id,
                            };
                            POST(app.route.ROUTE_APPLY_FINISH_TASK, param, this.doSuccess.bind(null, 4));
                        }}
                        />
                );
                break;
            }
            default:
        }
    },
    doSuccess (tag, data) {
        if (data.success) {
            switch (tag) {
                case 0: {
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
                }
                case 1: {
                    const param = {
                        createTime: moment().format('YYYY-MM-DD HH:mm'),
                        content: '提醒一次任务',
                        userName: app.personal.info.name,
                        id: this.props.taskId
                    };
                    let {ProgressList} = this.state;
                    ProgressList.push(param);
                    this.setState({ProgressList});
                    Toast('该任务提醒成功');
                    break;
                }
                case 3:
                case 4:
                case 5:
                    Toast('操作成功');
                default:;
            }
        } else {
            Toast(data.msg);
        }
    },
    render () {
        const { selectedTag, taskDetail, ProgressList } = this.state;
        const userId = app.personal.info.userId;
        const { state, title, expectFinishTime, examinerId, publisherId, executor={}, supervisor={} } = taskDetail || {};
        // 1：待审批，2：驳回审批，4：通过审批，8：待执行， 16：进行中，32：待完成审核，64：驳回完成审核，128：完成
        const menuAdminArray = [
            {title: '任务更新', tag: 0, visible: true},
            {title: '任务提醒', tag: 1, visible: state >= 16 && state < 128 && supervisor.id===userId},
            {title: '任务变更', tag: 2, visible: publisherId===userId||examinerId === userId},
            {title: '同意结束', tag: 3, visible: state == 32 && examinerId === userId},
            {title: '驳回结束', tag: 4, visible: state == 32 && examinerId === userId},
            {title: '申请结束', tag: 5, visible: state == 16 && userId===executor.id}
        ];
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
                                item.visible &&
                                <TouchableOpacity
                                    key={i}
                                    underlayColor='rgba(0, 0, 0, 0)'
                                    onPress={this.changeTab.bind(null, item.tag)}
                                    style={styles.touchTab}>
                                    <View style={[styles.tabButton, {backgroundColor: selectedTag === item.tag ? '#ea372f' : '#dcdcdc'}]}>
                                        <Text style={[styles.tabText, { color: selectedTag === item.tag ? '#FFFFFF' : '#000000', fontSize: 12 }]} >
                                            {item.title}
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
