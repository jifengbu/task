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
    TouchableHighlight,
    TouchableOpacity,
} = ReactNative;

const moment = require('moment');
const AudioRecorder = require('../../native/index.js').AudioRecorder;
const RemindSetting = require('./RemindSetting.js');
const VoiceLongPressMessageBox = require('./VoiceLongPressMessageBox.js');
const RecordVoiceMessageBox = require('./RecordVoiceMessageBox.js');

const { Picker, Button, DImage, DelayTouchableOpacity } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '单一任务',
    },
    getInitialState () {
        this.tempClientList = [];
        return {
            title: '',
            content: '',
            tabIndex: 0,
            startTime: moment(),
            endTime: moment(),
            supervisor: '',
            executor: '',
            remindList: [],
            overlayShowLongPressMessageBox: false,
            overlayShowMessageBox: false,
        };
    },
    componentDidMount () {
        _.forEach(app.clientList, (item) => {
            this.tempClientList.push(item.name);
        });
    },
    changeTab (tabIndex) {
        this.setState({ tabIndex });
    },
    showLongPressMessageBox (filepath, index) {
        this.setState({ overlayShowLongPressMessageBox: true });
    },
    showMessageBox () {
        this.setState({ overlayShowMessageBox: true });
    },
    recordVoice () {
        // AudioRecorder.playStop();
        // for (let i = 0; i < this.isPlaying.length; i++) {
        //     this.isPlaying[i] = false;
        // }
        // this.setState({ isPlaying: this.isPlaying });
        // const time = Date.now();
        // const name = app.audioFileMgr.getFileNameFromTime(time);
        // const filepath = app.audioFileMgr.getFilePathFromName(name);
        // this.fileInfo = {
        //     time: time,
        //     name: name,
        //     filepath: filepath,
        // };
        // AudioRecorder.record((result) => {
        //
        // }, (error) => {
        //     Toast('录制音频文件失败，请稍后再试');
        // }, filepath);
    },
    stopRecordVoice (voiceTime) {
        // this.timeArray.push(voiceTime);
        // this.setState({ voiceTime:voiceTime });
        // AudioRecorder.stop((result) => {
        //     // this.uploadVoice(this.fileInfo.filepath, voiceTime);
        // }, (error) => {
        //     Toast('录制音频文件失败，请稍后再试');
        // });
        this.setState({ overlayShowMessageBox: false });
    },
    doGiveup () {
        // AudioRecorder.stop((result) => {
        //     fs.unlink(this.fileInfo.filepath);
        // }, (error) => {
        //     Toast('放弃录音失败，请稍后再试');
        // });
        this.setState({ overlayShowMessageBox: false });
    },
    uploadVoice (filePath, voiceTime) {
        const options = {};
        options.fileKey = 'file';
        options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
        options.mimeType = 'm4a';
        options.params = {
            userID:app.personal.info.userID,
        };
        this.uploadOn = true;
        this.curUploadFile = filePath;
        UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress),
        this.uploadVoiceSuccessCallback.bind(null, voiceTime, filePath), this.uploadVoiceErrorCallback.bind(null, filePath), true);
    },
    playVoice (filepath, index) {

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
    showSelectSuperVisor() {
        Picker(this.tempClientList, [this.tempClientList[0]], '').then((value)=>{
            this.setState({supervisor: value[0]});
        });
    },
    showSelectExecutor() {
        Picker(this.tempClientList, [this.tempClientList[0]], '').then((value)=>{
            this.setState({executor: value[0]});
        });
    },
    showBigImage (localUrlImages, index) {
        // app.showModal(
        //     <AidBigImage
        //         doImageClose={app.closeModal}
        //         defaultIndex={index}
        //         defaultImageArray={localUrlImages} />
        // );
    },
    goRemindSetting() {
        app.navigator.push({
            component: RemindSetting,
            passProps:{ doRefresh:this.doRefreshRemind },
        })
    },
    doRefreshRemind(obj) {
        const { remindList } = this.state;
        this.setState({ remindList: obj});
    },
    doCreateTask() {
        const {title, content} = this.state;
        const param = {
            userID: app.personal.info.userID,
            executorId: app.personal.info.userID,
            supervisorId: app.personal.info.userID,
            title: title,
            content: content,
            audioList: [],
            imageList: [],
            remindList: [],
            type: [],
            expectStartTime: this.state.startTime,
            expectFinishTime: this.state.endTime,
        };
        POST(app.route.ROUTE_GET_SINGLE_TASK_DETAIL, param, this.getSingleTaskDetailSuccess);
    },
    getSingleTaskDetailSuccess (data) {
        if (data.success) {
            //
        } else {
            Toast('获取数据错误，请稍后重试！');
        }
    },
    render () {
        const {startTime, endTime, remindList} = this.state;
        const isFirstTap = this.state.tabIndex === 0;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.pageContainer}>
                    <View style={styles.childTaskContainer}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={[styles.input, {height: 35}]}
                            numberOfLines = {1}
                            placeholder={'点击输入任务主题'}
                            textStyle={styles.contentText}
                            placeholderTextColor={'#A7A7A7'}
                            onChangeText={(text) => this.setState({title: text})}
                            />
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={[styles.input, {height: 100}]}
                            multiline = {true}
                            placeholder={'点击输入任务描述'}
                            textStyle={styles.contentText}
                            placeholderTextColor={'#A7A7A7'}
                            onChangeText={(text) => this.setState({content: text})}
                            />
                    </View>
                    <View style={styles.voiceUpside}>
                        <TouchableOpacity onPress={this.showMessageBox} style={styles.voiceButtonView}>
                            <DImage resizeMode='cover' source={app.img.home_voice_icon2} style={styles.voiceStyle} />
                        </TouchableOpacity>
                        <ScrollView horizontal style={styles.voiceContainer}>
                            {
                                ['http: //sdfsdf', 'http: //sdfsdf'].map((item, i) => {
                                    return (
                                        <View key={i} style={[styles.audioContainer]}>
                                            <TouchableOpacity
                                                key={i}
                                                activeOpacity={0.6}
                                                onPress={this.playVoice.bind(null, item, i)}
                                                delayLongPress={1500}
                                                onLongPress={this.showLongPressMessageBox.bind(null, item, i)}
                                                style={styles.audioPlay}>
                                                <Image source={app.img.home_voice_say_play} style={styles.imagevoice} />
                                                <Text style={styles.textTime} >{'26' + "''"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.chooseContainer}>
                        <Text style={styles.menuText}>任务监督人:</Text>
                        <View style={styles.updownlside}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showSelectSuperVisor}
                                style={styles.timeTextContainer}
                                >
                                <Text style={styles.timeText}>
                                    {this.state.supervisor||'请选择'}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.menuText}>任务执行人:</Text>
                        <View style={styles.updownlside}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showSelectExecutor}
                                style={styles.timeTextContainer}
                                >
                                <Text style={styles.timeText}>
                                    {this.state.executor||'请选择'}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.chooseContainer}>
                        <Text style={styles.menuText}>开始时间:</Text>
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
                    </View>
                    <View style={styles.chooseContainer}>
                        <Text style={styles.menuText}>结束时间:</Text>
                        <View style={styles.updownlside}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showDataPicker.bind(null, 1)}
                                style={styles.timeTextContainer}
                                >
                                <Text style={styles.timeText}>
                                    {this.getDateText(endTime)}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showTimePicker.bind(null, 1)}
                                style={[styles.timeTextContainer, { marginLeft: 10 }]}
                                >
                                <Text style={styles.timeText}>
                                    {this.getTimeText(this.state.endTime)}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.remindContainer}>
                        <View style={styles.divisionLine}/>
                        <View style={styles.remindTitleView}>
                            <View style={styles.remindTitleLeftView}>
                                <DImage
                                    resizeMode='stretch'
                                    source={app.img.home_clock}
                                    style={styles.clockImage} />
                                <Text style={styles.remindTitle}>{'任务提醒'}</Text>
                            </View>
                            <Button onPress={this.goRemindSetting} style={styles.btnSet} textStyle={styles.btnSetText}>{'点击设置'}</Button>
                        </View>
                        <View style={styles.divisionLine}/>
                        {
                            remindList.map((item, i) => {
                                return (
                                    <View key={i} style={styles.remindItem}>
                                        <DImage
                                            resizeMode='stretch'
                                            source={app.img.home_remind_check}
                                            style={styles.checkImage} />
                                        <Text style={styles.remindItemTitle}>{item}</Text>
                                    </View>
                                );
                            })
                        }
                        <View style={[styles.divisionLine, {marginTop: 5}]}/>
                    </View>
                    <View style={styles.imageUpLoadContainer}>
                        <View style={styles.remindTitleLeftView}>
                            <DImage
                                resizeMode='cover'
                                source={app.img.home_accessory}
                                style={styles.clockImage} />
                            <Text style={styles.remindTitle}>{'附件'}</Text>
                        </View>
                        <View style={styles.imageStyleView}>
                            <DelayTouchableOpacity
                                activeOpacity={0.6}
                                style={styles.imageButtonView}
                                onPress={this.showPohotoImg}>
                                <DImage resizeMode='cover' source={app.img.home_add_image_icon} style={styles.imagelogostyle} />
                            </DelayTouchableOpacity>
                            <ScrollView horizontal style={styles.imageContainer}>
                                {
                                    ['http://sdfsdf', 'http://sdfsdf'].map((item, i) => {
                                        return (
                                            <TouchableHighlight
                                                key={i}
                                                underlayColor='rgba(0, 0, 0, 0)'
                                                onPress={this.showBigImage}
                                                onLongPress={this.showImageLongPressMessageBox}
                                                style={styles.bigImageTouch}>
                                                <Image
                                                    key={i}
                                                    resizeMode='stretch'
                                                    source={{ uri: item }}
                                                    style={styles.imageStyletu}
                                                    />
                                            </TouchableHighlight>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <Button onPress={this.doCreateTask} style={styles.btnSubmit} textStyle={styles.btnSubmitText}>{'确    定'}</Button>
                </ScrollView>
                {
                    this.state.overlayShowLongPressMessageBox &&
                    <VoiceLongPressMessageBox
                        doDelete={this.doDeleteVoice}
                        doBack={this.doBack} />
                }
                {
                    this.state.overlayShowMessageBox &&
                    <RecordVoiceMessageBox
                        showType={0}
                        doStartRecord={this.recordVoice}
                        doGiveup={this.doGiveup}
                        doConfirm={this.stopRecordVoice} />
                }
            </View>
        );
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pageContainer: {
        flex: 1,
        marginBottom: 55,
    },
    tabContainer: {
        width:sr.w,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ea372f',
        alignItems: 'center',
    },
    touchTab: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    tabButtonCenter: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    tabButtonRight: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 9,
    },
    tabText: {
        fontSize: 13,
    },
    tabLine: {
        width: 2,
        height: 20,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    mainTakContainer: {
        width: sr.w,
    },
    input: {
        width: sr.w-20,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 6,
        textAlignVertical: 'top',
        paddingVertical: 2,
        backgroundColor: '#f1f1f1',
    },
    contentText: {
        fontSize: 16,
        color: '#A7A7A7',
        lineHeight: 24,
        fontFamily: 'STHeitiSC-Medium',
    },
    childTaskContainer: {
        width: sr.w,
    },
    titleBgImage: {
        width: sr.w,
        height: 40,
        justifyContent: 'center',
    },
    titleText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    voiceUpside: {
        height: 47,
        marginTop: 21,
        flexDirection:'row',
        backgroundColor:'#FFFFFF',
    },
    voiceStyleView: {
        height: 48,
        width:50,
        justifyContent: 'center',
    },
    voiceButtonView: {
        marginLeft:10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    voiceStyle: {
        height: 32,
        width: 21,
    },
    voiceContainer: {
        flexDirection: 'row',
        marginLeft:20,
    },
    audioContainer: {
        width: 70,
        height:47,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    audioPlay: {
        height: 35,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
    },
    imagevoice:{
        width:17,
        height:22,
        marginRight: 10,
    },
    bigImageTouch: {
        flexDirection: 'row',
        width: 100,
        height: 100,
        marginHorizontal: 2,
    },
    textTime:{
        fontSize: 12,
        textAlign: 'left',
        color :'gray',
    },
    chooseContainer: {
        width:sr.w,
        height:45,
        flexDirection: 'row',
        alignItems:'center',
    },
    menuText: {
        color: 'black',
        fontSize: 14,
        marginLeft: 15,
    },
    updownlside:{
        height:30,
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
    divisionLine: {
        width: sr.w-20,
        height: 1,
        marginLeft: 10,
        backgroundColor: '#D7D7D7',
    },
    remindContainer: {
        width: sr.w,
    },
    remindTitleView: {
        width: sr.w,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    remindTitleLeftView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
    },
    clockImage: {
        width: 25,
        height: 25,
    },
    remindTitle: {
        fontSize: 14,
        color: '#323232',
        marginLeft: 5,
        fontFamily: 'STHeitiSC-Medium',
    },
    btnSet: {
        height: 30,
        width: 80,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 6,
        backgroundColor: '#f3433d',
    },
    btnSetText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    remindItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 20,
    },
    checkImage: {
        width: 20,
        height: 20,
    },
    remindItemTitle: {
        fontSize: 12,
        color: '#323232',
        marginLeft: 5,
    },
    imageUpLoadContainer: {
        width: sr.w,
        marginTop: 10,
    },
    imageStyleView: {
        height: 134,
        alignItems: 'center',
        flexDirection:'row',
    },
    imageButtonView: {
        height: 105,
        width:105,
        marginLeft:10,
        backgroundColor:'#EEEEEE',
    },
    imagelogostyle: {
        height: 105,
        width:105,
    },
    imageContainer: {
        flexDirection: 'row',
        marginLeft:10,
    },
    imageStyletu: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    addKidTaskContainer: {
        width: sr.w,
        height: 45,
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
    },
    addImage: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    addText: {
        fontSize: 14,
        color: '#f34c47',
        marginLeft: 10,
    },
    btnSubmit: {
        height: 35,
        width: sr.w - 40,
        marginTop: 30,
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 30,
        backgroundColor: '#20c5bb',
    },
    btnSubmitText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
