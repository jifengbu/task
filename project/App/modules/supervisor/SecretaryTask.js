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

const { Button } = COMPONENTS;
const TaskSupervision = require('./TaskSupervision.js');

module.exports = React.createClass({
    statics: {
        title: '任务详情',
    },
    getInitialState () {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            title: '',
            description: '',
            dataSource: ds.cloneWithRows([]),
        };
    },
    componentDidMount(){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        if (this.props.item) {
            this.setState({title: this.props.item.title});
            this.setState({description: this.props.item.description});
            this.setState({dataSource: ds.cloneWithRows(this.props.item.taskList)});
        }
    },
    goToSubTask(obj, itemIndex) {
        app.navigator.push({
            component: TaskSupervision,
            passProps:{item:obj, index:itemIndex},
        });
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
                <Button onPress={this.goToSubTask.bind(null, obj, n*1)} style={styles.btnLogin} textStyle={styles.btnLoginText}>提醒执行者</Button>
            </View>
        )
    },
    render () {
        const { title, description, dataSource } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务主题'+':'}</Text>
                    <Text style={styles.title}>{this.state.title}</Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>{'任务描述'+':'}</Text>
                    <Text style={styles.title}>{this.state.description}</Text>
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
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    btnStyle: {
        width: 160,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
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
