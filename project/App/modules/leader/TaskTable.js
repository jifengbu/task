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
        };
    },
    changeTab (tabIndex) {
        this.setState({ tabIndex });
    },
    render () {
        const { tabIndex } = this.state;
        const menuAdminArray = ['最关心任务', '加急任务', '紧急任务', '一般任务', '综合任务', '打回任务'];
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
                                    onPress={this.changeTab.bind(null, i)}
                                    style={styles.tabButtonLeft}>
                                    <Text style={[styles.tabText, tabIndex === i ? { color:'#fff000' } : { color:'#FFFFFF' }]} >
                                        {item}
                                    </Text>
                                    <View style={[styles.tabLine, tabIndex === i ? { backgroundColor: '#fff000' } : null]} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.listStyle}>
                    {
                        this.state.tabIndex !==5&&
                        <TaskList />
                    }
                    {
                        this.state.tabIndex ===5&&
                        <RepulseTackList />
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
