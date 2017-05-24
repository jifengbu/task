'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    Text,
    StyleSheet,
    TextInput,
    View,
    Switch,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
} = ReactNative;

const dismissKeyboard = require('dismissKeyboard');
const moment = require('moment');
const EditInformationBox = require('./EditInformationBox.js');
const EditPassWord = require('./EditPassWord.js');
const PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');
const Subscribable = require('Subscribable');
const Camera = require('@remobile/react-native-camera');
const LocalDataMgr = require('../../manager/LocalDataMgr.js');
const FingerView = app.isandroid?require('./FingerViewAndroid.js'):require('./FingerViewIos.js');

const { DImage, ActionSheet, Picker } = COMPONENTS;

const DEFAULT_OPACITY = 0.5;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin, SceneMixin],
    statics: {
        title: '个人信息',
        leftButton: { image: app.img.common_back2, handler: () => { app.scene.goBack(); } },
        rightButton: { title: '编辑', delayTime:1, handler: () => { app.scene.toggleEdit(); } },
    },
    componentWillMount () {
        // this.addListenerOn(PersonalInfoMgr, 'USER_HEAD_CHANGE_EVENT', (param) => {
        //     this.setState({ headImgSource: { uri: param.head } });
        // });
    },
    onWillFocus(){
        this.haveFinger = LocalDataMgr.getValueFromKey('haveFinger');
        this.setState({switchValue: (this.haveFinger && this.haveFinger==1)?true:false});
    },
    getInitialState () {
        this.haveFinger = LocalDataMgr.getValueFromKey('haveFinger');

        return Object.assign({
            showSuccessToast: false,
            overlayShow: false,
            isEditStatus: false,
            switchValue: (this.haveFinger && this.haveFinger==1)?true:false,
        }, this.getStateFromPersonalInfo());
    },
    goBack () {
        app.navigator.pop();
    },
    toggleEdit () {
        this.haveFinger = LocalDataMgr.getValueFromKey('haveFinger');
        this.setState({switchValue: (this.haveFinger && this.haveFinger==1)?true:false});

        Picker.hide();
        dismissKeyboard();
        if (this.state.isEditStatus) {
            const { headImg, name, position } = app.personal.info;
            if (name != this.state.name ||position != this.state.position) {
                this.updatePersnalInfo();
            } else {
                this.setState({ isEditStatus: false });
                app.getCurrentRoute().leftButton = { image: app.img.common_back2, handler: () => { app.scene.goBack(); } };
                app.getCurrentRoute().rightButton = { title: '编辑', delayTime:1, handler: () => { app.scene.toggleEdit(); } };
                app.forceUpdateNavbar();
            }
        } else {
            this.setState({ isEditStatus: true });
            app.getCurrentRoute().leftButton = { title: '取消', delayTime:1, handler: () => { app.scene.showBox&&app.scene.showBox(); } };
            app.getCurrentRoute().rightButton = { title: '完成', delayTime:1, handler: () => { app.scene.toggleEdit(); } };
            app.forceUpdateNavbar();
        }
    },
    showBox () {
        dismissKeyboard();
        const { headImg, name, position } = app.personal.info;
        if (name != this.state.name ||position != this.state.position) {
            this.showConfirmBox();
        } else {
            app.navigator.pop();
        }
    },
    showConfirmBox () {
        app.showModal(
            <EditInformationBox
                doConfirm={this.doConfirm}
                title={'是否放弃对资料的修改'}
                />
        );
    },
    getStateFromPersonalInfo () {
        const info = app.personal.info;
        const position = info.position;
        const name = info.name;
        let headImgSource = app.img.personal_add_header;
        if (info.head) {
            headImgSource = { uri: info.head };
        }
        return {
            name: name,
            position: position,
            actionSheetVisible: false,
            headImgSource: headImgSource,
        };
    },
    onWillHide() {
        Picker.hide();
    },
    setPersonalInfo () {
        const info = app.personal.info;
        info.position = this.state.position;
        info.name = this.state.name;
        info.headImg = this.state.headImgSource.uri || '';
        app.personal.set(info);
    },
    getPosition (trade) {
        this.setState({ trade });
    },
    onTextInputFocus () {
        Picker.hide();
    },
    doConfirm () {
        app.navigator.pop();
    },
    formatDateLoad (date) {
        let dateStr = '';
        let dateArr = [];
        let newStr = '';
        if (date) {
            dateStr = date.join('');
            const str = dateStr.substring(0, dateStr.length - 1);
            dateArr = str.split(/[年月]/);
            newStr = dateArr.join('-');
        }
        return newStr;
    },
    updatePersnalInfo () {
        if (this.state.name == '') {
            Toast('名称不能为空');
            return;
        }
        const param = {
            userId: app.personal.info.userId,
            detail: detailsMap,
        };
        POST(app.route.ROUTE_UPDATE_PERSONAL_INFO, param, this.updatePersnalInfoSuccess, this.updatePersnalInfoError, true);
    },
    updatePersnalInfoSuccess (data) {
        if (data.success) {
            this.setPersonalInfo();
            this.setState({ isEditStatus: false, showSuccessToast: true });
            app.getCurrentRoute().leftButton = { handler: () => { app.scene.goBack(); } };
            app.getCurrentRoute().rightButton = { title: '编辑', handler: () => { app.scene.toggleEdit(); } };
            app.forceUpdateNavbar();
            setTimeout(() => {
                this.setState({ showSuccessToast: false });
            }, 2000);
        } else {
            Toast(data.msg);
        }
    },
    updatePersnalInfoError (error) {
    },
    onFocus () {
        Picker.hide();
    },
    doCloseActionSheet () {
        this.setState({ actionSheetVisible:false });
    },
    doShowActionSheet () {
        this.setState({ actionSheetVisible:true });
    },
    selectPicture () {
        this.doCloseActionSheet();
        const options = {
            quality: 30,
            targetWidth: 240,
            targetHeight: 240,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        Camera.getPicture((filePath) => {
            this.uploadUserHead(filePath);
        }, () => {
            Toast('操作失败');
        }, options);
    },
    takePicture () {
        this.doCloseActionSheet();
        const options = {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        };
        Camera.getPicture((filePath) => {
            this.uploadUserHead(filePath);
        }, () => {
            Toast('操作失败');
        }, options);
    },
    uploadUserHead (filePath) {
        // this.setState({ headImgSource: { uri: filePath } });
        const options = {};
        options.fileKey = 'file';
        options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
        options.mimeType = 'image/jpeg';
        options.params = {
            userId:app.personal.info.userId,
        };
        this.uploadOn = true;
        UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress),
        this.uploadSuccessCallback, this.uploadErrorCallback, true);
    },
    uploadSuccessCallback (data) {
        if (data.success) {
            const context = data.context;
            app.personal.setUserHead(context.url);
        } else {
            Toast('上传失败');
            // this.setState({ headImgSource: { uri: app.personal.info.headImg } });
        }
        this.uploadOn = false;
    },
    uploadErrorCallback () {
        this.uploadOn = false;
        // this.setState({ headImgSource: { uri: app.personal.info.headImg } });
    },
    editPassWord() {
        app.navigator.push({
            component: EditPassWord,
        });
    },
    editFingerPrint() {
    },
    onSwitchChange(value){
        this.setState({switchValue:value});
        // 设置指纹
        if (value) {
            app.navigator.push({
                component: FingerView,
            });
        }else {
            // 关闭指纹，不用跳转
            LocalDataMgr.setValueAndKey('haveFinger', 0);
        }
    },
    render () {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerStyle}>
                    <TouchableOpacity
                        onPress={this.state.isEditStatus ? this.doShowActionSheet : null}
                        activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                        style={styles.headStyle} >
                        <Text style={styles.headText}>{'头像'}</Text>
                        <View style={styles.itemView}>
                            <DImage
                                resizeMode='cover'
                                defaultSource={app.img.personal_head}
                                source={this.state.headImgSource}
                                style={styles.headIcon} />
                            {
                                this.state.isEditStatus &&
                                <Image
                                    resizeMode='contain'
                                    source={app.img.common_go}
                                    style={styles.goIcon} />
                            }
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.lowSeprator} />
                    <View style={styles.itemBgStyle} >
                        <Text style={styles.headText}>姓名</Text>
                        { !this.state.isEditStatus ?
                            <Text style={styles.contentText}>{this.state.name ? this.state.name : '请输入您的名称'}</Text>
                            :
                            <TextInput
                                onChangeText={(text) => this.setState({ name: text })}
                                onFocus={this.onTextInputFocus}
                                underlineColorAndroid={'transparent'}
                                defaultValue={this.state.name}
                                placeholder={'请输入您的姓名'}
                                placeholderTextColor={'#BABABA'}
                                style={styles.text_input} />
                        }
                    </View>
                    <Text style={styles.lowSeprator} />
                    <View style={styles.itemBgStyle} >
                        <Text style={styles.headText}>职位</Text>
                        { !this.state.isEditStatus ?
                            <Text style={styles.contentText}>{this.state.name ? this.state.name : '请输入您的职位'}</Text>
                            :
                            <TextInput
                                onChangeText={(text) => this.setState({ name: text })}
                                onFocus={this.onTextInputFocus}
                                underlineColorAndroid={'transparent'}
                                defaultValue={this.state.name}
                                placeholder={'请输入您的职位'}
                                placeholderTextColor={'#BABABA'}
                                style={styles.text_input} />
                        }
                    </View>
                    <Text style={styles.lowSeprator} />
                    <TouchableOpacity
                        activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                        onPress={this.state.isEditStatus ? this.editPosition : null}>
                        <View style={styles.itemBgStyle}>
                            <Text style={styles.headText}>职位</Text>
                            <View style={styles.itemView}>
                                <Text style={styles.contentText}>
                                    {this.state.trade ? this.state.trade : '请选择您的职位'}
                                </Text>
                                {
                                    this.state.isEditStatus &&
                                    <Image
                                        resizeMode='contain'
                                        source={app.img.common_go}
                                        style={styles.goIcon} />
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.lowSeprator} />
                    <View style={styles.itemBgStyle}>
                        <Text style={styles.headText}>指纹登陆</Text>
                        <View style={styles.itemView}>
                            <Text style={styles.contentSwitch}>
                            </Text>
                            <Switch
                                onValueChange={this.onSwitchChange}
                                onTintColor={'#f03b0a'}
                                value={this.state.switchValue}
                                style={styles.goSwitch} />
                        </View>
                    </View>
                    <Text style={styles.lowSeprator} />
                </View>
                <ActionSheet
                    visible={this.state.actionSheetVisible}
                    cancelText='取  消'
                    onCancel={this.doCloseActionSheet} >
                    <ActionSheet.Button onPress={this.takePicture}>拍    照</ActionSheet.Button>
                    <ActionSheet.Button onPress={this.selectPicture}>从相册选择照片</ActionSheet.Button>
                </ActionSheet>
                {
                    this.state.showSuccessToast &&
                    <View style={styles.successToastContainer}>
                        <Text style={styles.successToastText}>修改成功</Text>
                    </View>
                }
            </View>
        );
    },
});

