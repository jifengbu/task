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

const PublishTask = require('./PublishTask');
const { Button, TaskStepList } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '任务详情',
    },
    getInitialState () {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return this.props.data;
    },
    updateTask() {
        const {taskList} = this.state;
        this.setState({taskList});
    },
    doModifyTask(childTask, id, index) {
        app.navigator.push({
            component: PublishTask,
            title: '变更任务',
            passProps: {
                task: childTask,
                id,
                index,
                updateTask: this.updateTask,
            }
        });
    },
    doReapplyTask(task, id) {
        app.socket.sendData('REAPPLY_TASK_RQ', {id, task}, (data)=>{
            app.navigator.pop();
            Toast('申请成功');
        }, true);
    },
    renderRow(obj, i, n) {
        return (
            <View style={styles.taskItem}>
                <Text style={styles.taskTitle1}>细分任务{n*1+1}</Text>
                <Text style={styles.taskTitle}>任务主题：</Text>
                <Text style={styles.taskContext}>{obj.title}</Text>
                <Text style={styles.taskTitle}>任务描述：</Text>
                <Text style={styles.taskContext}>{obj.description}</Text>
                <Text style={styles.taskTitle}>任务开始时间：</Text>
                <Text style={styles.taskContext}>{obj.startTime}</Text>
                <Text style={styles.taskTitle}>任务结束时间：</Text>
                <Text style={styles.taskContext}>{obj.endTime}</Text>
                <Text style={styles.taskTitle}>任务监督人：</Text>
                <Text style={styles.taskContext}>{obj.supervisor}</Text>
                <Text style={styles.taskTitle}>任务执行人：</Text>
                <Text style={styles.taskContext}>{obj.executor}</Text>
                <Text style={styles.taskTitle}>任务提醒设置：</Text>
                <Text style={styles.taskContext}>{obj.remind}</Text>
                <View style={[styles.textStyle,{justifyContent: 'center'}]}>
                    <Button onPress={this.doModifyTask.bind(null, obj, this.props.data.id, n)} style={styles.btnLogin} textStyle={styles.btnLoginText}>变更任务</Button>
                </View>
                <TaskStepList listData={obj.logsList}/>
            </View>
        )
    },
    render () {
        const { title, description, taskList } = this.state;
        const obj = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务主题'+':'}</Text>
                    <Text style={styles.input}>{title}</Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务描述'+':'}</Text>
                    <Text style={styles.input}>{description}</Text>
                </View>
                {
                    taskList ?
                    <ListView
                        initialListSize={1}
                        enableEmptySections
                        removeClippedSubviews={false}
                        dataSource={this.ds.cloneWithRows(taskList)}
                        keyboardShouldPersistTaps="always"
                        renderRow={this.renderRow}
                        />
                    :
                    <View style={styles.taskItem}>
                        <Text style={styles.taskContext}>{obj.description}</Text>
                        <Text style={styles.taskTitle}>任务开始时间：</Text>
                        <Text style={styles.taskContext}>{obj.startTime}</Text>
                        <Text style={styles.taskTitle}>任务结束时间：</Text>
                        <Text style={styles.taskContext}>{obj.endTime}</Text>
                        <Text style={styles.taskTitle}>任务监督人：</Text>
                        <Text style={styles.taskContext}>{obj.supervisor}</Text>
                        <Text style={styles.taskTitle}>任务执行人：</Text>
                        <Text style={styles.taskContext}>{obj.executor}</Text>
                        <Text style={styles.taskTitle}>任务提醒设置：</Text>
                        <Text style={styles.taskContext}>{obj.remind}</Text>
                        <View style={[styles.textStyle,{justifyContent: 'center'}]}>
                            <Button onPress={this.doModifyTask.bind(null, obj, this.props.data.id, null)} style={styles.btnLogin} textStyle={styles.btnLoginText}>变更任务</Button>
                        </View>
                        <TaskStepList listData={obj.logsList}/>
                    </View>
                }
                <View style={styles.emptyStyle}/>
                {
                    obj.state == 1 &&
                    <View style={[styles.textStyle,{justifyContent: 'center'}]}>
                        <Button onPress={this.doReapplyTask.bind(null, obj, obj.id)} style={[styles.btnLogin, {backgroundColor: '#A52A2A'}]} textStyle={styles.btnLoginText}>重新申请任务下发</Button>
                    </View>
                }
                <View style={styles.emptyStyle}/>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    btnLogin: {
        height: 46,
        width: 220,
        marginVertical: 20,
        borderRadius: 6,
        backgroundColor: '#3BA9B0',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    taskItem: {
        marginTop: 10,
        backgroundColor: '#EEEEE0',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    taskTitle1: {
        fontSize: 18,
        color: '#A0522D',
        marginBottom: 10,
        textAlign: 'center',
    },
    taskTitle: {
        fontSize: 16,
        color: '#8B6914',
        marginLeft: 10,
    },
    taskContext: {
        fontSize: 14,
        marginLeft: 50,
        marginTop: 10,
        marginBottom: 10,
        color: '#BDBDBD',
    },
    textStyle: {
        width:sr.w,
        height:45,
        flexDirection: 'row',
        alignItems:'center',
    },
    title: {
        color: 'black',
        marginHorizontal: 20,
        fontSize: 14,
    },
    input: {
        width: 200,
        fontSize: 14,
    },
    emptyStyle: {
        width: sr.w,
        height: 30,
        backgroundColor: '#FFFFFF',
    },
    topLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: sr.w,
        height: 2,
        backgroundColor: 'black',
    },
    topTextStyle: {
        width: sr.w,
        height: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
