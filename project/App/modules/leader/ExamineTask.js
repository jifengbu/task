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
const GroupTaskContent = require('./GroupTaskContent.js');
const { Button, DImage } = COMPONENTS;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务审批',
    },
    getInitialState () {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            title: '',
            content: '',
            taskList: [],
            dataSource: ds.cloneWithRows([]),
        };
    },
    componentDidMount () {
        this.getGroupTaskDetail();
    },
    getGroupTaskDetail () {
        const param = {
            userId: app.personal.info.userId,
            taskId: this.props.taskId,
        };
        POST(app.route.ROUTE_GET_GROUP_TASK_DETAIL, param, this.getGroupTaskDetailSuccess);
    },
    getGroupTaskDetailSuccess (data) {
        if (data.success) {
            if (data.context) {
                const list = data.context.taskList || [];
                const title = data.context.title || '';
                const content = data.context.content || '';
                this.setState({
                    title,
                    content,
                    taskList: list,
                });
            }
        } else {
            Toast('获取数据错误，请稍后重试！');
        }
    },
    renderRow(obj, i, n) {
        return (
            <View style={styles.container}>
                <GroupTaskContent data={obj} n={n}/>
            </View>
        )
    },
    render () {
        let {title, content, taskList=[]} = this.state;
        return (
            <ScrollView style={styles.container}>
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_title_bg}
                    style={styles.titleBgImage}>
                    <Text style={styles.titleText}>{title}</Text>
                </DImage>
                <View style={styles.textStyle}>
                    <Text style={styles.describeText}>{content}</Text>
                </View>
                <View style={styles.planImage}>
                    <Text style={[styles.timeText, {marginLeft: 20}]}>{'开始时间：2017-05-10'}</Text>
                    <Text style={[styles.timeText, {marginRight: 20}]}>{'结束时间：2017-05-15'}</Text>
                </View>
                <ListView
                    initialListSize={1}
                    enableEmptySections
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource.cloneWithRows(taskList)}
                    keyboardShouldPersistTaps="always"
                    renderRow={this.renderRow}
                    />
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    planImage: {
        width: sr.w,
        height: 35,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
    },
    timeText: {
        fontSize: 12,
        color: '#aaaaaa',
    },
    textStyle: {
        width:sr.w-20,
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    describeText:{
        fontSize: 12,
        color: '#999999',
    },
});
