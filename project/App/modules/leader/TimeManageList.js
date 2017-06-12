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

const TaskSupervision = require('./TaskSupervision.js');
const RecordItemView = require('./RecordItemView.js');
const InputBoxAlert = require('./InputBoxAlert.js');
const InputBoxAdd = require('./InputBoxAdd.js');
const RemindCustom = require('./RemindCustom.js');
const moment = require('moment');

module.exports = React.createClass({
    getInitialState () {
        this.timeList = [];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.timeList),
        };
    },
    componentDidMount() {
        //获取日程列表
        this.getScheduleList();
    },
    getScheduleList(id) {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_SCHEDULE_LIST, param, this.getScheduleListSuccess);
    },
    getScheduleListSuccess (data) {
        if (data.success) {
            if (data.context) {
                this.timeList = data.context.scheduleList;
                for (var i = 0; i < this.timeList.length; i++) {
                    let time = app.customTime.getCustomTimes(this.timeList[i].id);
                    this.timeList[i]['customRemind'] = time || '暂无提醒，点击设置';
                }
                this.setState({dataSource: this.ds.cloneWithRows(this.timeList)});
            }
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    doComplete(id) {
        this.finishSchedule(id);
    },
    finishSchedule(id) {
        const param = {
            userId: app.personal.info.userId,
            scheduleId: id,
        };
        POST(app.route.ROUTE_FINISH_SCHEDULE, param, this.finishScheduleSuccess.bind(null,id));
    },
    finishScheduleSuccess (id,data) {
        if (data.success) {
            let item = _.find(this.timeList,(item)=>item.id === id);
            item.state = 1;
            this.setState({dataSource: this.ds.cloneWithRows(this.timeList)});
        }
    },
    doDelete(id) {
        //删除日程
        this.removeSchedule(id);
    },
    removeSchedule(id) {
        const param = {
            scheduleId: id,
        };
        POST(app.route.ROUTE_REMOVE_SCHEDULE, param, this.removeScheduleSuccess.bind(null,id));
    },
    removeScheduleSuccess (id,data) {
        if (data.success) {
            let item = _.find(this.timeList,(item)=>item.id === id);
            _.remove(this.timeList, (o) => o == item);
            this.setState({dataSource: this.ds.cloneWithRows(this.timeList)});
        }
    },
    doSave(content,id) {
        //修改日程
        this.modifySchedule(content,id);
    },
    modifySchedule(content,id) {
        const param = {
            scheduleId: id,
            userId: app.personal.info.userId,
            content: content,
        };
        POST(app.route.ROUTE_MODIFY_SCHEDULE, param, this.modifyScheduleSuccess.bind(null,content,id));
    },
    modifyScheduleSuccess (content,id,data) {
        if (data.success) {
            let item = _.find(this.timeList,(item)=>item.id === id);
            item.content = content;
            this.setState({dataSource: this.ds.cloneWithRows(this.timeList)});
        }
    },
    setAlert(id) {
        //设置提醒
        app.navigator.push({
            component: RemindCustom,
            passProps:{ doRefresh:this.doRefreshRemind, customRemind: this.state.customRemind, customId: id },
        })
        app.closeModal();
    },
    doRefreshRemind(obj,id) {
        let param = _.find(this.timeList,(o) => o.id === id);
        if (param) {
            param['customRemind'] = obj.customRemind;
            app.customTime.setCustomTime(param.customRemind, id, param.content,'日程提醒',0);
        }
    },
    doAdd(content) {
        //增加日程
        this.createSchedule(content);
    },
    createSchedule(content) {
        const param = {
            userId: app.personal.info.userId,
            content: content,
        };
        POST(app.route.ROUTE_CREATE_SCHEDULE, param, this.createScheduleSuccess);
    },
    createScheduleSuccess (data) {
        if (data.success) {
            this.getScheduleList();
        }
    },
    doUpdate(obj) {
        app.showModal(
            <InputBoxAlert doDelete={this.doDelete} doConfirm={this.doSave} setAlert={this.setAlert} data={obj} />
        );
    },
    addTimeItem() {
        app.showModal(
            <InputBoxAdd doAdd={this.doAdd} setAlert={this.setAlert}/>
        );
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View
                style={styles.separator}
                key={rowID} />
        );
    },
    renderRow (obj, sectionID, rowID) {
        return (
            <RecordItemView
                rowHeight={8}
                data={obj}
                onPress={this.doUpdate}
                doComplete={this.doComplete}
                />
        );
    },
    renderFooter () {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={this.addTimeItem}
                    style={styles.buttonStyle}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_item_add}
                        style={styles.buttonImageStyle} />
                    <Text style={styles.buttonTextStyle}>
                        新增
                    </Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        marginVertical: 5,
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#f46136',
    },
    buttonStyle: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImageStyle: {
        marginRight: 12,
        width: 13,
        height: 13,
    },
    listStyle: {
        alignSelf:'stretch',
        marginBottom: 60,
        backgroundColor: '#FFFFFF',
    },
    separator: {
        height: 1,
        width: sr.w - 40,
        alignSelf: 'center',
        backgroundColor: '#d4d4d4',
    },
    icon: {
        position: 'absolute',
        right: 2,
        top: 2,
        width: 32,
        height: 33,
    },
});
