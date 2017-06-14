'use strict';
const React = require('react');const ReactNative = require('react-native');
const {
    Navigator,
    PixelRatio,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
} = ReactNative;

import TabNavigator from 'react-native-tab-navigator';
import Badge from 'react-native-smart-badge'

const Subscribable = require('Subscribable');
const PublishTask = require('./PublishTask.js');
const TaskTable = require('./TaskTable.js');
const MyTask = require('./MyTask.js');
const Person = require('../person');
const TaskSupervision = require('./TaskSupervision.js');
const ExamineTask = require('./ExamineTask.js');
const CustomRemind = require('../../manager/CustomRemindTimeMgr.js');

const INIT_ROUTE_INDEX = 0;
const ROUTE_STACK = [
    { index: 0, component: MyTask },
    { index: 1, component: TaskTable },
    { index: 2, component: PublishTask },
    { index: 3, component: Person },
];

const TaskListBadge = React.createClass({
    getInitialState() {
        return {
            num: 0,
        };
    },
    componentWillMount() {
        app.setTaskBadge = (num)=>{this.setState({num})}
        app.addTaskBadge = (num)=>{this.setState({num: this.state.num+num})}
        app.subTaskBadge = (num)=>{this.setState({num: this.state.num-num})}
    },
    render() {
        const {num} = this.state;
        return (
            num > 0 ?
            <Badge style={styles.badge}>
                {num}
            </Badge>
            : null
        )
    }
});

