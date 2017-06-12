'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} = ReactNative;

import Swiper from 'react-native-swiper';
const TimerMixin = require('react-timer-mixin');
const SplashScreen = require('@remobile/react-native-splashscreen');
const Login = require('../login/Login.js');
const Home = require('../home/index.js');
const PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState () {
        return {
            renderSplashType: 0,
        };
    },
    getClientList(type) {
        const param = {
            authority: type==='supervision' ? 8 : 15,
        };
        POST(app.route.ROUTE_GET_CLIENT_LIST, param, this.getClientListSuccess.bind(null, type));
    },
    getClientListSuccess(type, data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                if (type==='supervision') {
                    app.supervisionClient.setList(data.context.clientList);
                } else if (type==='executor') {
                    app.executorClient.setList(data.context.clientList);
                }
            }
        }
    },
    enterLoginPage (needHideSplashScreen) {
        app.navigator.replace({
            component: Login,
        });
        needHideSplashScreen && SplashScreen.hide();
    },
    changeToLoginPage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 1 }, () => {
                SplashScreen.hide();
            });
        } else {
            this.enterLoginPage(true);
        }
    },
    enterHomePage (needHideSplashScreen) {
        app.navigator.replace({
            component: Home,
        });
        needHideSplashScreen && SplashScreen.hide();
    },
    changeToHomePage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 2 }, () => {
                SplashScreen.hide();
            });
        } else {
            this.enterHomePage(true);
        }
    },
    enterNextPage () {
        app.updateMgr.setNeedShowSplash(false);
        if (app.personal.needLogin) {
            this.enterLoginPage();
        } else {
            app.utils.until(
                () => app.socketconnect,
                this.check,
                () => {
                    app.socket.login(app.personal.info.phone,(obj)=>{
                        if (obj.success) {
                            this.changeToHomePage()
                        } else {
                            this.changeToLoginPage();
                        }
                    });

                }
            );
        }
    },
    check(cb) {
        if (this.timeTick > 5000) {
            this.changeToLoginPage();
        } else {
            setTimeout(cb, 100);
            this.timeTick += 100;
        }
    },
    changeToNextPage () {
        if (app.personal.needLogin) {
            this.changeToLoginPage();
        } else {
            this.timeTick = 0;
            app.utils.until(
                () => app.socketconnect,
                this.check,
                (err) => {
                    app.socket.login({phone:app.personal.info.phone},(obj)=>{
                        if (obj.success) {
                            this.changeToHomePage()
                        } else {
                            this.changeToLoginPage();
                        }
                    });

                }
            );

        }
    },
    componentDidMount () {
        this.getClientList('supervision');
        this.getClientList('executor');
        app.utils.until(
            () => app.personal.initialized && app.updateMgr.initialized && app.navigator,
            (cb) => setTimeout(cb, 100),
            () => this.changeToNextPage()
        );
    },
    componentWillUnmount () {
        app.updateMgr.checkUpdate();
    },
    onLayout (e) {
        const { height } = e.nativeEvent.layout;
        if (this.state.height !== height) {
            this.heightHasChange = !!this.state.height;
            this.setState({ height });
        }
    },
    renderSwiperSplash () {
        const { height } = this.state;
        const marginBottom = (!this.heightHasChange || Math.floor(height) === Math.floor(sr.th)) ? 0 : 30;
        return (
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                {
                    height &&
                    <Swiper
                        paginationStyle={styles.paginationStyle}
                        dot={<View style={{ backgroundColor:'transparent', width: 8, height: 8, borderRadius: 4, marginLeft: 12, marginRight: 12, marginBottom }} />}
                        activeDot={<View style={{ backgroundColor:'transparent', width: 18, height: 9, borderRadius: 6, marginLeft: 7, marginRight: 7, marginBottom }} />}
                        height={height}
                        loop={false}>
                        {
                            [1, 2, 3, 4].map((i) => {
                                return (
                                    <Image
                                        key={i}
                                        resizeMode='stretch'
                                        source={app.img['splash_splash' + i]}
                                        style={[styles.bannerImage, { height }]}>
                                        {
                                            i === 4 &&
                                            <TouchableOpacity
                                                style={styles.enterButtonContainer}
                                                onPress={this.enterNextPage}>
                                            </TouchableOpacity>
                                        }
                                    </Image>
                                );
                            })
                        }
                    </Swiper>
                }
            </View>
        );
    },
    render () {
        return this.state.renderSplashType === 0 ? null : this.renderSwiperSplash();
    },
});

const styles = StyleSheet.create({
    paginationStyle: {
        bottom: 30,
    },
    bannerImage: {
        width: sr.w,
    },
    enterButtonContainer: {
        position: 'absolute',
        width: 165,
        height: 40,
        left: (sr.w - 165) / 2,
        bottom: 60,
        alignItems:'center',
        justifyContent: 'center',
    },
    enterButton: {
        width: 140,
        height: 36,
    },
});
