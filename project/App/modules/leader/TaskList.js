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
import Badge from 'react-native-smart-badge';

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务列表',
    },
    getInitialState () {
        this.taskList = [1,2,3,4,5,6,7];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.taskList),
        };
    },
    registerEvents (name) {
        this.addListenerOn(app.socket, name, (param) => {
            this[name](param);
        });
    },
    componentWillMount () {
        this.registerEvents('NEW_TASK_APPLY_EVENT');
        this.registerEvents('NEW_TASK_PUBLISH_EVENT');
        this.registerEvents('TASK_LIST_UPDATE_EVENT');
    },
    NEW_TASK_APPLY_EVENT (task) {
        this.taskList.unshift(task);
        this.setState({dataSource: this.ds.cloneWithRows(this.taskList)});
        app.addTaskBadge(1);
        //更新badge
        Toast('有新的任务申请，请尽快审核');
    },
    NEW_TASK_PUBLISH_EVENT (task) {
        this.taskList.unshift(task);
        this.setState({dataSource: this.ds.cloneWithRows(this.taskList)});
        app.addTaskBadge(1);
    },
    TASK_LIST_UPDATE_EVENT (taskList) {
        this.taskList = taskList;
        this.setState({dataSource: this.ds.cloneWithRows(taskList)});
        app.setTaskBadge(_.sum(_.map(this.taskList, (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
    },
    onPress(data) {
        if (data.state !== 0) { //任务状态，0：待审核 1：审核未通过，2：进行中，3：已完成
            app.navigator.push({
                component: TaskSupervision,
                passProps: {data}
            });
        } else {
            app.navigator.push({
                component: ExamineTask,
                passProps: {data}
            });
        }
        if (!_.includes(data.readed, app.personal.info.phone)) {
            app.socket.sendData('UPDATE_READED_RQ', {id: data.id});
            app.subTaskBadge(1);
        }
    },
    componentDidMount () {
        app.socket.sendData('GET_TASK_LIST_RQ', {}, (data)=>{
            this.taskList = data.taskList;
            this.setState({dataSource: this.ds.cloneWithRows(this.taskList)});
            app.setTaskBadge(_.sum(_.map(this.taskList, (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
        }, true);
    },
    renderRow (obj, sectionID, rowID) {
        const states = ['待审核', '审核未通过', '进行中', '已完成'];
        const colors = ['blue', 'red', 'darkorange', 'green'];
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
                        <Text numberOfLines={3} style={styles.description}>{obj.description+'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'}</Text>
                    </View>
                    <View style={styles.statusBar}>
                        <Text style={styles.childTasks}>
                            {'结束时间：2017-06-05'}
                        </Text>
                        <View style={styles.childStyle}>
                            <Text style={styles.childTasks}>
                                {'距离结束还有：'}
                            </Text>
                            <Text style={styles.childState}>
                                {'10天'}
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
        height: 123,
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
        backgroundColor: '#9e9e9e',
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
        height: 109,
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
        height: 61,
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
