'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    Animated,
    Platform,
    TouchableOpacity,
} = ReactNative;
const noticEnum = {
            0: '自定义提醒通知',
            1: '综合部创建一条群组任务',
　　　　　　　2: '发布一条新任务',
　　　　　　　3: '领导拒绝申请发布该任务',
　　　　　　　4: '申请完成该任务',
　　　　　　　5: '领导同意完成该任务',
　　　　　　　6: '领导拒绝完成该任务',
　　　　　　　7: '定时任务通知'
}

module.exports = React.createClass({
    getDefaultProps () {
        return {
            isDismissible: false,
            id: '',
            title: '任务跟踪',
            content: '欢迎试用任务跟踪app',
        };
    },
    getInitialState () {
        return {
            opacity: new Animated.Value(0),
        };
    },
    // componentWillMount () {
        // this._panResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: (e, gestureState) => true,
        //     onPanResponderGrant: (e, gestureState) => {
        //         this.closeNotification();
        //     },
        // });
    // },
    componentDidMount () {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start();
    },
    closeNotification () {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }
        ).start(() => {
            app.removeNotifications();
        });
    },
    seeMoreNotification () {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }
        ).start(() => {
            //push到特定的页面
            const {taskDetail, component, type} = this.props;
            if (type != 0) {
                app.navigator.push({
                    component: component,
                    passProps: {data: taskDetail}
                });
            }
            app.removeNotifications();
        });
    },
    render () {
        const {title, content, type} = this.props.taskDetail || {};
        return (
            <Animated.View style={styles.overlayContainer}>
                <View style={styles.notificationContainer}>
                    <TouchableOpacity onPress={this.seeMoreNotification}>
                        <View style={styles.topView}>
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>
                                    {noticEnum[this.props.type]}
                                </Text>
                                <TouchableOpacity onPress={this.closeNotification} style={styles.touchCloseView}>
                                    <Image
                                        resizeMode='contain'
                                        source={app.img.home_close_icon}
                                        style={styles.iconStyle} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.titleText}>
                                {title}
                            </Text>
                        </View>
                        <Text numberOfLines={3} style={styles.describeText}>
                            {(Platform.OS === 'android' ? '        ' : '\t') + content}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View >
        );
    },
});

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        width: sr.w,
        height: 120,
        left: 0,
        top: 0,
    },
    notificationContainer: {
        width: sr.w-10,
        marginTop: 20,
        marginLeft: 5,
        opacity: 0.9,
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    topView: {
        width: sr.w-10,
        backgroundColor: '#FFFFFF',
    },
    titleView: {
        width: sr.w-10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    titleText: {
        width: sr.w-60,
        fontSize: 13,
        color: '#54110c',
        fontFamily:'STHeitiSC-Medium',
        marginLeft: 10,
    },
    touchCloseView: {
        width: 40,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 10,
        height: 10,
    },
    describeText: {
        marginHorizontal: 10,
        marginTop: 8,
        marginBottom: 15,
        fontSize: 11,
        lineHeight: 16,
        color: '#666666',
        fontFamily:'STHeitiSC-Medium',
    },
});
