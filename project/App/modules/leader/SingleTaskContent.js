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
    TouchableHighlight,
    TouchableOpacity,
} = ReactNative;

const Audio = require('@remobile/react-native-audio');
const InputBoxReject = require('./InputBoxReject.js');
const ShowBigImage = require('./ShowBigImage.js');
const remindData = require('../../data/remindData.js');

const { Button, TaskStepList, DImage, DelayTouchableOpacity } = COMPONENTS;

module.exports = React.createClass({
    getInitialState () {
        this.isPlaying = _.fill(Array(this.props.data.audioList.length), false);
        return {
            lineHeight: 0,
            isLookAll: false,
            taskType: '',
            isPlaying: this.isPlaying,
        };
    },
    componentDidMount () {
        this.getTaskTypeList();
    },
    getTaskTypeList() {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_TASK_TYPE_LIST, param, this.getTaskTypeListSuccess);
    },
    getTaskTypeListSuccess(data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.typeList = data.context.taskTypeList;
                const typeInfo = _.find(this.typeList, (item) => item.key == this.props.data.type);
                if (typeInfo) {
                    this.setState({taskType: typeInfo.name});
                }
            }
        }
    },
    doLookAll () {
        this.setState({ isLookAll: !this.state.isLookAll });
    },
    _measureLineHeight (e) {
        if (!this.state.lineheight) {
            const { height } = e.nativeEvent.layout;
            this.setState({ lineHeight: height + 26 });
        }
    },
    showBigImage (imageArray, index) {
        app.showModal(
            <ShowBigImage
                doImageClose={app.closeModal}
                defaultIndex={index}
                defaultImageArray={imageArray} />
        );
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
    render () {
        let {isLookAll, taskType} = this.state;
        const obj = this.props.data;
        return (
            <View style={styles.container}>
                <View style={styles.taskTitleContainer}>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>任务监督人：</Text>
                        <Text style={styles.taskContext}>{obj.supervisor.name}</Text>
                    </View>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>任务执行人：</Text>
                        <Text style={styles.taskContext}>{obj.executor.name}</Text>
                    </View>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskType}>{taskType}</Text>
                        <DImage resizeMode='stretch' source={app.img.home_triangle_icon} style={styles.typeImage}/>
                    </View>
                </View>
                <View style={styles.taskTitleContainer}>
                    <View style={styles.taskTimeView}>
                        <Text style={styles.taskTitle}>开始时间：</Text>
                        <Text style={styles.taskContext}>{obj.expectStartTime}</Text>
                    </View>
                    <View style={styles.taskTimeView}>
                        <Text style={styles.taskTitle}>结束时间：</Text>
                        <Text style={styles.taskContext}>{obj.expectFinishTime}</Text>
                    </View>
                </View>
                <View style={styles.divisionLine}/>
                <View style={styles.taskDescribeContainer}>
                    <View style={styles.remindTitleView}>
                        <View style={styles.remindTitleLeftView}>
                            <DImage
                                resizeMode='stretch'
                                source={app.img.home_describe}
                                style={styles.clockImage} />
                            <Text style={styles.remindTitle}>{'任务描述'}</Text>
                        </View>
                    </View>
                    <View style={[styles.synopsisStyle, { height: this.state.lineHeight }]}>
                        <Text onLayout={this._measureLineHeight} numberOfLines={isLookAll ? 100 : 3} style={styles.synopsisText}>
                            {(app.isandroid ? '        ' : '\t') + obj.content}
                        </Text>
                        {
                            !isLookAll &&
                            <Image resizeMode='stretch' source={app.img.home_mask} style={[styles.maskImage, { height: (this.state.lineHeight) / 2 +10 }]} />
                        }
                        <TouchableOpacity onPress={this.doLookAll} style={styles.lookAllStyle}>
                            <Text style={styles.lookAllText}>{isLookAll ? '收起内容' : '查看全部'}</Text>
                            <Image resizeMode='contain' source={isLookAll ? app.img.home_up_icon : app.img.home_down_icon} style={styles.iconStyle} />
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
                    <View style={styles.divisionLine}/>
                </View>
                {
                    !!obj.imageList.length&&
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
                        <View style={styles.divisionLine}/>
                    </View>
                }
                {
                    !!obj.audioList.length&&
                    <View style={styles.voiceUpside}>
                        <View style={styles.remindTitleLeftView}>
                            <DImage
                                resizeMode='stretch'
                                source={app.img.home_horn}
                                style={styles.clockImage} />
                            <Text style={styles.remindTitle}>{'语音'}</Text>
                        </View>
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
                        <View style={[styles.divisionLine, {marginBottom: 15}]}/>
                    </View>
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
    btnView: {
        flexDirection: 'row',
    },
    btnSubmit: {
        height: 25,
        width: 55,
        borderRadius: 6,
        marginRight: 10,
    },
    btnSubmitText: {
        fontSize: 13,
        fontWeight: '600',
    },
    childTaskTitle: {
        marginTop: 10,
        marginHorizontal: 10,
        fontSize: 16,
        color: '#e06f69',
        fontFamily: 'STHeitiSC-Medium',
    },
    taskTitleContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    taskTitleView: {
        width: sr.w/3,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    taskType: {
        fontSize: 15,
        color: '#ea372f',
        fontFamily: 'STHeitiSC-Medium',
    },
    typeImage: {
        width: 16,
        height: 8,
    },
    taskTimeView: {
        width: sr.w/2-30,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    divisionLine: {
        width: sr.w-20,
        height: 1,
        marginLeft: 10,
        marginTop: 5,
        backgroundColor: '#D7D7D7',
    },
    taskDescribeContainer: {
        marginTop: 5,
    },
    synopsisStyle: {
        width: sr.w,
        marginTop: 15,
        marginBottom: 8,
    },
    synopsisText: {
        width: sr.w - 40,
        marginLeft: 20,
        fontSize: 14,
        color: '#848484',
    },
    maskImage: {
        width: sr.w-30,
        bottom: 0,
        left: 15,
        position: 'absolute',
    },
    lookAllStyle: {
        width: 100,
        height: 30,
        bottom: 0,
        left: sr.w / 2 - 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    lookAllText: {
        fontSize: 13,
        color: '#eb362f',
        fontFamily: 'STHeitiSC-Medium',
    },
    iconStyle: {
        width: 11,
        height: 11,
        marginLeft: 6,
    },
    remindContainer: {
        width: sr.w,
    },
    remindTitleView: {
        width: sr.w,
        height: 30,
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
    voiceUpside: {
        width: sr.w,
        marginTop: 5,
        backgroundColor:'#FFFFFF',
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
    imageVoice:{
        width:17,
        height:22,
        marginRight: 10,
    },
    textTime:{
        fontSize: 12,
        textAlign: 'left',
        color :'gray',
    },
    imageUpLoadContainer: {
        width: sr.w,
    },
    imageStyleView: {
        height: 134,
        alignItems: 'center',
        flexDirection:'row',
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



    taskItem: {
        marginTop: 10,
        backgroundColor: '#EEEEE0',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    taskTitle1: {
        fontSize: 18,
        color: '#A0522D',
        textAlign: 'center',
    },
    taskTitle: {
        fontSize: 12,
        color: '#BDBDBD',
    },
    taskContext: {
        fontSize: 12,
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
        backgroundColor: '#A52A2A',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
