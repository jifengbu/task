'use strict';

console.disableYellowBox = true;

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Navigator,
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    NativeModules,
    StatusBar,
} = ReactNative;

global._ = require('lodash');
global.sr = require('./config/Screen.js');
global.Toast = require('@remobile/react-native-toast').show;
global.CONSTANTS = require('./config/Constants.js');
const { POST, GET, UPLOAD } = require('./utils/net');
global.POST = POST;
global.GET = GET;
global.UPLOAD = UPLOAD;
global.COMPONENTS = require('./components/index.js');
const CacheImage = require('@remobile/react-native-cache-image');
const TimerMixin = require('react-timer-mixin');
const Utils = require('./utils/common/index.js');
const Route = require('./config/Route.js');
const img = require('./resource/image.js');
const aud = require('./resource/audio.js');
const PersonalInfoMgr = require('./manager/PersonalInfoMgr.js');
const NetMgr = require('./manager/NetMgr.js');
const UpdateMgr = require('./manager/UpdateMgr.js');
const SettingMgr = require('./manager/SettingMgr.js');
const LoginMgr = require('./manager/LoginMgr.js');
const WebsocketMgr = require('./manager/WebsocketMgr.js');
const SocketMgr = require('./manager/SocketMgr.js');
const { ProgressHud, DelayTouchableOpacity, Modal } = COMPONENTS;

global.app = {
    route: Route,
    utils: Utils,
    img: img,
    aud: aud,
    data: {},
    personal: PersonalInfoMgr,
    setting: SettingMgr,
    updateMgr:UpdateMgr,
    login: LoginMgr,
    socket: SocketMgr,
    isandroid: Platform.OS === 'android',
};

global.SceneMixin = {
    componentWillMount () {
        app.scene = this;
    },
};

app.configureScene = function (route) {
    route = route || {};
    let sceneConfig = route.sceneConfig;
    if (sceneConfig) {
        return sceneConfig;
    }
    if (Platform.OS === 'android') {
        if (route.fromLeft) {
            sceneConfig = { ...Navigator.SceneConfigs.FloatFromLeft, gestures: null };
        } else {
            sceneConfig = Navigator.SceneConfigs.FadeAndroid;
        }
    } else {
        if (route.fromLeft) {
            sceneConfig = { ...Navigator.SceneConfigs.FloatFromLeft, gestures: null };
        } else {
            sceneConfig = { ...Navigator.SceneConfigs.HorizontalSwipeJump, gestures: null };
        }
    }
    return sceneConfig;
};

const Splash = require('./modules/splash/index.js');

const NavigationBarRouteMapper = {
    LeftButton (route, navigator, index, navState) {
        const leftButton = route.leftButton || route.component.leftButton;
        if (index === 0 && !leftButton) {
            return null;
        }
        const image = leftButton && leftButton.image || app.img.common_back;
        const title = leftButton && leftButton.title || '';
        const handler = leftButton && leftButton.handler || navigator.pop;
        if (image && !title) {
            if (image === 'userhead' ) {
                return (
                    <DelayTouchableOpacity
                        onPress={handler}
                        style={styles.navBarButton}>
                        <CacheImage
                            resizeMode='stretch'
                            defaultSource={app.img.personal_default_head}
                            url={app.personal.info.shopLogo}
                            style={styles.navBarIconRound}
                            />
                    </DelayTouchableOpacity>
                );
            }
            return (
                <DelayTouchableOpacity
                    onPress={handler}
                    style={styles.navBarButton}>
                    <Image
                        resizeMode='stretch'
                        source={image}
                        style={styles.navBarIcon} />
                </DelayTouchableOpacity>
            );
        } else {
            return (
                <DelayTouchableOpacity
                    onPress={handler}
                    style={styles.navBarButton}>
                    <Text style={styles.navBarButtonText}>
                        {leftButton.title}
                    </Text>
                </DelayTouchableOpacity>
            );
        }
    },
    RightButton (route, navigator, index, navState) {
        const rightButton = route.rightButton || route.component.rightButton;
        if (!rightButton) {
            return <View style={styles.navBarRightEmptyButton} />;
        }
        if (rightButton.image) {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Image
                        resizeMode='stretch'
                        source={rightButton.image}
                        style={styles.navBarIcon} />
                </DelayTouchableOpacity>
            );
        } else {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Text style={styles.navBarButtonText}>
                        {rightButton.title}
                    </Text>
                </DelayTouchableOpacity>
            );
        }
    },
    Title (route, navigator, index, navState) {
        const title = route.title || route.component.title;
        const color = route.color || route.component.color || 'white';
        if (typeof title === 'string') {
            return (
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={1}
                        style={[styles.navBarTitleText, { color }]}>
                        {title}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.titleContainer}>
                    {title}
                </View>
            );
        }
    },
};

