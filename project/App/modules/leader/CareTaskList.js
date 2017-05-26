'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
} = ReactNative;

const Subscribable = require('Subscribable');
const TaskSupervision = require('./TaskSupervision.js');
const ExamineTask = require('./ExamineTask.js');
const taskDetail= {
                    "title": "测试任务",
                    "content": "认真测试",
                    "modifyTime": "2017-05-23 08:44:58",
                    "expectStartTime": "2017-05-16 03:00:00",
                    "expectFinishTime": "2017-05-16 03:00:00",
                    "rejectPublishReason": "不合格",
                    "rejectFinishReason": "不合格",
                    "type": 1,
                    "state": 1,
                    "id": "5923860a5c1070c1e96defd2"
                }

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务列表',
    },
    getInitialState () {
        this.taskList = [];
        this.pageNo = 1;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.taskList),
        };
    },
    onPress(data) {
        app.navigator.push({
            component: TaskSupervision,
            passProps: {data}
        });
        // if (!_.includes(data.readed, app.personal.info.phone)) {
        //     app.socket.sendData('UPDATE_READED_RQ', {id: data.id});
        //     app.subTaskBadge(1);
        // }
    },
    componentDidMount () {
        this.getTaskListByType();
        const params = {
            taskDetail,
            component: TaskSupervision,
        }
        app.showNotifications(params);
    },
    getTaskListByType(taskType) {
        const param = {
            userId: app.personal.info.userId,
            pageNo: this.pageNo,
            pageSize: 10,
        };
        POST(app.route.ROUTE_GET_MOST_CARED_TASK_LIST, param, this.getTaskListByTypeSuccess);
    },
    getTaskListByTypeSuccess (data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.taskList = context.taskList;
                this.setState({dataSource: this.ds.cloneWithRows(this.taskList)});
            }
        } else {
            this.getListFailed();
        }
    },
    getListFailed () {
        this.pageNo--;
    },
    onEndReached () {
        // this.pageNo++;
        // this.getTaskListByType(this.type);
    },
    renderRow (obj, sectionID, rowID) {
        let time = app.utils.getSurplusTimeString(obj.expectFinishTime);
        return (
            <TouchableOpacity onPress={this.onPress.bind(null, obj)} style={styles.rowItem}>
                <View style={styles.rightStyle}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_title_background}
                        style={styles.title_background} >
                        <Text style={styles.title}>{obj.title}</Text>
                    </Image>
                    <View style={styles.midView}>
                        <Text numberOfLines={3} style={styles.description}>{obj.content}</Text>
                    </View>
                    <View style={styles.statusBar}>
                        <Text style={styles.childTasks}>
                            {obj.expectFinishTime}
                        </Text>
                        <View style={styles.childStyle}>
                            <Text style={styles.childTasks}>
                                {'距离结束还有：'}
                            </Text>
                            <Text style={styles.childState}>
                                {time}
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    !_.includes(obj.readed, app.personal.info.phone) &&
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_title_label}
                        style={styles.icon} />
                }
            </TouchableOpacity>
        );
    },
    render () {
        const {dataSource} = this.state;
        return (
            <View style={styles.container}>
                <ListView
                    ref={listView => { this.listView = listView; }}
                    initialListSize={1}
                    removeClippedSubviews={false}
                    enableEmptySections
                    onEndReached={this.onEndReached}
                    style={styles.listStyle}
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    listStyle: {
        alignSelf:'stretch',
        backgroundColor: '#FFFFFF',
    },
    rowItem: {
        width: sr.w,
        height: 133,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBar: {
        width: sr.w,
        height: 21,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#c7c7c7',
    },
    childTasks: {
        marginLeft: 20,
        fontSize: 9,
        backgroundColor: 'transparent',
    },
    childStyle: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childState: {
        fontSize: 9,
        color:'#f64136',
    },
    rightStyle: {
        width: sr.w,
        marginTop: 14,
        height: 119,
        backgroundColor :'#FFFFFF'
    },
    title_background: {
        width: sr.w,
        height: 27,
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        marginLeft: 20,
        color: '#FFFFFF',
        backgroundColor: 'transparent'
    },
    midView: {
        height: 71,
        width: sr.w,
    },
    description: {
        fontSize: 10,
        marginHorizontal: 20,
        marginTop: 5,
        lineHeight: 16,
        color: '#666666',
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 4,
        width: 32,
        height: 47,
    },
});