const styles = StyleSheet.create({
    containerStyle: {
        height: sr.h - 55,
        width: sr.w,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    lowSeprator: {
        width: sr.w-20,
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#ececec',
    },
    headStyle: {
        width: sr.w,
        height: 48,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    headText: {
        width: 74,
        fontSize: 16,
        marginLeft: 33,
        color: '#747474',
        alignSelf : 'center',
    },
    contentText: {
        fontSize: 16,
        marginLeft: 20,
        width: 217,
        color: '#BABABA',
        alignSelf : 'center',
    },
    contentSwitch: {
        fontSize: 16,
        marginLeft: 20,
        width: 180,
        color: '#BABABA',
        alignSelf : 'center',
    },
    headIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 20,
        alignSelf : 'center',
    },
    text_input: {
        height: 40,
        width: 233,
        fontSize: 16,
        marginLeft: 20,
        paddingLeft: 0,
        color: '#BABABA',
        alignSelf: 'center',
    },
    itemBgStyle: {
        width: sr.w,
        height: 48,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    itemView: {
        height: 40,
        width: 253,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goIcon: {
        width: 16,
        height: 16,
        backgroundColor: 'white',
    },
    goSwitch: {
        backgroundColor: 'white',
    },
    successToastContainer: {
        position: 'absolute',
        bottom: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: sr.w,
    },
    successToastText: {
        backgroundColor: '#616161',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