module.exports = React.createClass({
    mixins: [ProgressHud.Mixin, TimerMixin],
    getInitialState () {
        return {
            showNavBar: false,
            modalShow: false,
            modalContent: null,
            modalTitle: '',
            modalBackgroundColor: null,
            modalTouchHide: false,
            isOpen: false,
            selectedItem: 'About',
        };
    },
    componentWillMount () {
        if (!app.isandroid) {
            NativeModules.AccessibilityManager.setAccessibilityContentSizeMultipliers({
                'extraSmall': 1,
                'small': 1,
                'medium': 1,
                'large': 1,
                'extraLarge': 1,
                'extraExtraLarge': 1,
                'extraExtraExtraLarge': 1,
                'accessibilityMedium': 1,
                'accessibilityLarge': 1,
                'accessibilityExtraLarge': 1,
                'accessibilityExtraExtraLarge': 1,
                'accessibilityExtraExtraExtraLarge': 1,
            });
        }
        app.root = this;
        app.showProgressHud = this.showProgressHud;
        app.dismissProgressHud = this.dismissProgressHud;
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
        app.showModal = (view, options = {}) => {
            const { title, backgroundColor, touchHide } = options;
            this.setState({
                modalShow: true,
                modalContent: view,
                modalTitle: title,
                modalBackgroundColor: backgroundColor,
                modalTouchHide: touchHide,
            });
        };
        app.closeModal = () => {
            this.refs.modal.closeModal();
        };
        app.removeModal = () => {
            this.setState({
                modalShow: false,
            });
        };
        app.update = () => {
            this.setState({});
        };
        app.forceUpdateNavbar = () => {
            this.setState({
                showNavBar: true,
            });
        };
        app.toggleNavigationBar = (show) => {
            this.setImmediate(() => {
                this.setState({ showNavBar:show });
            });
        };
        app.getCurrentRoute = () => {
            const { routeStack, presentedIndex } = app.navigator.state;
            return routeStack[presentedIndex];
        };
        app.pop = (step = 1) => {
            if (step === 1) {
                app.navigator.pop();
            } else {
                const routes = app.navigator.getCurrentRoutes();
                const index = routes.length - step - 1;
                if (index > 0) {
                    app.navigator.popToRoute(routes[index]);
                } else {
                    app.navigator.popToTop();
                }
            }
        };
        if (app.isandroid) {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                if (this.state.is_hud_visible) {
                    this.setState({ is_hud_visible: false });
                    return true;
                }
                if (this.state.modalShow) {
                    this.setState({ modalShow: false });
                    return true;
                }
                const routes = app.navigator.getCurrentRoutes();
                if (routes.length > 1) {
                    const leftButton = routes[routes.length - 1].component.leftButton;
                    if (leftButton && leftButton.handler) {
                        leftButton.handler();
                    } else {
                        app.navigator.pop();
                    }
                    return true;
                }
                if (!this.willExitAndroid) {
                    Toast('再按一次返回键退出程序');
                    this.willExitAndroid = true;
                    this.setTimeout(() => { this.willExitAndroid = false; }, 3000);
                    return true;
                }
                return false;
            });
        }
    },
    componentDidMount: function () {
        //app.net.register();
    },
    configureScene (route) {
        return app.configureScene(route);
    },
    renderScene (route, navigator) {
        return (
            <View style={{ flex: 1 }}>
                {this.state.showNavBar && <View style={[styles.navBarBack, { backgroundColor:app.THEME_COLOR }]} />}
                <route.component
                    {...route.passProps}
                    ref={(ref) => { if (ref)route.ref = ref; }} />
            </View>
        );
    },
    render () {
        const initialRoute = {
            component: Splash,
        };
        const navigationBar = (
            <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={[styles.navBar, { backgroundColor: app.THEME_COLOR }]}
                />
        );
        return (
            <View style={{ flex:1 }}>
                <Navigator
                    ref={(navigator) => {
                        if (navigator) {
                            app.navigator = navigator;
                        }
                    }}
                    debugOverlay={false}
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    onDidFocus={(route) => {
                        if (route) {
                            const ref = route.ref;
                            const getChildScene = ref && ref.getChildScene;
                            // 注意：app.scene调用的时候一定需要使用封装函数，如：{handler: ()=>{app.scene.toggleEdit()}}，不能直接使用 handler: app.scene.toggleEdit.
                            // 在动画加载完成前 app.scene 还没有被赋值， 需要使用 SceneMixin 来设置 app.scene
                            const scene = app.scene = getChildScene ? getChildScene() : ref;
                            if (getChildScene && !scene.hasMouted) {
                                scene.hasMouted = true;
                                return;
                            }
                            scene && scene.onDidFocus && scene.onDidFocus();
                            // 如果时主页面，需要检测主页面和其子页面的回调
                            ref && ref !== scene && ref.onDidFocus && ref.onDidFocus();
                        }
                    }}
                    onWillFocus={(route) => {
                        if (route) {
                            const preRoute = app.navigator && app.getCurrentRoute();
                            if (preRoute) {
                                const preRef = preRoute.ref;
                                const preGetChildScene = preRef && preRef.getChildScene;
                                const preScene = preGetChildScene ? preGetChildScene() : preRef;
                                preScene && preScene.onWillHide && preScene.onWillHide();
                                // 如果时主页面，需要检测主页面和其子页面的回调
                                preRef && preRef !== preScene && preRef.onWillHide && preRef.onWillHide();
                            }
                            const ref = route.ref;
                            const getChildScene = ref && ref.getChildScene;
                            const scene = getChildScene ? getChildScene() : ref;
                            // 如果时主页面，需要检测主页面和其子页面的回调
                            scene && scene.onWillFocus && scene.onWillFocus();// 注意：在首次加载的时候页面没有被加载，route.ref为空，不会调用该函数，需要在该页面的componentWillMount里面处理首次逻辑，只有从上页面返回的时候才能被调用
                            ref && ref !== scene && ref.onWillFocus && ref.onWillFocus();
                        }
                    }}
                    navigationBar={this.state.showNavBar ? navigationBar : null}
                    />
                {
                    this.state.modalShow &&
                    <Modal ref='modal' title={this.state.modalTitle} backgroundColor={this.state.modalBackgroundColor} modalTouchHide={this.state.modalTouchHide}>
                        {this.state.modalContent}
                    </Modal>
                }
                <ProgressHud
                    isVisible={this.state.is_hud_visible}
                    isDismissible={false}
                    overlayColor='rgba(0, 0, 0, 0.6)'
                    color={app.THEME_COLOR}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#EEEEEE',
    },
    navBarBack: {
        height:sr.totalNavbarHeight,
    },
    navBar: {
        alignItems:'center',
        height: sr.totalNavbarHeight,
    },
    titleContainer: {
        width: sr.w,
        height: sr.navbarHeight,
        alignItems:'center',
        justifyContent: 'center',
        paddingTop: sr.translucent ? sr.statusBarHeight : 0,
    },
    navBarButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    navBarTitleText: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '500',
        width: sr.w / 2,
    },
    navBarButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height:sr.navbarHeight,
        alignItems: 'center',
        paddingTop: sr.translucent ? sr.statusBarHeight/2 : 0,
    },
    navBarRightEmptyButton: {
        width: 80,
        height: sr.navbarHeight,
    },
    navBarIcon: {
        width: sr.navbarHeight * (sr.translucent ? 0.5 : 0.7),
        height: sr.navbarHeight * (sr.translucent ? 0.5 : 0.7),
    },
    navBarIconRound: {
        width: sr.navbarHeight * (sr.translucent ? 0.5 : 0.7),
        height: sr.navbarHeight * (sr.translucent ? 0.5 : 0.7),
        borderRadius: sr.navbarHeight * (sr.translucent ? 0.5 : 0.7)/2,
    },
});
