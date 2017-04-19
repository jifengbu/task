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
    TouchableOpacity,
} = ReactNative;

const moment = require('moment');

const { Picker, Button } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '填写细分任务',
    },
    getDefaultProps() {
        return {
            task: {
                title: '',
                description: '',
                supervisor: '王经理',
                executor: '王东来',
                remind: '每天提醒1次',
            }
        };
    },
    getInitialState () {
        const {title, description, startTime, endTime, supervisor, executor, remind} = this.props.task;
        return {
            title,
            description,
            supervisor,
            executor,
            remind,
            startTime: moment(),
            endTime: moment(),
        };
    },
    showSelectSuperVisor() {
        const {supervisor} = this.props.task;
        Picker(['王经理', '李经理'], [supervisor], '').then((value)=>{
            this.setState({supervisor: value[0]});
        });
    },
    showSelectExecutor() {
        const {executor} = this.props.task;
        Picker(['王东来', '李敏镐'], [executor], '').then((value)=>{
            this.setState({executor: value[0]});
        });
    },
    showSelectRemind() {
        const {remind} = this.props.task;
        Picker(['每天提醒1次', '每天提醒2次',  '每天提醒3次'], [remind], '').then((value)=>{
            this.setState({remind: value[0]});
        });
    },
    showDataPicker(index) {
        let date = index===0 ? this.state.startTime : this.state.endTime;
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
        let time = index===0 ? this.state.startTime : this.state.endTime;
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
            if (index === 0 ) {
                this.setState({ startTime: date });
            } else {
                this.setState({ endTime: date });
            }
        }  else if (type === 'time') {
            const time = moment(value, 'HH时mm分');
            const startTime = (index === 0 ) ? this.state.startTime : this.state.endTime;
            const date = moment(startTime.year() + '年' + (startTime.month() + 1) + '月' +
            startTime.date() + '日' + time.hour() + '时' + time.minute() + '分', 'YYYY年MM月DD日HH时mm分');
            if (index === 0 ) {
                this.setState({ startTime: date });
            } else {
                this.setState({ endTime: date });
            }
        }
    },
    getDateText (date) {
        return moment(date).format('YYYY年MM月DD日');
    },
    getTimeText (date) {
        return moment(date).format('HH时mm分');
    },
    applyTask() {
        const {title, description, startTime, endTime, supervisor, executor, remind} = this.state;
        if (!(title&&description&&startTime&&endTime&&supervisor&&executor&&remind)) {
            Toast('信息填写不完整');
            return;
        }
        const params = {
            title,
            description,
            startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            supervisor,
            executor,
            remind,
        };
        console.log(params);
        if (this.props.addTask) { //添加任务
            this.props.addTask(params);
            app.pop();
        } else {
            Object.assign(this.props.task, params);
            console.log( {id: this.props.id, index: this.props.index, childTask: params});
            app.socket.sendData('UPDATE_TASK_RQ', {id: this.props.id, index: this.props.index, childTask: params}, (data)=>{
                Toast('变更任务成功');
                this.props.updateTask();
                app.pop();
            }, true);
        }
    },
    render () {
        const {title, description, startTime, endTime, supervisor, executor, remind} = this.state;
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
                <View style={styles.textStyle}>
                    <Text style={styles.title}>任务开始时间:</Text>
                    <View style={styles.updownlside}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showDataPicker.bind(null, 0)}
                            style={styles.timeTextContainer}
                            >
                            <Text style={styles.timeText}>
                                {this.getDateText(startTime)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showTimePicker.bind(null, 0)}
                            style={[styles.timeTextContainer, { marginLeft: 10 }]}
                            >
                            <Text style={styles.timeText}>
                                {this.getTimeText(this.state.startTime)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>任务结束时间:</Text>
                    <View style={styles.updownlside}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showDataPicker.bind(null, 1)}
                            style={styles.timeTextContainer}
                            >
                            <Text style={styles.timeText}>
                                {this.getDateText(endTime)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.showTimePicker.bind(null, 1)}
                            style={[styles.timeTextContainer, { marginLeft: 10 }]}
                            >
                            <Text style={styles.timeText}>
                                {this.getTimeText(this.state.endTime)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>选择任务监督人：</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.showSelectSuperVisor}
                        style={styles.inputContainer}
                        >
                        <Text style={styles.inputText}>
                            {supervisor||'请选择任务监督人'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>选择任务执行人：</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.showSelectExecutor}
                        style={styles.inputContainer}
                        >
                        <Text style={styles.inputText}>
                            {executor||'请选择任务执行人'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.title}>任务提醒设置：</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.showSelectRemind}
                        style={styles.inputContainer}
                        >
                        <Text style={styles.inputText}>
                            {remind}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyStyle}/>
                <View style={[styles.textStyle,{justifyContent: 'center'}]}>
                    <Button onPress={this.applyTask} style={styles.btnLogin} textStyle={styles.btnLoginText}>{this.props.addTask ? '确认添加任务' : '确认变更任务'}</Button>
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
        paddingTop: 30,
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
    input: {
        width: 200,
        height: 45,
        fontSize: 14,
    },
    inputContainer: {
        width: 200,
        height: 45,
        justifyContent: 'center',
    },
    inputText: {
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
