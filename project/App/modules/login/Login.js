'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    View,
    TextInput,
    ListView,
    Text,
    TouchableOpacity,
} = ReactNative;

const ForgetPassword = require('./ForgetPassword.js');
const Register = require('./Register.js');
const Home = require('../home/index.js');

const { Button } = COMPONENTS;

const WeixinQQPanel = React.createClass({
    render () {
        return (
            <View style={styles.thirdpartyContainer}>
                <View style={styles.sepratorContainer}>
                    <View style={styles.sepratorLine} />
                    <Text style={styles.sepratorText} >{app.isandroid ? '    ' : ''}或者您也可以</Text>
                </View>
                <View style={styles.thirdpartyButtonContainer}>
                    {
                        !!this.props.weixininstalled &&
                        <View style={styles.thirdpartyLeftButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_weixin_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>微信登录</Text>
                        </View>
                    }
                    {
                        !!this.props.qqinstalled &&
                        <View style={styles.thirdpartyRightButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_qq_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>QQ登录</Text>
                        </View>
                    }
                </View>
            </View>
        );
    },
});

const NoWeixinQQPanel = React.createClass({
    render () {
        return (
            <View style={styles.thirdpartyContainer2}>
                <Text style={[styles.thirdpartyContainer2_text, { color: app.THEME_COLOR }]} />
            </View>
        );
    },
});

module.exports = React.createClass({
    mixins: [SceneMixin],
    statics: {
        title: '',
    },
    componentDidMount () {
        app.personal.setNeedLogin(true);
        app.toggleNavigationBar(false);
    },
    doLogin () {
        const { phone, password } = this.state;
        if (!app.utils.checkPhone(phone)) {
            Toast('手机号码不是有效的手机号码');
            return;
        }
        if (!app.utils.checkPassword(password)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        const param = {
            phone,
            password,
        };
        app.showProgressHud();
        POST(app.route.ROUTE_LOGIN, param, this.doLoginSuccess, this.doLoginError);
    },
    doLoginSuccess (data) {
        if (data.success) {
            app.personal.info.shopId = data.context.shopId;
            app.login.savePhone(this.state.phone);
            this.getPersonalInfo();
        } else {
            Toast(data.msg);
            app.dismissProgressHud();
        }
    },
    doLoginError (error) {
        app.dismissProgressHud();
    },
    doAnonymousLogin () {
        const { phone, password } = this.state;
        // if (!app.utils.checkPhone(phone)) {
        //     Toast('手机号码不是有效的手机号码');
        //     return;
        // }
        // if (!app.utils.checkPassword(password)) {
        //     Toast('密码必须有6-20位的数字，字母，下划线组成');
        //     return;
        // }
        app.socket.register(phone);
        app.login.savePhone(phone);
        app.utils.until(
            () => app.socket.connected,
            (cb) => setTimeout(cb, 100),
            () => {
                app.personal.set({ phone });
                app.navigator.replace({
                    component: Home,
                });
                app.personal.setNeedLogin(false);
            }
        );
    },
    doShowForgetPassword () {
        app.navigator.push({
            component: ForgetPassword,
            passProps: {
                phone: this.state.phone,
            },
        });
    },
    doShowRegister () {
        app.navigator.push({
            component: Register,
            passProps: {
                phone: this.state.phone,
                changeToLoginPanel: this.changeToLoginPanel,
            },
        });
    },
    getPersonalInfo () {
        const param = {
            shopId: app.personal.info.shopId,
        };
        POST(app.route.ROUTE_GET_PERSONAL_INFO, param, this.getPersonalInfoSuccess, this.getPersonalInfoError);
    },
    getPersonalInfoSuccess (data) {
        if (data.success) {
            const context = data.context;
            app.personal.set(context);
            app.navigator.replace({
                component: Home,
            });
            app.personal.setNeedLogin(false);
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    getPersonalInfoError (error) {
        app.dismissProgressHud();
    },
    getInitialState () {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            phone: app.login.list[0] || '',
            password: '',
            dataSource: ds.cloneWithRows(app.login.list),
            showList: false,
            weixininstalled: false,
            qqinstalled: false,
        };
    },
    changeToLoginPanel (phone) {
        this.setState({ phone });
    },
    onPhoneTextInputLayout (e) {
        const frame = e.nativeEvent.layout;
        this.listTop = frame.y + frame.height;
    },
    renderRow (text) {
        return (
            <TouchableOpacity onPress={() => this.setState({ phone: text, showList:false })}>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID + rowID} />
        );
    },
    onFocus () {
        this.setState({ showList: this.state.dataSource.getRowCount() > 0 && this.state.dataSource.getRowData(0, 0).length < 11 });
    },
    onBlur () {
        this.setState({ showList: false });
    },
    onPhoneTextChange (text) {
        const dataSource = this.state.dataSource;
        const newData = _.filter(app.login.list, (item) => { const reg = new RegExp('^' + text + '.*'); return reg.test(item); });
        this.setState({
            phone: text,
            dataSource: dataSource.cloneWithRows(newData),
            showList: newData.length > 0 && text.length < 11,
        });
    },
    render () {
        const row = this.state.dataSource.getRowCount();
        const listHeight = row > 4 ? styles.listHeightMax : row < 2 ? styles.listHeightMin : null;
        return (
            <Image
                resizeMode='stretch'
                source={app.img.login_background}
                style={styles.container}>
                <View style={{height: sr.s(360)}} />
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_user}
                        style={styles.input_icon}
                        />
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#FFFFFF'
                        placeholder='请输入您的用户名'
                        maxLength={11}
                        onChangeText={this.onPhoneTextChange}
                        defaultValue={this.state.phone}
                        style={styles.text_input}
                        keyboardType='phone-pad'
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        />
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_line}
                        style={styles.line}
                        />
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_locked}
                        style={styles.input_icon}
                        />
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#FFFFFF'
                        placeholder='请输入您的密码'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        defaultValue={this.state.password}
                        style={styles.text_input}
                        />
                <Button onPress={this.doAnonymousLogin} style={styles.btnLogin} textStyle={styles.btnLoginText}>登   录</Button>
                <NoWeixinQQPanel />
                {
                    this.state.showList &&
                    <ListView
                        initialListSize={1}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        keyboardShouldPersistTaps="always"
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                        style={[styles.list, { top: this.listTop }, listHeight]}
                        />
                }
            </Image>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        width: sr.fw,
        height: sr.fh,
    },
    logoContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    logo: {
        width: 110,
        height: 110,
    },
    inputContainer: {
        width: 280,
        height: 60,
        marginTop: 20,
        overflow: 'hidden',
    },
    line: {
        width: sr.w,
        height: 2,
        marginBottom: 10,
    },
    input_icon: {
        width: 28,
        height: 28,
        marginLeft: 30,
    },
    text_input: {
        height:40,
        width: 200,
        marginLeft: 30,
        fontSize:14,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    btnForgetPassWordContainer: {
        height: 15,
        width: 280,
        marginLeft: (sr.w-280)/2,
        marginTop: 30,
    },
    btnLogin: {
        height: 50,
        width: sr.w,
        marginTop: 20,
        borderRadius: 0,
        backgroundColor: '#F2443D',
    },
    btnLoginText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    thirdpartyContainer: {
        flex:1,
    },
    sepratorContainer: {
        height: 30,
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    sepratorLine: {
        top: 10,
        height: 2,
        width: sr.w - 20,
        backgroundColor: '#858687',
    },
    sepratorText: {
        backgroundColor:'#EEEEEE',
        color: '#A3A3A4',
        paddingHorizontal: 10,
    },
    thirdpartyButtonContainer: {
        marginTop: 30,
        height: 120,
        flexDirection: 'row',
    },
    thirdpartyLeftButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    thirdpartyRightButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    image_button: {
        width: 80,
        height: 80,
        margin: 10,
    },
    image_button_text: {
        color: '#4C4D4E',
        fontSize: 16,
    },
    thirdpartyContainer2: {
        marginTop: 30,
        height: 200,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    thirdpartyContainer2_text: {
        fontSize: 18,
        marginBottom:60,
    },
    list: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D7D7D7',
        width: 150,
        left: 80,
        paddingLeft: 10,
    },
    listHeightMin: {
        height: 30,
    },
    listHeightMax: {
        height: 184,
    },
    itemTextContainer: {
        height: 30,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 16,
    },
    separator: {
        backgroundColor: '#DDDDDD',
        height: 1,
    },
});
