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

const fs = require('react-native-fs');
const AudioRecorder = require('../../native/index.js').AudioRecorder;
const Camera = require('@remobile/react-native-camera');
const ImagePicker = require('@remobile/react-native-image-picker');
const moment = require('moment');
const remindData = require('../../data/remindData.js');
const RemindSetting = require('../leader/RemindSetting.js');
const ShowBigImage = require('../leader/ShowBigImage.js');
const VoiceLongPressMessageBox = require('../leader/VoiceLongPressMessageBox.js');
const RecordVoiceMessageBox = require('../leader/RecordVoiceMessageBox.js');

const { Picker, Button, DImage, DelayTouchableOpacity } = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '添加子任务',
    },
    getInitialState () {
        this.fileInfo = {
            voiceFileUrl:'',
            voiceFilePath:'',
            voiceTime:0,
            voiceIsPlaly: false,
        };
        this.tempSupervisorClientList = [];
        this.tempExecutorClientList = [];
        this.tempTypeList = [];
        this.uploadOn=false;
        this.imgFileInfo = {
            imgFileUrl:'',
            imgFilePath:'',
        };
        return {
            title: '',
            content: '',
            taskType: '',
            startTime: moment(),
            endTime: moment(),
            supervisor: '',
            executor: '',
            remindList: [],
            customRemind: '',
            overlayShowLongPressMessageBox: false,
            overlayShowMessageBox: false,
            voiceFileData:[],
            imgFileData:[],
        };
    },
    componentDidMount() {
        this.supervisorClientList = app.supervisionClient.getList()||[];
        this.executorClientList = app.executorClient.getList()||[];
        this.typeList = app.taskType.getList()||[];
        _.forEach(this.supervisorClientList, (item) => {
            this.tempSupervisorClientList.push(item.name);
        });
        _.forEach(this.executorClientList, (item) => {
            this.tempExecutorClientList.push(item.name);
        });
        _.forEach(this.typeList, (item) => {
            this.tempTypeList.push(item.name);
        });
    },
    showLongPressMessageBox (filepath, index) {
        this.setState({ overlayShowLongPressMessageBox: true });
    },
    showMessageBox () {
        this.setState({ overlayShowMessageBox: true });
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
        Picker(this.tempSupervisorClientList, [this.tempSupervisorClientList[0]], '').then((value)=>{
            this.setState({supervisor: value[0]});
        });
    },
    showSelectExecutor() {
        Picker(this.tempExecutorClientList, [this.tempExecutorClientList[0]], '').then((value)=>{
            this.setState({executor: value[0]});
        });
    },
    showSelectType() {
        Picker(this.tempTypeList, [this.tempTypeList[0]], '').then((value)=>{
            this.setState({taskType: value[0]});
        });
    },
    showBigImage (localUrlImages, index) {
        app.showModal(
            <ShowBigImage
                doImageClose={app.closeModal}
                defaultIndex={index}
                defaultImageArray={localUrlImages} />
        );
    },
    addPohotoImg (localUrlImages, index) {
        if (this.uploadOn == true) {
            Toast('正在上传中,稍候再增加');
            return;
        }
        const options = { maximumImagesCount: 1, width: 400 };
        const filePaths = [];
        ImagePicker.getPictures(options, (results) => {
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    const filePath = results[i];
                    const item = {
                        name: 'file',
                        filename: filePath.substr(filePath.lastIndexOf('/') + 1),
                        filepath: filePath,
                        filetype: 'image/png',
                    };
                    filePaths.push(item);
                }
                this.uploadImg(filePaths[0].filepath);
            }
        }, (error) => {
        });
    },
    uploadImg(filePath) {
        this.imgFileInfo.imgFilePath = filePath;
        const options = {};
        options.fileKey = 'file';
        options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
        options.mimeType = 'image/png';
        options.params = {
            userId: app.personal.info.userId,
        };
        this.uploadOn = true;
        UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress), this.uploadSuccessCallback, this.uploadErrorCallback, true);
    },
    uploadSuccessCallback (data) {
        this.uploadOn = false;
        if (data.success) {
            this.imgFileInfo.imgFileUrl = data.context.url;
            if (this.imgFileInfo.imgFileUrl != ''
                && this.imgFileInfo.imgFilePath != '')
            {
                let {imgFileData} = this.state;
                imgFileData.push(this.imgFileInfo);
                this.setState({imgFileData});
            }
            this.imgFileInfo = {
                imgFileUrl:'',
                imgFilePath:'',
            };
        } else {
            Toast('上传失败');
            this.imgFileInfo = {
                imgFileUrl:'',
                imgFilePath:'',
            };
        }
    },
    uploadErrorCallback () {
        this.uploadOn = false;
        this.imgFileInfo = {
            imgFileUrl:'',
            imgFilePath:'',
        };
        Toast('上传失败');
    },
    doDeleteVoice (index) {
        this.setState({ overlayShowLongPressMessageBox: false });
        AudioRecorder.playStop();
        fs.unlink(his.state.voiceFileData[index].voiceFilePath);
        _.remove(this.state.voiceFileData, (item) => this.state.voiceFileData[index].voiceFileUrl
                == item.voiceFileUrl);

    },
    recordVoice () {
        if (this.uploadOn == true) {
            Toast('正在上传中,稍候再录制');
            return;
        }
        // AudioRecorder.playStop();
        const time = Date.now();
        const name = app.audioFileMgr.getFileNameFromTime(time);
        this.fileInfo.voiceFilePath = app.audioFileMgr.getFilePathFromName(name);
        AudioRecorder.record((result) => {

        }, (error) => {
            Toast('录制音频文件失败，请稍后再试');
        }, this.fileInfo.voiceFilePath);
    },
    stopRecordVoice (voiceTime) {
        this.fileInfo.voiceTime = voiceTime;
        AudioRecorder.stop((result) => {
            this.uploadVoice(this.fileInfo.voiceFilePath, voiceTime);
        }, (error) => {
            Toast('录制音频文件失败，请稍后再试');
        });
        this.setState({ overlayShowMessageBox: false });
    },
    playVoice (filepath, index) {
        let {voiceFileData} = this.state;
        _.forEach(voiceFileData, (item) => {
            item.voiceIsPlaly = false;
        });
        setTimeout(()=>{
            this.setState(voiceFileData);
        }, 200);
        AudioRecorder.playStop();
        if (voiceFileData[index].voiceIsPlaly) {
            voiceFileData[index].voiceIsPlaly = false;
        } else {
            voiceFileData[index].voiceIsPlaly = true;
            this.setState({voiceFileData});
            AudioRecorder.play(filepath, (result) => {
                voiceFileData[index].voiceIsPlaly = false;
                this.setState({voiceFileData});
            }, (error) => {
                Toast('无效音频');
                voiceFileData[index].voiceIsPlaly = false;
                this.setState({voiceFileData});
            });
        }
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
        UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress),
        this.uploadVoiceSuccessCallback.bind(null, voiceTime, filePath), this.uploadVoiceErrorCallback.bind(null, filePath), true);
    },
    uploadVoiceSuccessCallback (voiceTime, filePath, data) {
        this.uploadOn = false;
        if (data.success) {
            this.fileInfo.voiceFileUrl = data.context.url;
            if (this.fileInfo.voiceFileUrl != ''
                && this.fileInfo.voiceFilePath != ''
                && this.fileInfo.voiceIsPlaly != true
                && this.fileInfo.voiceTime != 0 )
            {
                this.state.voiceFileData.push(this.fileInfo);
                this.setState({voiceFileData: this.state.voiceFileData});
            }
            this.fileInfo = {
                voiceFileUrl:'',
                voiceFilePath:'',
                voiceTime:0,
                voiceIsPlaly: false,
            };
        } else {
            Toast('上传失败');
            this.fileInfo = {
                voiceFileUrl:'',
                voiceFilePath:'',
                voiceTime:0,
                voiceIsPlaly: false,
            };
        }
    },
    uploadVoiceErrorCallback (filePath) {
        this.fileInfo = {
            voiceFileUrl:'',
            voiceFilePath:'',
            voiceTime:0,
            voiceIsPlaly: false,
        };
        this.uploadOn = false;
    },
    doGiveup () {
        this.fileInfo = {
            voiceFileUrl:'',
            voiceFilePath:'',
            voiceTime:0,
            voiceIsPlaly: false,
        };
        AudioRecorder.stop((result) => {
        }, (error) => {
            Toast('放弃录音失败，请稍后再试');
        });
        this.setState({ overlayShowMessageBox: false });
    },
    goRemindSetting() {
        app.navigator.push({
            component: RemindSetting,
            passProps:{ doRefresh:this.doRefreshRemind, selects: this.state.remindList, customRemind: this.state.customRemind },
        })
    },
    doRefreshRemind(obj) {
        this.setState({ remindList: obj.remindList, customRemind: obj.customRemind});
    },
    doDeleteTask(index) {
        this.props.doUpdateList(index);
    },
    addTask() {
        const {title, content, startTime, endTime, supervisor, executor, taskType, remindList, imgFileData, voiceFileData} = this.state;
        let executorId = '';
        let supervisorId = '';
        for (let item of this.supervisorClientList) {
            supervisorId = item.name === supervisor? item.id:'';
        }
        for (let item of this.executorClientList) {
            executorId = item.name === executor? item.id:'';
        }
        if (!supervisorId) {
            Toast('请选择监督人');
            return;
        }
        if (!executorId) {
            Toast('请选择执行人');
            return;
        }
        const typeInfo = _.find(this.typeList, (item) => item.name === taskType);
        if (!typeInfo) {
            Toast('请选择任务类型');
            return;
        }
        let imageList = [];
        for (let item of imgFileData ) {
            imageList.push(item.imgFileUrl);
        }
        let audioList = [];
        for (let item of voiceFileData ) {
            let parameter = {
                url: item.voiceFileUrl,
                duration: item.voiceTime,
            };
            audioList.push(parameter);
        }
        const params = {
            userId: app.personal.info.userId,
            executorId,
            supervisorId,
            title,
            content,
            audioList,
            imageList,
            remindList,
            type: typeInfo.key,
            expectStartTime: moment(startTime).format('YYYY-MM-DD HH:mm'),
            expectFinishTime: moment(endTime).format('YYYY-MM-DD HH:mm'),
        };
        this.props.addChildTask(params);
        app.navigator.pop();
    },
    render () {
        const {startTime, endTime, remindList, customRemind, voiceFileData, imgFileData} = this.state;
        const obj = this.props.obj;
        return (
            <View style={styles.container}>
                <ScrollView>
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
                                !!voiceFileData.length && voiceFileData.map((item, i) => {
                                    return (
                                        <View key={i} style={[styles.audioContainer]}>
                                            <TouchableOpacity
                                                key={i}
                                                activeOpacity={0.6}
                                                onPress={this.playVoice.bind(null, item.voiceFilePath, i)}
                                                delayLongPress={1500}
                                                onLongPress={this.showLongPressMessageBox.bind(null, item, i)}
                                                style={styles.audioPlay}>
                                                <Image source={voiceFileData[i].voiceIsPlaly ? app.img.home_voice_say_play : app.img.home_voice_say} style={styles.imagevoice} />
                                                <Text style={styles.textTime} >{item.voiceTime + "''"}</Text>
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
                                    {this.getTimeText(startTime)}
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
                                    {this.getTimeText(endTime)}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.chooseContainer}>
                        <Text style={styles.menuText}>任务类型:</Text>
                        <View style={styles.updownlside}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showSelectType}
                                style={styles.timeTextContainer}
                                >
                                <Text style={styles.timeText}>
                                    {this.state.taskType||'请选择'}
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
                                        <Text style={styles.remindItemTitle}>{remindData[item]}</Text>
                                    </View>
                                );
                            })
                        }
                        {
                            !!customRemind&&
                            <View style={styles.remindItem}>
                                <DImage
                                    resizeMode='stretch'
                                    source={app.img.home_remind_check}
                                    style={styles.checkImage} />
                                <Text style={styles.remindItemTitle}>{customRemind}</Text>
                            </View>
                        }
                        {
                            (remindList.length===0 && customRemind === '') &&
                            <Text style={styles.remindTipText}>无任务提醒，是否设置</Text>
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
                                onPress={this.addPohotoImg}>
                                <DImage resizeMode='cover' source={app.img.home_add_image_icon} style={styles.imagelogostyle} />
                            </DelayTouchableOpacity>
                            <ScrollView horizontal style={styles.imageContainer}>
                                {
                                    !!imgFileData.length && imgFileData.map((item, i) => {
                                        return (
                                            <TouchableHighlight
                                                key={i}
                                                underlayColor='rgba(0, 0, 0, 0)'
                                                onPress={this.showBigImage.bind(null, this.state.imgFileData, i)}
                                                onLongPress={this.showImageLongPressMessageBox}
                                                style={styles.bigImageTouch}>
                                                <Image
                                                    key={i}
                                                    resizeMode='stretch'
                                                    source={{ uri: item.imgFilePath }}
                                                    style={styles.imageStyletu}
                                                    />
                                            </TouchableHighlight>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <Button onPress={this.addTask} style={styles.btnSubmit} textStyle={styles.btnSubmitText}>{'添    加'}</Button>
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
        marginTop: 10,
    },
    titleBgImage: {
        width: sr.w,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
        backgroundColor: 'transparent',
    },
    touchStyle: {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
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
        marginTop: 10,
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
    remindTipText: {
        marginVertical: 10,
        fontSize: 14,
        color: '#323232',
        alignSelf: 'center',
    },
    imageUpLoadContainer: {
        width: sr.w,
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