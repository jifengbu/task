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
const { Button } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '申请任务',
    },
    getInitialState () {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            taskList: [],
            dataSource: this.ds.cloneWithRows([]),
            urgent: false,
        };
    },
    addChildTask() {
        app.navigator.push({
            component: PublishTask,
            passProps: {
                addTask: this.addTask,
            }
        });
    },
    applyTask() {
        const {title, description, urgent, taskList} = this.state;
        if (!(title&&description)) {
            Toast('信息填写不完整');
            return;
        }
        app.socket.sendData('APPLY_TASK_RQ', {
            title, description, urgent, taskList
        }, (data)=>{
            Toast('申请成功');
            this.setState({taskList: [], dataSource: this.ds.cloneWithRows([]), urgent: false,  title: '', description: '',});
            app.showMainScene(1);
        }, true);
    },
    addTask(obj) {
        const { taskList, dataSource } = this.state;
        taskList.push(obj);
        this.setState({ dataSource: dataSource.cloneWithRows(taskList)});
    },
    changeUrgent () {
        this.setState({ urgent: !this.state.urgent });
    },
    renderRow(obj, i, n) {
        return (
            <View style={styles.taskItem}>
                <Text style={styles.taskTitle1}>细分任务{n*1+1}</Text>
                <Text style={styles.taskTitle}>任务主题：</Text>
                <Text style={styles.taskContext}>{obj.title}</Text>
                <Text style={styles.taskTitle}>任务描述：</Text>
                <Text style={styles.taskContext}>{obj.description}</Text>
                <Text style={styles.taskTitle}>任务结束时间：</Text>
                <Text style={styles.taskContext}>{obj.endTime}</Text>
                <Text style={styles.taskTitle}>任务监督人：</Text>
                <Text style={styles.taskContext}>{obj.supervisor}</Text>
                <Text style={styles.taskTitle}>任务执行人：</Text>
                <Text style={styles.taskContext}>{obj.executor}</Text>
                <Text style={styles.taskTitle}>任务提醒设置：</Text>
                <Text style={styles.taskContext}>{obj.remind}</Text>
            </View>
        )
    },
    render () {
        const { title, description, taskList, dataSource } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务主题'+':'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入任务主题'}
                        onChangeText={(text) => this.setState({title: text})}
                        defaultValue={title}
                        />
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务描述'+':'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入任务描述'}
                        onChangeText={(text) => this.setState({description: text})}
                        defaultValue={description}
                        />
                </View>
                <View style={styles.protocalContainer}>
                    <TouchableOpacity onPress={this.changeUrgent}>
                        <Image
                            resizeMode='cover'
                            source={this.state.urgent ? app.img.common_tick_press : app.img.common_tick}
                            style={styles.protocal_icon}
                            />
                    </TouchableOpacity>
                    <Text style={styles.protocal_text}>  加急任务 </Text>
                </View>
                <ListView
                    initialListSize={1}
                    enableEmptySections
                    removeClippedSubviews={false}
                    dataSource={dataSource}
                    keyboardShouldPersistTaps="always"
                    renderRow={this.renderRow}
                    />
                <View style={styles.emptyStyle}/>
                <View style={[styles.textStyle,{justifyContent: 'space-around'}]}>
                    <Button onPress={this.addChildTask} style={styles.btnLogin} textStyle={styles.btnLoginText}>添加子任务</Button>
                    {
                        !!taskList.length &&
                        <Button onPress={this.applyTask} style={styles.btnLogin} textStyle={styles.btnLoginText}>申请任务下发</Button>
                    }
                </View>
                <View style={styles.emptyStyle}/>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        backgroundColor: '#FFFFFF',
    },
    btnLogin: {
        height: 46,
        width: 160,
        marginVertical: 20,
        borderRadius: 6,
        backgroundColor: '#3BA9B0',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    protocalContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 20,
    },
    protocal_icon: {
        height: 18,
        width: 18,
        marginRight: 10,
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
        height: 45,
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
