'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} = ReactNative;

const TaskList = require('./TaskList.js');
const TimeManageList = require('./TimeManageList.js');
var {Button} = COMPONENTS;
var searchText = '';

var Title = React.createClass({
    render() {
        return (
            <View style={styles.txtInputView}>
                <TextInput
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
    mixins: [SceneMixin],
    statics: {
        title: (<Title doStartSearch={()=>{app.scene.doStartSearch()}}/>),
        rightButton: { image: null, handler: ()=>{app.scene.doStartSearch()}},
    },
    getInitialState () {
        return {
            isShow: false,
        };
    },
    doStartSearch() {
        this.doSearch(searchText, 0);
    },
    doSearch(keyword, searchType) {
        if (keyword === '') {
            Toast('请输入搜索关键字');
            return;
        }
        var param = {
            keyword: keyword,
            userID: app.personal.info.userID,
        };
        POST(app.route.ROUTE_SEARCH, param, this.doSearchSuccess.bind(null, keyword), true);
    },
    doSearchSuccess(keyword, data) {
        if (data.success) {

        } else {
            Toast("没有相关内容");
        }
    },
    render() {
      const { isShow } = this.state;
        return (
            <View style={styles.container}>
                {
                  <TaskList />
                }

                {
                  isShow&&
                  <TimeManageList />
                }
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    txtInputSearch: {
        height: 25,
        width: 270,
        color: '#929292',
        paddingVertical: -2,
        fontSize: 14,
        paddingLeft: 5,
        marginLeft: 5,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        alignItems:'center',
        borderRadius: 4,
    },
    txtInputView: {
        height: 25,
        width: 306,
        marginLeft: 40,
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
