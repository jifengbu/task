'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    Animated,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    TouchableHighlight,
} = ReactNative;

const { Button } = COMPONENTS;
const dismissKeyboard = require('dismissKeyboard');

module.exports = React.createClass({
    getInitialState () {
        return {
            inputText: '',
        };
    },
    fomatString (oldStr) {
        let newStr = '';
        let context = '';
        if (oldStr) {
            newStr = oldStr.replace(/(^\s*)|(\s*$)/g, ''); // 删除首尾空格
            context = newStr.replace(/(^[\r\n])+/g, '');// 删除空行
        }
        return context;
    },
    doConfirm () {
        const context = this.fomatString(this.state.inputText);
        if (context === '') {
            Toast('内容为空');
            return;
        }
        this.props.doConfirm(contitle, context);
        app.closeModal();
    },
    doDelete () {
        this.props.doDelete();
        app.closeModal();
    },
    setAlert () {
        this.props.setAlert();
    },
    doHideDismissKeyboard () {
        dismissKeyboard();
    },
    componentDidMount () {
        this.setState({ inputText:this.props.inputText });
    },
    calculateStrLength (oldStr) {
        let height = 0;
        let linesHeight = 0;
        if (oldStr) {
            oldStr = oldStr.replace(/<\/?.+?>/g, /<\/?.+?>/g, '');
            oldStr = oldStr.replace(/[\r\n]/g, '|');
            const StrArr = oldStr.split('|');
            for (let i = 0; i < StrArr.length; i++) {
                // 计算字符串长度，一个汉字占2个字节
                const newStr = StrArr[i].replace(/[^\x00-\xff]/g, 'aa').length;
                // 计算行数
                if (newStr == 0) {
                    linesHeight = 1;
                } else {
                    linesHeight = Math.ceil(newStr / 30);
                }
                // 计算高度，每行18
                height += linesHeight * sr.s(22);
            }
            return height + 1 * sr.s(30);
        } else {
            return 0;
        }
    },
    render () {
        let textHeight = 50;
        //textHeight = 96;
        return (
            <Modal transparent>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.doHideDismissKeyboard}
                    style={styles.overlayContainer}>
                    <View style={[styles.background, { height:sr.s(332)}]}>
                        <View style={[styles.container, { height:sr.s(312)}]}>
                            <View>
                                <TouchableOpacity onPress={this.setAlert} style={[styles.topViewNoSide, { height: textHeight }]}>
                                    <Image
                                        resizeMode='contain'
                                        source={app.img.leader_inputBox_alert}
                                        style={styles.alertIcon} />
                                    <Text style={styles.alertButtonStyle} >点击提醒设置</Text>
                                </TouchableOpacity>
                                <View style={styles.lineView} />
                            </View>
                            <View style={[styles.textStyleViewNoSide, { height: sr.s(250 - textHeight) }]}>
                                <TextInput
                                    ref={(ref) => { this.contentInput = ref; }}
                                    style={styles.textStyle}
                                    onChangeText={(text) => {
                                        this.setState({ inputText: text });
                                        }
                                    }
                                    multiline
                                    placeholder={'请输入提醒内容'}
                                    autoCapitalize={'none'}
                                    underlineColorAndroid={'transparent'}
                                    defaultValue={this.props.inputText}
                                    keyboardType={'default'}
                              />
                            </View>
                            <View style={styles.buttonViewStyle}>
                                <TouchableOpacity
                                    onPress={this.doConfirm}
                                    style={[styles.buttonStyleContain,{ borderBottomRightRadius: 2 }]}>
                                    <Text style={styles.buttonStyle} >保  存</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.doDelete}
                                    style={styles.buttonStyleContainCancel}>
                                    <Text style={styles.buttonStyle} >删  除</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableHighlight
                            onPress={app.closeModal}
                            underlayColor='rgba(0, 0, 0, 0)'
                            style={styles.touchableHighlight}>
                            <Image
                                resizeMode='contain'
                                source={app.img.leader_inpubBox_close}
                                style={styles.closeIcon} />
                        </TouchableHighlight>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    },
});
// autoFocus={true}
const styles = StyleSheet.create({
    buttonViewStyle: {
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: 345,
        height: 46,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyleContain: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#FF6363',
        height: 46,
        borderColor:'#FF6363',
        borderWidth:1,
        borderBottomLeftRadius: 2,
    },
    buttonStyleContainCancel: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#C6C6C6',
        height: 46,
        borderColor:'#C6C6C6',
        borderWidth:1,
        borderBottomRightRadius: 2,
    },
    textStyle: {
        fontSize: 16,
        width: sr.w - 60,
        flex: 1,
        fontFamily: 'STHeitiSC-Medium',
        color: '#2A2A2A',
        textAlignVertical: 'top',
    },
    textStyleViewNoSide:{
        margin: 10,
        width: sr.w - 50,
    },
    buttonStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
    },
    alertButtonStyle: {
        fontSize: 14,
        color: '#f64136',
    },
    background: {
        width: sr.w,
        marginTop: 120,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    container: {
        width: sr.w - 30,
        marginTop: 20,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
    },
    topViewNoSide: {
        width: sr.w - 45,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    indexStyle: {
        fontSize: 18,
        marginLeft: 15,
        flex: 1,
        marginTop: 10,
        fontFamily: 'STHeitiSC-Medium',
        color: '#2A2A2A',
    },
    topStyle: {
        marginTop: 10,
        fontSize: 18,
        width: sr.w - 180,
        flex: 1,
        paddingVertical: 2,
        marginLeft: 15,
        fontFamily: 'STHeitiSC-Medium',
        color: '#2A2A2A',
    },
    lineView: {
        position:'absolute',
        bottom: 0,
        left: 6,
        height: 1,
        width: 334,
        backgroundColor: '#DFDFDF',
    },
    overlayContainer: {
        position:'absolute',
        top: 0,
        alignItems:'center',
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    touchableHighlight: {
        position:'absolute',
        top: 8,
        right: 4,
        width: 30,
        height: 30,
    },
    closeIcon: {
        width: 30,
        height: 30,
    },
    alertIcon: {
        width: 20,
        height: 20,
    },
});
