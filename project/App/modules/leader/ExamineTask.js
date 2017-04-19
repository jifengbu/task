'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TextInput,
    TouchableOpacity,
} = ReactNative;

const Subscribable = require('Subscribable');
const { Button } = COMPONENTS;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '书记，主任批准代发',
    },
    getInitialState () {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            agree: 1,
            dataSource: ds.cloneWithRows([]),
        };
    },
    toPublishTask() {
        let {id} = this.props.data;
        const {content='', agree} = this.state;
        app.socket.sendData('APPROVAL_TASK_RQ', {
            id, content, agree
        }, (data)=>{
            app.navigator.pop();
            Toast('审批完成');
        }, true);
    },
    toBack() {
        app.navigator.pop();
    },
    changTab(index) {
      this.setState({agree: index});
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
        let {agree} = this.state;
        let {title, description, taskList=[]} = this.props.data;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务主题'+':'}</Text>
                    <Text style={styles.textupcenter}>{title}</Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务描述'+':'}</Text>
                    <Text style={styles.textupcenter}>{description}</Text>
                </View>
                <ListView
                    initialListSize={1}
                    enableEmptySections
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource.cloneWithRows(taskList)}
                    keyboardShouldPersistTaps="always"
                    renderRow={this.renderRow}
                    />
                <View style={styles.emptyStyle}/>
                <Text style={styles.title}>{'领导提示'+':'}</Text>
                <TouchableOpacity
                    style={[styles.btnStyle,{marginLeft: 60, borderWidth: 0}]}
                    onPress={this.changTab.bind(null,1)}>
                    <Image
                        resizeMode='contain'
                        source={agree?app.img.common_cicleTick:app.img.common_cicle}
                        style={styles.iconBtnStyle}>
                    </Image>
                    <Text style={styles.title}>{'通过，可以发布任务'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnStyle,{marginLeft: 60, borderWidth: 0},]}
                    onPress={this.changTab.bind(null,0)}>
                    <Image
                        resizeMode='contain'
                        source={!agree?app.img.common_cicleTick:app.img.common_cicle}
                        style={styles.iconBtnStyle}>
                    </Image>
                    <Text style={styles.title}>{'不通过，原因如下'}</Text>
                </TouchableOpacity>
                {
                    !agree&&
                    <TextInput
                        style={[styles.input,{marginLeft: 20, paddingHorizontal: 20,height: 60,width: 300, backgroundColor: '#F2F2F2'}]}
                        placeholder={'请输入不通过原因'}
                        multiline
                        placeholderTextColor={'#BABABA'}
                        onChangeText={(text) => this.setState({content: text})}
                        />
                }
                <View style={styles.emptyStyle}/>
                <View style={[styles.textStyle,{justifyContent: 'center'}]}>
                    <Button onPress={this.toPublishTask} style={styles.btnLogin} textStyle={styles.btnLoginText}>确定</Button>
                </View>
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
        fontSize: 16,
    },
    textupcenter:{
        fontSize: 14,
    },
    input: {
        width: 200,
        height: 45,
        textAlignVertical: 'top',
    },
    emptyStyle: {
        width: sr.w,
        height: 30,
        backgroundColor: '#FFFFFF',
    },
    btnStyle: {
        width: 200,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
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
    iconBtnStyle: {
        width: 22,
        height: 22,
    },
});
