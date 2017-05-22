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
const TaskContent = require('./TaskContent.js');
const { Button, DImage } = COMPONENTS;

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
    renderRow(obj, i, n) {
        return (
            <View style={styles.container}>
                <TaskContent data={this.props.data} n={n}/>
            </View>
        )
    },
    render () {
        let {agree} = this.state;
        let {title, description, taskList=[1,2]} = this.props.data;
        return (
            <ScrollView style={styles.container}>
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_title_bg}
                    style={styles.titleBgImage}>
                    <Text style={styles.titleText}>{title||'中央经济会议'}</Text>
                </DImage>
                <View style={styles.textStyle}>
                    <Text style={styles.describeText}>{'三六九等福利卡将受到法律框架看得十分艰苦拉萨定居风口浪尖卅卡德罗夫家里的沙发款式独家福利卡绝世独立看风景啊离开的'}</Text>
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
