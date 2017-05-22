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

const { Button, TaskStepList, DImage, DelayTouchableOpacity } = COMPONENTS;
const describe = '水电费水电费的爽肤水地方第三方第三方第三方地方是的方式发送到发送地方阿斯顿发生的发低烧发放苏打发送到发送地方阿斯顿发生的发低烧发放苏打发送到发送地方阿斯顿发生的发低烧发放苏打粉撒的发多少发多少发放的 撒地方撒的方式地方士大夫撒打发的说法';

module.exports = React.createClass({
    getInitialState () {
        return {
            lineHeight: 0,
            isLookAll: false,
        };
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
    render () {
        const { title, description, taskList } = this.props.data;
        let {isLookAll} = this.state;
        const obj = this.props.data;
        return (
            <View style={styles.container}>
                <DImage
                    resizeMode='stretch'
                    source={app.img.home_task_bg}
                    style={styles.titleBgImage}>
                    <Text style={styles.titleText}>{'子任务'+this.props.n*1+1}</Text>
                    <View style={styles.btnView}>
                        <Button onPress={this.applyTask} style={[styles.btnSubmit, {backgroundColor: '#ea372f'}]} textStyle={[styles.btnSubmitText, {color: '#FFFFFF'}]}>{'通过'}</Button>
                        <Button onPress={this.applyTask} style={[styles.btnSubmit, {backgroundColor: '#e2e2e2'}]} textStyle={[styles.btnSubmitText, {color: '#838384'}]}>{'打回'}</Button>
                    </View>
                </DImage>
                <View style={styles.taskTitleContainer}>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>任务监督人：</Text>
                        <Text style={styles.taskContext}>{obj.supervisor||'张三'}</Text>
                    </View>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>任务执行人：</Text>
                        <Text style={styles.taskContext}>{obj.executor||'李四'}</Text>
                    </View>
                </View>
                <View style={styles.taskTitleContainer}>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>开始时间：</Text>
                        <Text style={styles.taskContext}>{obj.endTime||'2017-05-10 13:30'}</Text>
                    </View>
                    <View style={styles.taskTitleView}>
                        <Text style={styles.taskTitle}>结束时间：</Text>
                        <Text style={styles.taskContext}>{obj.endTime||'2017-05-12 13:30'}</Text>
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
                        <DImage
                            resizeMode='stretch'
                            source={app.img.home_horn}
                            style={[styles.clockImage, {marginRight: 25}]} />
                    </View>
                    <View style={[styles.synopsisStyle, { height: this.state.lineHeight }]}>
                        <Text onLayout={this._measureLineHeight} numberOfLines={isLookAll ? 100 : 3} style={styles.synopsisText}>
                            {(app.isandroid ? '        ' : '\t') + describe}
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
                        <Button onPress={this.goRemindSetting} style={styles.btnSet} textStyle={styles.btnSetText}>{'点击设置'}</Button>
                    </View>
                    <View style={styles.divisionLine}/>
                    <View style={styles.remindItem}>
                        <DImage
                            resizeMode='stretch'
                            source={app.img.home_remind_check}
                            style={styles.checkImage} />
                        <Text style={styles.remindItemTitle}>{'每天08:30提醒一次'}</Text>
                    </View>
                    <View style={styles.divisionLine}/>
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
                <View style={[styles.divisionLine, {marginBottom: 15}]}/>
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
    taskTitleContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    taskTitleView: {
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
    btnSet: {
        height: 25,
        width: 70,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 6,
        backgroundColor: '#f3433d',
    },
    btnSetText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    remindItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
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
