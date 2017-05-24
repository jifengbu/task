'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    WebView,
} = ReactNative;

const TaskList = require('./TaskList.js');
const RepulseTackList = require('./RepulseTackList.js');
const Search = require('./Search.js');

const { DImage } = COMPONENTS;

module.exports = React.createClass({
    statics: {
      rightButton: { image: app.img.leader_seach_seach, handler: ()=>{
          app.navigator.push({
              component: Search,
          });
      }},
    },
    getInitialState () {
        return {
            tabIndex: 0,
            dataDetail: null,
            taskType: '',
        };
    },
    componentDidMount() {
        this.getTaskTypeList();
    },
    getTaskTypeList() {
        const param = {
            userID: app.personal.info.userID,
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
        const { tabIndex, dataDetail,taskType } = this.state;
        let menuAdminArray = [];
        if (dataDetail) {
            menuAdminArray = dataDetail.taskTypeList;
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    scrollEnabled
                    style={styles.tabContainer}>
                    {
                        menuAdminArray.map((item, i) => {
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
                        <TaskList taskType={taskType}/>
                    }
                    {
                        this.state.tabIndex ===1&&
                        <TaskList taskType={taskType}/>
                    }
                    {
                        this.state.tabIndex ===2&&
                        <TaskList taskType={taskType}/>
                    }
                    {
                        this.state.tabIndex ===3&&
                        <TaskList taskType={taskType}/>
                    }
                    {
                        this.state.tabIndex ===4&&
                        <TaskList taskType={taskType}/>
                    }
                    {
                        this.state.tabIndex ===5&&
                        <RepulseTackList taskType={taskType}/>
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
        backgroundColor: 'red',
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
});
