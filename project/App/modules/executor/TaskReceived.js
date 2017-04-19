'use strict';
const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    View,
} = ReactNative;

const moment = require('moment');

const { Button, TaskStepList } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '收到下发任务',
    },
    getInitialState() {
        return {
            content: '',
        };
    },
    doUpdateTask() {
        const { id, taskList } = this.props.data;
        const {content} = this.state;
        app.socket.sendData('UPDATE_EXECUTOR_RQ', {id, content, index: taskList ? 0 : null}, (data)=>{
            Toast('更新成功');
            app.pop();
        }, true);
    },
    render () {
        const {title, description, startTime, endTime, supervisor, logsList} = this.props.data.taskList ? this.props.data.taskList[0] : this.props.data ;
        return (
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textTitle}>任务主题:</Text>
                        <Text style={styles.text_input}>{title}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textTitle}>任务描述:</Text>
                        <Text style={styles.text_input}>{description}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.textTitle}>任务开始日期:</Text>
                            <Text style={styles.textDate}>{startTime}</Text>
                        </View>
                        <View style={[styles.timeContainer, {marginTop: 25}]}>
                            <Text style={styles.textTitle}>任务结束日期:</Text>
                            <Text style={styles.textDate}>{endTime}</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textTitle}>选择任务监督人:</Text>
                        <Text style={styles.text_input}>{supervisor}</Text>
                    </View>
                    <View style={styles.taskDetailedContainer}>
                        <Text style={styles.title}>任务执行情况:</Text>
                        <TaskStepList listData={logsList} />
                    </View>
                    <View style={styles.taskDetailedContainer}>
                        <Text style={styles.title}>更新任务的执行情况:</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder='请输入任务的执行情况'
                            multiline={true}
                            onChangeText={(text) => this.setState({ content: text })}
                            style={styles.content_input}
                            />
                    </View>
                    <Button onPress={this.doUpdateTask} style={styles.btnLogin} textStyle={styles.btnLoginText}>确认任务更新</Button>
                </View>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        width: sr.w,
        marginTop: 25,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    text_input: {
        width: 250,
        marginLeft: 10,
    },
    dateContainer: {
        width: sr.w,
        marginTop: 20,
        backgroundColor:'#FFFFFF',
    },
    timeContainer:{
        width: sr.w,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textTitle:{
        fontSize: 14,
        marginLeft:25,
        color :'gray',
    },
    textDate:{
       fontSize: 14,
       marginLeft: 10,
    },
    updownlside:{
        height:30,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems: 'center',
    },
    timeTextContainer: {
        height: 35,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
        backgroundColor: '#FFFFFF',
    },
    taskDetailedContainer: {
        width: sr.w,
        marginTop: 40,
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
    },
    content_input: {
        width: sr.w-40,
        height: 80,
        marginTop: 10,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: '#EBEBEB',
    },
    btnLogin: {
        height: 46,
        width: sr.w - 100,
        marginVertical: 20,
        borderRadius: 6,
        backgroundColor: '#3BA9B0',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
