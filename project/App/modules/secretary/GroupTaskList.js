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
const Audio = require('@remobile/react-native-audio');
const VoiceLongPressMessageBox = require('../leader/VoiceLongPressMessageBox.js');
const RemindSetting = require('../leader/RemindSetting.js');
const ShowBigImage = require('../leader/ShowBigImage.js');
const ChildTaskDetail = require('./ChildTaskDetail.js');
const modifyChildTaskDetail = require('./modifyChildTaskDetail.js');
const remindData = require('../../data/remindData.js');

const { Picker, Button, DImage, DelayTouchableOpacity } = COMPONENTS;

const TaskList = React.createClass({
    getInitialState () {
        this.isPlaying = _.fill(Array(this.props.obj.audioList.length), false);
        return {
            isPlaying: this.isPlaying,
        };
    },
    componentWillUnmount () {
        clearInterval(this.intervalID);
        this.intervalID = null;
        if (this.player) {
            this.voiceStop();
        }
    },
    voiceStop () {
        this.player.stop();
        this.player.release();
        this.player = null;
    },
    isPlayer () {
        if (this.player) {
            this.voiceStop();
            this.isPlaying[this.isPlayingIndex] = false;
            this.setState({ isPlaying: this.isPlaying });
        }
    },
    playVoice(url, index) {
        if (!url || url === 'null') {
            Toast('音频地址为空');
            return;
        }
        if (this.player && this.isPlaying[index]) {
            this.voiceStop();
            this.isPlaying[index] = false;
            this.setState({ isPlaying: this.isPlaying });
        } else {
            const tempIsPlaying = _.find(this.isPlaying, (item) => item == true);
            if (tempIsPlaying && tempIsPlaying != null) {
                if (this.player != null) {
                    this.player.stop();
                    this.player.release();
                }
                this.player = null;
                this.isPlaying[this.tempIndex] = false;
                this.setState({ isPlaying: this.isPlaying });
                this.player = new Audio(url, (error) => {
                    if (!error) {
                        this.isPlaying[index] = true;
                        this.setState({ isPlaying: this.isPlaying });
                        this.tempIndex = index;
                        this.player != null && this.player.play(() => {
                            this.player.release();
                            this.player = null;
                            this.isPlaying[index] = false;
                            this.setState({ isPlaying: this.isPlaying });
                        });
                    } else {
                        Toast('播放失败');
                    }
                });
            } else {
                this.player = new Audio(url, (error) => {
                    if (!error) {
                        this.isPlaying[index] = true;
                        this.setState({ isPlaying: this.isPlaying });
                        this.tempIndex = index;
                        this.player != null && this.player.play(() => {
                            this.player.release();
                            this.player = null;
                            this.isPlaying[index] = false;
                            this.setState({ isPlaying: this.isPlaying });
                        });
                    } else {
                        Toast('播放失败');
                    }
                });
            }
        }
        this.isPlayingIndex = index;
    },
    showBigImage (imageArray, index) {
        app.showModal(
            <ShowBigImage
                doImageClose={app.closeModal}
                defaultIndex={index}
                defaultImageArray={imageArray} />
        );
    },
    doDeleteTask(index) {
        this.props.doUpdateList(index);
    },
    doModifyTask(index) {
        this.props.doModifyTaskAction(index);
    },
    render () {
        const {obj} = this.props;
        const supervisorClientList = app.supervisionClient.getList()||[];
        const executorClientList = app.executorClient.getList()||[];
        const typeList = app.taskType.getList()||[];
        const supervisorInfo = _.find(supervisorClientList, (item) => item.id === obj.supervisorId);
        const executorInfo = _.find(executorClientList, (item) => item.id === obj.executorId);
        const typeInfo = _.find(typeList, (item) => item.key === obj.type);
        return (
            <View style={styles.itemContainer}>
                <View style={styles.childTaskContainer}>
                    <DImage
                        resizeMode='stretch'
                        source={app.img.home_task_bg}
                        style={styles.titleBgImage}>
                        <Text style={[styles.titleText, {color: '#FFFFFF'}]}>{'子任务'+parseInt(this.props.n*1+1)}</Text>
                        <TouchableOpacity onPress={this.doModifyTask.bind(null, this.props.n)} style={styles.touchStyle}>
                            <Text style={styles.deleteText}>{'修改'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.doDeleteTask.bind(null, this.props.n)} style={styles.touchStyle}>
                            <Text style={styles.deleteText}>{'删除'}</Text>
                        </TouchableOpacity>
                    </DImage>
                    <View style={styles.contentView}>
                        <Text style={[styles.titleText, {color: '#323232'}]}>{'子任务标题'}</Text>
                        <Text style={styles.contentText}>{obj.title}</Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={[styles.titleText, {color: '#323232'}]}>{'子任务描述'}</Text>
                        <Text style={styles.contentText}>{obj.content}</Text>
                    </View>
                </View>
                <View style={styles.chooseContainer}>
                    <Text style={styles.menuText}>任务监督人:</Text>
                    <View style={styles.updownlside}>
                        <Text style={styles.timeText}>
                            {!!supervisorInfo&&supervisorInfo.name}
                        </Text>
                    </View>
                    <Text style={styles.menuText}>任务执行人:</Text>
                    <View style={styles.updownlside}>
                        <Text style={styles.timeText}>
                            {!!executorInfo&&executorInfo.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.chooseContainer}>
                    <Text style={styles.menuText}>开始时间:</Text>
                    <View style={styles.updownlside}>
                        <Text style={styles.timeText}>
                            {obj.expectStartTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.chooseContainer}>
                    <Text style={styles.menuText}>结束时间:</Text>
                    <View style={styles.updownlside}>
                        <Text style={styles.timeText}>
                            {obj.expectFinishTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.chooseContainer}>
                    <Text style={styles.menuText}>任务类型:</Text>
                    <View style={styles.updownlside}>
                        <Text style={styles.timeText}>
                            {!!typeInfo&&typeInfo.name}
                        </Text>
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
                    </View>
                    <View style={styles.divisionLine}/>
                    {
                        obj.remindList.map((item, i) => {
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
                        !!obj.customRemind&&
                        <View style={styles.remindItem}>
                            <DImage
                                resizeMode='stretch'
                                source={app.img.home_remind_check}
                                style={styles.checkImage} />
                            <Text style={styles.remindItemTitle}>{obj.customRemind}</Text>
                        </View>
                    }
                    {
                        (obj.remindList.length===0 && obj.customRemind === '') &&
                        <Text style={styles.remindTipText}>无任务提醒，是否设置</Text>
                    }
                    <View style={[styles.divisionLine, {marginTop: 5}]}/>
                </View>
                {
                    !!obj.audioList&&
                    <View style={styles.voiceUpside}>
                        <ScrollView horizontal style={styles.voiceContainer}>
                            {
                                obj.audioList.map((item, i) => {
                                    return (
                                        <View key={i} style={[styles.audioContainer]}>
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                delayLongPress={1500}
                                                onPress={this.playVoice.bind(null, item.url, i)}
                                                style={styles.audioPlay}>
                                                <Image source={this.state.isPlaying[i]?app.img.home_voice_say_play : app.img.home_voice_say} style={styles.imageVoice} />
                                                <Text style={styles.textTime} >{item.duration + "''"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                }
                {
                    !!obj.imageList&&
                    <View style={styles.imageUpLoadContainer}>
                        <View style={styles.remindTitleLeftView}>
                            <DImage
                                resizeMode='cover'
                                source={app.img.home_accessory}
                                style={styles.clockImage} />
                            <Text style={styles.remindTitle}>{'附件'}</Text>
                        </View>
                        <View style={styles.imageStyleView}>
                            <ScrollView horizontal style={styles.imageContainer}>
                                {
                                    obj.imageList.map((item, i) => {
                                        return (
                                            <TouchableHighlight
                                                key={i}
                                                underlayColor='rgba(0, 0, 0, 0)'
                                                onPress={this.showBigImage.bind(null, obj.imageList, i)}
                                                style={styles.bigImageTouch}>
                                                <Image
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
                }
            </View>
        );
    },
});
module.exports = React.createClass({
    getInitialState () {
        this.leaderList = [];
        this.tempLeaderList = [];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !_.isEqual(r1, r2) });
        return {
            taskList: [],
            leader: '',
            dataSource: this.ds.cloneWithRows([]),
        };
    },
    onWillFocus() {
        app.toggleNavigationBar(false);
    },
    onWillHide() {
        app.toggleNavigationBar(true);
    },
    componentDidMount() {
        this.getSupervisionClientList();
    },
    getSupervisionClientList() {
        const param = {
            userId: app.personal.info.userId,
            authority: 2,
        };
        POST(app.route.ROUTE_GET_CLIENT_LIST, param, this.getClientListSuccess);
    },
    getClientListSuccess(data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.leaderList = data.context.clientList;
                _.forEach(this.leaderList, (item) => {
                    this.tempLeaderList.push(item.name);
                });
            }
        }
    },
    showSelectLeader() {
        Picker(this.tempLeaderList, [this.tempLeaderList[0]], '').then((value)=>{
            this.setState({leader: value[0]});
        });
    },
    doReview() {
        const {title, content, leader, taskList} = this.state;
        let examinerId = '';
        if (!title) {
            Toast('请输入任务主题');
            return;
        }
        if (!content) {
            Toast('请输入任务描述内容');
            return;
        }
        for (let item of this.leaderList) {
            if (item.name == leader) {
                examinerId = item.id;
                break;
            }
        }
        if (!examinerId) {
            Toast('请选择审核领导');
            return;
        }
        if (!taskList.length) {
            Toast('请添加子任务');
            return;
        }
        const param = {
            userId: app.personal.info.userId,
            examinerId,
            title,
            content,
            taskList,
        };
        POST(app.route.ROUTE_SECRETARY_CREATE_TASK, param, this.secretaryCreateTaskSuccess);
    },
    secretaryCreateTaskSuccess(data) {
        if (data.success) {
            let {title, content, leader, taskList, dataSource} = this.state;
            taskList.splice(0, taskList.length);
            this.setState({
                title: '',
                content: '',
                leader: '',
                taskList: taskList,
                dataSource: dataSource.cloneWithRows(taskList)
            });
            Toast('创建任务成功');
        }
    },
    addChildTask(task) {
        const { taskList, dataSource } = this.state;
        taskList.push(task);
        this.setState({ dataSource: dataSource.cloneWithRows(taskList), taskList});
    },
    doAddChildTask() {
        app.navigator.push({
            component: ChildTaskDetail,
            passProps:{ addChildTask:this.addChildTask },
        })
    },
    doUpdateList (index) {
        let { taskList, dataSource } = this.state;
        taskList.splice(index, 1);
        this.setState({ dataSource: dataSource.cloneWithRows(taskList), taskList});
    },
    modifyTask(index,task){
        let { taskList, dataSource } = this.state;
        var newList = _.slice(taskList,0,taskList.length);
        newList[index] = task;
        this.setState({ dataSource: dataSource.cloneWithRows(newList), taskList:newList});
    },
    doModifyTaskAction(index){
        let { taskList} = this.state;
        let task = taskList[index];
        app.navigator.push({
            component: modifyChildTaskDetail,
            passProps:{ modifyTask:this.modifyTask.bind(null,index),obj:task},
        })
    },
    renderRow(obj, i, n) {
        return (
            <TaskList
                obj={obj}
                doUpdateList={this.doUpdateList}
                doModifyTaskAction={this.doModifyTaskAction}
                n={n} />
        );
    },
    render () {
        const {startTime, endTime, dataSource, taskList, title, content} = this.state;
        return (
            <View style={this.props.style}>
                <ScrollView style={styles.pageContainer}>
                    <View style={styles.mainTakContainer}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={[styles.input, {height: 35}]}
                            numberOfLines = {1}
                            placeholder={'点击输入任务主题'}
                            textStyle={styles.inputText}
                            placeholderTextColor={'#A7A7A7'}
                            value={title}
                            onChangeText={(text) => this.setState({title: text})}
                            />
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={[styles.input, {height: 100}]}
                            multiline = {true}
                            placeholder={'点击输入任务描述'}
                            textStyle={styles.inputText}
                            placeholderTextColor={'#A7A7A7'}
                            value={content}
                            onChangeText={(text) => this.setState({content: text})}
                            />
                    </View>
                    <ListView
                        initialListSize={1}
                        enableEmptySections
                        removeClippedSubviews={false}
                        dataSource={dataSource}
                        keyboardShouldPersistTaps="always"
                        renderRow={this.renderRow}
                        />
                    <TouchableOpacity onPress={this.doAddChildTask} style={styles.addKidTaskContainer}>
                        <DImage
                            resizeMode='stretch'
                            source={app.img.home_add}
                            style={styles.addImage} />
                        <Text style={styles.addText}>{'添加子任务'}</Text>
                    </TouchableOpacity>
                    <View style={[styles.chooseContainer, {marginTop: sr.ws(20)}]}>
                        <Text style={styles.menuText}>选择送审领导:</Text>
                        <View style={styles.updownlside}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.showSelectLeader}
                                style={styles.timeTextContainer}
                                >
                                <Text style={styles.timeText}>
                                    {this.state.leader||'请选择'}
                                </Text>
                                <DImage resizeMode='cover' source={app.img.home_down_check} style={styles.downCheckImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button onPress={this.doReview} style={styles.btnSubmit} textStyle={styles.btnSubmitText}>{'送    审'}</Button>
                </ScrollView>
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
        marginBottom: 60,
    },
    tabContainer: {
        width:sr.w,
        height: 65,
        flexDirection: 'row',
        backgroundColor: '#ea372f',
    },
    touchTab: {
        flex: 1,
        marginTop: 20,
        justifyContent:'center',
        alignItems: 'center',
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
        marginTop: 20,
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
    inputText: {
        fontSize: 16,
        color: '#A7A7A7',
        lineHeight: 24,
        fontFamily: 'STHeitiSC-Medium',
    },
    contentView: {
        width: sr.w,
    },
    contentText: {
        width: sr.w-30,
        marginLeft: 15,
        marginTop: 5,
        fontSize: 16,
        color: '#A7A7A7',
        lineHeight: 24,
        fontFamily: 'STHeitiSC-Medium',
    },
    itemContainer: {
        width: sr.w,
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
        marginLeft: 15,
        fontSize: 16,
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
        marginTop: 10,
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
        marginLeft: 10,
    },
    chooseContainer: {
        width:sr.w,
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
        fontSize: 16,
        color: '#A7A7A7',
        marginLeft: 10,
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
    addKidTaskContainer: {
        width: sr.w,
        height: 45,
        marginTop:5,
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
