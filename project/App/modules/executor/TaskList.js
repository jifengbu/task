
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
const TaskReceived = require('./TaskReceived.js');
import Badge from 'react-native-smart-badge';

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务列表',
    },
    getInitialState () {
        this.taskList = [];
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
        this.registerEvents('ALERT_EXECUTOR_EVENT');
        this.registerEvents('TASK_LIST_UPDATE_EVENT');
    },
    NEW_TASK_APPLY_EVENT (task) {
        this.taskList.unshift(task);
        this.setState({dataSource: this.ds.cloneWithRows(_.filter(this.taskList,(o)=>o.state == 2))});
        app.setTaskBadge(_.sum(_.map(_.filter(this.taskList,(o)=>o.state == 2), (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
    },
    NEW_TASK_PUBLISH_EVENT (task) {
        this.taskList.unshift(task);
        this.setState({dataSource: this.ds.cloneWithRows(_.filter(this.taskList,(o)=>o.state == 2))});
        app.setTaskBadge(_.sum(_.map(_.filter(this.taskList,(o)=>o.state == 2), (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
    },
    ALERT_EXECUTOR_EVENT (data) {
        Toast('有监督者提醒：'+data.content);
    },
    TASK_LIST_UPDATE_EVENT (taskList) {
        this.taskList = taskList;
        this.setState({dataSource: this.ds.cloneWithRows(_.filter(this.taskList,(o)=>o.state == 2))});
        app.setTaskBadge(_.sum(_.map(_.filter(this.taskList,(o)=>o.state == 2), (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
    },
    onPress(obj) {
        app.navigator.push({
            component: TaskReceived,
            passProps: {
                data: obj,
            }
        });
        if (!_.includes(obj.readed, app.personal.info.phone)) {
            app.socket.sendData('UPDATE_READED_RQ', {id: obj.id});
            app.subTaskBadge(1);
        }
    },
    componentDidMount () {
        app.socket.sendData('GET_TASK_LIST_RQ', {}, (data)=>{
            this.taskList = data.taskList;
            this.setState({dataSource: this.ds.cloneWithRows(_.filter(this.taskList,(o)=>o.state == 2))});
            app.setTaskBadge(_.sum(_.map(_.filter(this.taskList,(o)=>o.state == 2), (o)=>_.includes(o.readed, app.personal.info.phone)?0:1)));
        }, true);
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View
                style={styles.separator}
                key={rowID} />
        );
    },
    renderRow (obj, sectionID, rowID) {
        const states = ['待审核', '审核未通过', '进行中', '已完成'];
        const colors = ['blue', 'red', 'darkorange', 'green'];
        return (
            <TouchableOpacity onPress={this.onPress.bind(null,obj)} style={styles.rowItem}>
                {
                    !_.includes(obj.readed, app.personal.info.phone) &&
                    <Badge style={{position:'absolute', left:10, top: 2}}>
                        新
                    </Badge>
                }
                <Text style={styles.numStyle}>{parseInt(rowID)+1}</Text>
                <View style={styles.rightStyle}>
                    <Text style={styles.title}>{obj.title}</Text>
                    <Text style={styles.description}>{obj.description}</Text>
                    <View style={styles.statusBar}>
                        <Text style={styles.childTasks}>
                            {obj.taskList  ? obj.taskList.length + '个子任务' : ''}
                        </Text>
                        <Text style={[styles.childState,{color: colors[obj.state]}]}>
                            {states[obj.state]}
                        </Text>
                    </View>
                </View>
                <Image
                    resizeMode='stretch'
                    source={obj.urgent == 1? app.img.common_urgent: app.img.common_no_urgent}
                    style={styles.icon} />
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
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    listStyle: {
        alignSelf:'stretch',
        backgroundColor: '#EEEEEE',
    },
    rowItem: {
        width: sr.w-20,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    statusBar: {
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    childTasks: {
        fontSize: 12,
        color: '#444444'
    },
    childState: {
        fontSize: 12,
        color:'red',
    },
    numStyle: {
        marginHorizontal: 20,
    },
    rightStyle: {
        width: sr.w - 90,
    },
    title: {
        marginTop: 10,
        fontSize: 14,
        color: '#333333'
    },
    description: {
        fontSize: 12,
        marginTop: 10,
        color: '#555555',
    },
    separator: {
        height: 1,
        width: sr.w - 28,
        alignSelf: 'center',
        backgroundColor: 'gray',
    },
    icon: {
        position: 'absolute',
        right: 2,
        top: 2,
        width: 32,
        height: 33,
    },
});