const HomeTabBar = React.createClass({
    componentWillMount () {
        app.showMainScene = (i) => {
            const { title, leftButton, rightButton } = _.find(ROUTE_STACK, (o) => o.index === i).component;
            Object.assign(app.getCurrentRoute().component, {
                title: title,
                leftButton: leftButton,
                rightButton: rightButton,
            });
            this.props.onTabIndex(i);
            app.forceUpdateNavbar();
        };
    },
    componentDidMount () {
        app.dismissProgressHud();
    },
    getInitialState () {
        return {
            tabIndex: this.props.initTabIndex,
        };
    },
    handleWillFocus (route) {
        const tabIndex = route.index;
        this.setState({ tabIndex });
    },
    render () {
        const menus = [
            { index: 0, title: '我的任务', icon: app.img.home_my_task_norm, selected: app.img.home_my_task_pressed },
            { index: 1, title: '任务列表', icon: app.img.home_task_list_norm, selected: app.img.home_task_list_pressed },
            { index: 2, title: '新建任务', icon: app.img.home_add_task_norm, selected: app.img.home_add_task_pressed },
            { index: 3, title: '个人信息', icon: app.img.home_add_task_norm, selected: app.img.home_add_task_pressed },
        ];
        const TabNavigatorItems = menus.map((item) => {
            return (
                <TabNavigator.Item
                    key={item.index}
                    selected={this.state.tabIndex === item.index}
                    renderBadge={() => item.index===0 ? <TaskListBadge /> :null}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    selectedTitleStyle={styles.selecteTitleStyle}
                    renderIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.icon}
                            style={styles.icon} />
                    }
                    renderSelectedIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.selected}
                            style={styles.icon} />
                    }
                    onPress={() => {
                        app.showMainScene(item.index);
                    }}>
                    <View />
                </TabNavigator.Item>
            );
        });
        return (
            <View style={styles.tabs}>
                <TabNavigator
                    tabBarStyle={styles.tabBarStyle}
                    tabBarShadowStyle={styles.tabBarShadowStyle}
                    hidesTabTouch >
                    {TabNavigatorItems}
                </TabNavigator>
            </View>
        );
    },
});

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    getInitialState () {
        return {
            isOpen: false,
            selectedItem: 'About',
        };
    },
    componentWillMount () {
        this.registerEvents('NEW_PUBLISH_TASK_EVENT');
        this.registerEvents('APPLY_FINISH_TASK_EVENT');
        this.registerEvents('REMIND_TASK_EVENT');
        this.addListenerOn(CustomRemind, 'TIMING_TASK_EVENT', (param) => {
            this.TIMING_TASK_EVENT(param);
        });
    },
    componentDidMount() {
        app.customTime.setTiming();
    },
    registerEvents (name) {
        this.addListenerOn(app.socket, name, (param) => {
            this[name](param);
        });
    },
    TIMING_TASK_EVENT (task) {
        let data = null;
        if (!!task) {
            for (var i = 0; i < task.timeText.length; i++) {
                data = task.timeText[i];
                const params = {
                    type: task.type,
                    taskDetail: data,
                    component: TaskSupervision,
                }
                app.showNotifications(params);
            }
        }

    },
    // 0: '自定义提醒通知' TIMING_TASK_EVENT
    // 1: '综合部创建一条群组任务', NEW_PUBLISH_TASK_NF
    // 2: '发布一条新任务', AGREE_PUBLISH_TASK_NF
    // 3: '领导拒绝申请发布该任务', REJECT_PUBLISH_TASK_NF
    // 4: '申请完成该任务', APPLY_FINISH_TASK_NF
    // 5: '领导同意完成该任务', AGREE_FINISH_TASK_NF
    // 6: '领导拒绝完成该任务', REJECT_FINISH_TASK_NF
    // 7: '定时任务通知', REMIND_TASK_NF
    //type用于方便显示通知的类型
    NEW_PUBLISH_TASK_EVENT (task) {
        const params = {
            type: 1,
            taskDetail: task,
            component: ExamineTask,
        }
        app.showNotifications(params);
    },
    APPLY_FINISH_TASK_EVENT (task) {
        const params = {
            type: 4,
            taskDetail: task,
            component: TaskSupervision,
        }
        app.showNotifications(params);
    },
    REMIND_TASK_EVENT (task) {
        const params = {
            type: 7,
            taskDetail: task,
            component: TaskSupervision,
        }
        app.showNotifications(params);
    },
    getChildScene () {
        return this.scene;
    },
    updateMenuState (isOpen) {
        this.setState({ isOpen });
    },
    onMenuItemSelected (item) {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    },
    renderScene (route, navigator) {
        return <route.component ref={(ref) => { if (ref)route.ref = ref; }} />;
    },
    render () {
        return (
            <Navigator
                debugOverlay={false}
                style={styles.container}
                ref={(navigator) => {
                    this._navigator = navigator;
                }}
                initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                initialRouteStack={ROUTE_STACK}
                renderScene={this.renderScene}
                onDidFocus={(route) => {
                    const ref = this.scene = app.scene = route.ref;
                    ref && ref.onDidFocus && ref.onDidFocus();
                }}
                onWillFocus={(route) => {
                    if (this._navigator) {
                        const { routeStack, presentedIndex } = this._navigator.state;
                        const preRoute = routeStack[presentedIndex];
                        if (preRoute) {
                            const preRef = preRoute.ref;
                            preRef && preRef.onWillHide && preRef.onWillHide();
                        }
                    }
                    const ref = route.ref;
                    ref && ref.onWillFocus && ref.onWillFocus(); // 注意：因为有initialRouteStack，在mounted的时候所有的页面都会加载，因此只有第一个页面首次不会调用，需要在componentDidMount中调用，其他页面可以调用
                }}
                configureScene={(route) => ({
                    ...app.configureScene(route),
                })}
                navigationBar={
                    <HomeTabBar
                        initTabIndex={INIT_ROUTE_INDEX}
                        onTabIndex={(index) => {
                            this._navigator.jumpTo(_.find(ROUTE_STACK, (o) => o.index === index));
                        }}
                        />
                }
                />

        );
    },
});

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
    },
    tabs: {
        height: 60,
        width: sr.w,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    titleStyle: {
        fontSize:12,
        color: '#666666',
        marginBottom: 3,
    },
    selecteTitleStyle: {
        fontSize:12,
        color: '#ea372f',
        marginBottom: 3,
    },
    tabBarStyle: {
        height:55,
        backgroundColor: '#C9D6D6',
    },
    tabBarShadowStyle: {
        height: 0,
        backgroundColor: '#C9D6D6',
    },
    icon: {
        width:35,
        height:35,
    },
    badge: {
        position:'absolute',
        left:-10,
        top: 2,
    },
});
