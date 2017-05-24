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

module.exports = React.createClass({
    getInitialState () {
        return {
            opacity: new Animated.Value(0),
        };
    },
    doClose () {
        this.closeModal(() => {
            this.props.doClose();
        });
    },
    doConfirm () {
        this.closeModal(() => {
            this.props.doConfirm();
        });
    },
    componentDidMount () {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start();
    },
    closeModal (callback) {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }).start(() => {
            callback();
        });
    },
    render () {
        return (
            <Animated.View style={styles.overlayContainer}>
                <View style={styles.notificationContainer}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            {'中央经济会议'}
                        </Text>
                        <TouchableOpacity onPress={this.doClose} style={styles.touchCloseView}>
                            <Image
                                resizeMode='contain'
                                source={app.img.home_close_icon}
                                style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.doConfirm}>
                        <Text numberOfLines={3} style={styles.describeText}>
                            {(Platform.OS === 'android' ? '        ' : '\t') + '中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议中央经济会议'}
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
        marginTop: 10,
        marginLeft: 5,
        opacity: 0.9,
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    titleView: {
        width: sr.w-10,
        height: 25,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    titleText: {
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
