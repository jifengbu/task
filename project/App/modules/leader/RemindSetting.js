'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} = ReactNative;

const moment = require('moment');
const RemindItemView = require('./RemindItemView.js');

const { Picker, Button, DImage } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        color: '#FFFFFF',
        title: '提醒设置',
        rightButton: { title: '完成', delayTime:1, handler: () => { app.scene.updateRemind(); } },
    },
    getInitialState () {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            customRemindList: [],
            remindList: [],
            customRemindIsOver: false,
            startTime: moment(),
            defaultRemindList:[{'id': '1', 'content':'每天8:00提醒', 'isOver': 0}, {'id': '2', 'content':'每天中午12点提醒', 'isOver': 0}, {'id': '3', 'content':'任务结束前1小时提醒', 'isOver': 1}],
        };
    },
    updateRemind () {
        Picker.hide();
        let {remindList, customRemindIsOver, startTime, defaultRemindList} = this.state;
        if (customRemindIsOver) {
            remindList.push(moment(startTime).format('YYYY年MM月DD日 HH时mm分'));
        }
        _.forEach(defaultRemindList, (item) => {
            if (item.isOver) {
                remindList.push(item.content);
            }
        });
        this.props.doRefresh(this.state.remindList);
        app.navigator.pop();
    },
    doActuallyComplete (currentID) {
        let {defaultRemindList} = this.state;
        const remindInfo = _.find(this.state.defaultRemindList, (item) => item.id == currentID);
        if (remindInfo) {
            if (remindInfo.isOver) {
                remindInfo.isOver = 0;
            } else {
                remindInfo.isOver = 1;
            }
        }
        this.setState({defaultRemindList: defaultRemindList});
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID} />
        );
    },
    renderRowDayCommplete (obj) {
        return (
            <RemindItemView
                data={obj}
                rowHeight={10}
                doComplete={this.doActuallyComplete.bind(null, obj.id)}
                />
        );
    },
    showDataPicker(index) {
        let date = this.state.startTime;
        const now = moment();
        if (date.isBefore(now)) {
            date = now;
        }
        this.pickerType = 'date';
        let pickerData = app.utils.createDateData(now);
        let defaultSelectValue = [date.year() + '年', (date.month() + 1) + '月', date.date() + '日'];
        Picker(pickerData, defaultSelectValue, '').then((value)=>{
            this.setChooseValue(value, index);
        });
    },
    showTimePicker (index) {
        let time = this.state.startTime;
        const now = moment();
        if (time.isBefore(now)) {
            time = now;
        }
        this.pickerType = 'time';
        let _now = new moment();
        const ih = _now.hour(), it = _now.minute();
        let hour = time.hour(), minute = time.minute();
        if (this.isToday) {
            hour = (ih > hour) ? ih : hour;
            minute = (it > minute) ? it : minute;
        }
        let pickerData = app.utils.createTimeData(_now);
        let defaultSelectValue = [hour + '时', minute + '分'];
        Picker(pickerData, defaultSelectValue, '').then((value)=>{
            this.setChooseValue(value, index);
        });
    },
    setChooseValue (value, index) {
        const type = this.pickerType;
        if (type === 'date') {
            const date = moment(value, 'YYYY年MM月DD日');
            this.isToday = date.isSame(moment().startOf('day'));
            if (this.isToday) {
                const now = new moment();
                const ih = now.hour(), it = now.minute();
                date.add(ih, 'hour').add(it, 'minute');
            }
            this.setState({ startTime: date });
        }  else if (type === 'time') {
            const time = moment(value, 'HH时mm分');
            const startTime = this.state.startTime;
            const date = moment(startTime.year() + '年' + (startTime.month() + 1) + '月' +
            startTime.date() + '日' + time.hour() + '时' + time.minute() + '分', 'YYYY年MM月DD日HH时mm分');
            this.setState({ startTime: date });
        }
    },
    getDateText (date) {
        return moment(date).format('YYYY年MM月DD日');
    },
    getTimeText (date) {
        return moment(date).format('HH时mm分');
    },
    doChoose() {
        this.setState({customRemindIsOver: !this.state.customRemindIsOver});
    },
    render () {
        const {startTime} = this.state;
        return (
            <ScrollView style={styles.container}>
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_task_bg}
                    style={styles.titleBgImage}>
                    <Text style={styles.titleText}>{'默认提醒'}</Text>
                </DImage>
                <ListView
                    style={styles.list}
                    enableEmptySections
                    dataSource={this.ds.cloneWithRows(this.state.defaultRemindList)}
                    renderRow={this.renderRowDayCommplete}
                    renderSeparator={this.renderSeparator}
                    />
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_task_bg}
                    style={styles.titleBgImage}>
                    <Text style={styles.titleText}>{'在指定日期提醒我'}</Text>
                </DImage>
                <View style={styles.chooseContainer}>
                    <View style={styles.updownlside}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showDataPicker.bind(null, 0)}
                            style={styles.timeTextContainer}
                            >
                            <Text style={styles.timeText}>
                                {this.getDateText(startTime)}
                            </Text>
                            <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showTimePicker.bind(null, 0)}
                            style={[styles.timeTextContainer, { marginLeft: 10 }]}
                            >
                            <Text style={styles.timeText}>
                                {this.getTimeText(this.state.startTime)}
                            </Text>
                            <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.doChoose}
                        style={styles.btnStyle}>
                        <Image
                            resizeMode='contain'
                            source={this.state.customRemindIsOver?app.img.leader_item_over:app.img.leader_item_notOver}
                            style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
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
        height: 35,
        justifyContent: 'center',
    },
    titleText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    separator: {
        width: sr.w - 30,
        height: 1,
        backgroundColor: '#F1F0F5',
        alignSelf: 'center',
    },
    list: {
        alignSelf:'stretch',
    },
    chooseContainer: {
        width:sr.w,
        height:45,
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    menuText: {
        color: 'black',
        fontSize: 14,
        marginLeft: 15,
    },
    updownlside:{
        height:30,
        marginLeft: 20,
        flexDirection:'row',
        alignItems: 'center',
    },
    timeTextContainer: {
        height: 35,
        borderRadius: 4,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 13,
        backgroundColor: 'transparent',
    },
    downCheckImage: {
        width: 21,
        height: 12,
    },
    btnStyle: {
        width: 40,
        height: 22,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 18,
        height: 18,
    },
});
