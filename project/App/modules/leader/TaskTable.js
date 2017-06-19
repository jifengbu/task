'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    WebView,
} = ReactNative;

const TaskList = require('./TaskList.js');
const CareTaskList = require('./CareTaskList.js');
const ApproveTaskList = require('./ApproveTaskList.js');
const RepulseTackList = require('./RepulseTackList.js');

const { DImage } = COMPONENTS;

var searchText = '';

var Title = React.createClass({
    render() {
        return (
            <View style={styles.txtInputView}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="输入搜索关键字"
                    defaultValue={searchText}
                    onChangeText={(text) => {searchText=text}}
                    onSubmitEditing={this.props.doStartSearch}
                    style={styles.txtInputSearch}
                    />
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={this.props.doStartSearch}
                    style={styles.txtFindView}>
                   <Image
                        resizeMode='cover'
                        source={app.img.leader_search}
                        style={styles.icon_find}/>
                </TouchableOpacity>
            </View>
        )
    }
});

module.exports = React.createClass({
    statics: {
        title: (<Title doStartSearch={()=>{app.scene.doStartSearch()}}/>),
        rightButton: { image: null, handler: ()=>{app.scene.doStartSearch()}},
    },
    doStartSearch() {
        this.setState({keyword: searchText});
    },
    getInitialState () {
        return {
            tabIndex: 0,
            dataDetail: null,
            taskType: '',
            keyword: '',
        };
    },
    componentDidMount() {
        this.getTaskTypeList();
    },
    onWillFocus() {
        if (this.repulseTackList) {
            this.repulseTackList.onWillFocus();
        }
    },
    getTaskTypeList() {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_TASK_TYPE_LIST, param, this.getPersonalInfoSuccess);
    },
    getPersonalInfoSuccess (data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.setState({dataDetail:context});
            }
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    changeTab (tabIndex,taskType) {
        this.setState({ tabIndex,taskType });
    },
    render () {
        const { tabIndex, dataDetail,taskType,keyword } = this.state;
        let menuAdminArray = [];
        let taskArr = [{"key": "0","name": "最关心任务",},{"key": "1","name": "打回任务",},{"key": "2","name": "审批任务",}];
        if (dataDetail) {
            menuAdminArray = dataDetail.taskTypeList;
        }
        taskArr.push(...menuAdminArray);
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabContainer}>
                    {
                        taskArr.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={this.changeTab.bind(null, i, item.key)}
                                    style={styles.tabButtonLeft}>
                                    <Text style={[styles.tabText, tabIndex === i ? { color:'#fff000' } : { color:'#FFFFFF' }]} >
                                        {item.name}
                                    </Text>
                                    <View style={[styles.tabLine, tabIndex === i ? { backgroundColor: '#fff000' } : null]} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.listStyle}>
                    {
                        this.state.tabIndex ===0&&
                        <CareTaskList />
                    }
                    {
                        this.state.tabIndex ===1&&
                        <RepulseTackList ref={(ref) => { this.repulseTackList = ref; }} />
                    }
                    {
                        this.state.tabIndex ===2&&
                        <ApproveTaskList />
                    }
                    {
                        menuAdminArray.map((item, i) => {
                            if (this.state.tabIndex ===i+3) {
                                return (
                                    <TaskList key={i} taskType={taskType} keyword={keyword}/>
                                );
                            }
                        })
                    }
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#ea372f',
    },
    tabButtonLeft: {
        width: sr.w / 5,
        height: 35,
        alignItems:'center',
        marginRight: 5,
        justifyContent:'flex-end',
    },
    tabLine: {
        width: sr.w / 5 - 3,
        height: 1.5,
        marginTop: 10,
        alignSelf: 'center',
    },
    tabText: {
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    listStyle: {
        width: sr.w,
        height: sr.ch-35,
    },
    txtInputSearch: {
        height: 25,
        width: 305,
        color: '#929292',
        paddingVertical: -2,
        fontSize: 14,
        paddingLeft: 5,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        alignItems:'center',
        borderRadius: 4,
    },
    txtInputView: {
        height: 25,
        width: 336,
        paddingVertical: -10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
    txtFindView: {
        backgroundColor: 'transparent',
        width: 25,
        height: 25,
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    icon_find: {
        height: 20,
        width: 20,
    },
});
