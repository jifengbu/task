'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
} = ReactNative;

const { PageList } = COMPONENTS;
const { STATUS_TEXT_HIDE, STATUS_ALL_LOADED } = CONSTANTS.LISTVIEW_INFINITE.STATUS;

module.exports = React.createClass({
    _onPressRow (obj) {
        console.log(obj);
    },
    renderRow (obj) {
        const { content, source, time, title } = obj;
        return (
            <TouchableHighlight
                style={styles.itemContainer}
                onPress={this._onPressRow.bind(null, obj)}
                underlayColor='#EEB422'>
                <View style={styles.row}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <View style={styles.source}>
                        <Text style={styles.sourceText}>{source}</Text>
                        <Text style={styles.timeText}>{time}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },
    render () {
        const { active, list, type } = this.props;
        return (
            <View style={active ? { flex:1 } : { left:-sr.tw, top:0, position:'absolute' }}>
                <PageList
                    ref={listView => { this.listView = listView; }}
                    style={{ flex: 1 }}
                    disable={!active}
                    renderRow={this.renderRow}
                    listParam={{ userId: app.personal.info.userId, type }}
                    listName={type + '.list'}
                    listUrl={app.route.ROUTE_GET_NOTIFY_LIST}
                    refreshEnable
                    autoLoad={false}
                    list={list}
                    pageNo={0}
                    infiniteLoadStatus={list.length < CONSTANTS.PER_PAGE_COUNT ? STATUS_ALL_LOADED : STATUS_TEXT_HIDE}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 10,
        width:sr.w,
        backgroundColor: '#FFFFFF',
    },
    row: {
        width: sr.w,
        paddingTop: 12,
        paddingBottom: 6,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        color: '#696969',
    },
    content: {
        marginTop: 10,
        fontSize: 16,
    },
    source: {
        flexDirection: 'row',
        width: sr.w - 20,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    sourceText: {
        fontSize: 12,
        color: '#969696',
    },
    timeText: {
        fontSize: 12,
        color: '#969696',
    },
});
