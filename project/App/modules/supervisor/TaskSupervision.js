'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} = ReactNative;

const { Button, TaskStepList } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '任务监督',
    },
    getInitialState () {
        return {
            text: '',
        };
    },
    doAnonymousLogin() {
        app.socket.sendData('ALERT_EXECUTOR_RQ', {id:this.props.data.id, content:this.state.text, index:this.props.index}, (data)=>{
            app.pop();
            Toast('监督提醒成功');
        }, true);
    },
    render () {
        const obj = this.props.data;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.textTitle}>任务的主题:  </Text>
                    <Text style={styles.textTitle}>{obj.title}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={this.showDataPicker} style={styles.timeContainer}>
                        <Text style={styles.textTitle}>任务开始日期:</Text>
                        <Text style={styles.textTitle}>{obj.startTime}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showDataPicker} style={styles.timeContainer}>
                        <Text style={styles.textTitle}>任务结束日期:</Text>
                        <Text style={styles.textTitle}>{obj.endTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.taskDetailedContainer}>
                    <Text style={styles.title}>任务执行情况:</Text>
                </View>
                <TaskStepList listData={obj.logsList} />
                <TextInput
                    style={styles.input}
                    multiline={true}
                    maxLength={24}
                    placeholder={'请输入提醒内容(限制24字以内)'}
                    onChangeText={(text) => this.setState({text})}
                    />
                <Button onPress={this.doAnonymousLogin} style={styles.btnLogin} textStyle={styles.btnLoginText}>提醒下执行者</Button>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        width: sr.w,
        height: 46,
        overflow: 'hidden',
        alignItems:'center',
        flexDirection: 'row',
    },
    dateContainer: {
        width: sr.w,
        backgroundColor:'#FFFFFF',
    },
    timeContainer:{
        height:40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textTitle:{
        fontSize: 14,
        marginLeft:20,
        color :'gray',
    },
    input:{
        fontSize: 14,
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        width: sr.w - 20,
        alignSelf: 'center',
        textAlign: 'left',
    },
    updownlside:{
        height:30,
        flexDirection:'row',
        alignItems: 'center',
    },
    textupcenter:{
        fontSize: 14,
        marginRight: 10,
    },
    taskDetailedContainer: {
        width: sr.w,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
    },
    btnLogin: {
        height: 46,
        width: sr.w - 100,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 30,
        backgroundColor: '#3BA9B0',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
