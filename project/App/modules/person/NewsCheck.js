'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    WebView,
} = ReactNative;

const NewsList = require('./NewsList.js');
const { Button } = COMPONENTS;

const CHILD_ITEM = [
    '行业新闻',
    '违规公示',
    '行业政策',
    '通告',
];

module.exports = React.createClass({
    statics: {
        title: '信息查看',
    },
    getInitialState () {
        return {
            currentIndex: 0,
            lists: null,
        };
    },
    componentDidMount () {
        this.getList();
    },
    onPress (index) {
        this.setState({ currentIndex: index });
    },
    headItem (itemStr, i) {
        return (
            <TouchableOpacity
                onPress={this.onPress.bind(null, i)}
                style={styles.itemView}>
                <Text style={this.state.currentIndex === i ? styles.selectText : styles.text}>
                    {itemStr}
                </Text>
                {this.state.currentIndex === i && <View style={styles.lineView} />}
            </TouchableOpacity>
        );
    },
    headView () {
        return (
            <View style={styles.textView}>
                {this.headItem(CHILD_ITEM[0], 0)}
                {this.headItem(CHILD_ITEM[1], 1)}
                {this.headItem(CHILD_ITEM[2], 2)}
                {this.headItem(CHILD_ITEM[3], 3)}
            </View>
        );
    },
    getList () {
        const param = {
            type: '',
            userId: app.personal.info.shopId,
            pageNo: 0,
            pageSize: CONSTANTS.PER_PAGE_COUNT,
        };
        POST(app.route.ROUTE_GET_NOTIFY_LIST, param, this.getListSuccess);
    },
    getListSuccess (data) {
        if (data.success) {
            this.setState({ lists: data.context });
        }
    },
    render () {
        const { currentIndex, lists } = this.state;
        return (
            <View style={styles.container}>
                <this.headView />
                {
                    !!lists &&
                    <View style={styles.listContainer}>
                        <NewsList active={currentIndex === 0} type='news' list={lists.news.list} />
                        <NewsList active={currentIndex === 1} type='publicity' list={lists.publicity.list} />
                        <NewsList active={currentIndex === 2} type='policy' list={lists.policy.list} />
                        <NewsList active={currentIndex === 3} type='notice' list={lists.notice.list} />
                    </View>
                }
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#E6EBEC',
    },
    listContainer: {
        flex:1,
    },
    textView: {
        marginTop: 20,
        height: 45,
        flexDirection: 'row',
    },
    itemView: {
        width: sr.w / 4,
        height: 43,
    },
    lineView: {
        marginTop: 10,
        height: 2,
        backgroundColor: '#34a9b1',
    },
    selectText: {
        fontSize: 14,
        color: '#34a9b1',
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        color: '#666666',
        alignSelf: 'center',
    },
});
