'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
} = ReactNative;

const Subscribable = require('Subscribable');
const TaskSupervision = require('./TaskSupervision.js');
const ExamineTask = require('./ExamineTask.js');
import Badge from 'react-native-smart-badge';
const { STATUS_TEXT_HIDE, STATUS_START_LOAD, STATUS_HAVE_MORE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR } = CONSTANTS.LISTVIEW_INFINITE.STATUS;


module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务列表',
    },
    getInitialState () {
        this.list = [];
        this.pageNo = 1;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.list),
            infiniteLoadStatus: STATUS_TEXT_HIDE,
        };
    },
    onWillFocus() {
        this.getList();
    },
    onPress(data) {
        app.navigator.push({
            component: ExamineTask,
            passProps: {data}
        });
    },
    componentDidMount () {
        this.getList();
    },
    getList () {
        const param = {
            userId: app.personal.info.userId,
            pageNo: this.pageNo,
        };
        this.setState({ infiniteLoadStatus: this.pageNo === 1 ? STATUS_START_LOAD : STATUS_HAVE_MORE });
        POST(app.route.ROUTE_GET_APPLY_PUBLISH_TASK_LIST, param, this.getListSuccess, this.getListFailed);
    },
    getListSuccess (data) {
        if (data.success) {
            if (data.context) {
                const list = data.context.taskList || [];
                this.list = this.list.concat(list);
                const infiniteLoadStatus = list.length < CONSTANTS.PER_PAGE_COUNT ? STATUS_ALL_LOADED : STATUS_HAVE_MORE;
                this.setState({
                    infiniteLoadStatus: infiniteLoadStatus,
                    dataSource:this.ds.cloneWithRows(this.list),
                });
            } else {
                this.setState({ infiniteLoadStatus: STATUS_NO_DATA });
            }
        } else {
            this.getListFailed();
        }
    },
    getListFailed () {
        this.pageNo--;
        this.setState({ infiniteLoadStatus: STATUS_LOAD_ERROR });
    },
    onEndReached () {
        if (this.state.infiniteLoadStatus !== STATUS_TEXT_HIDE) {
            return;
        }
        this.pageNo++;
        this.getList();
    },
    renderFooter () {
        return (
            <View style={styles.listFooterContainer}>
                <Text style={styles.listFooter}>{CONSTANTS.LISTVIEW_INFINITE.TEXT[this.state.infiniteLoadStatus]}</Text>
            </View>
        );
    },
    renderRow (obj, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onPress.bind(null, obj)} style={styles.rowItem}>
                <View style={styles.rightStyle}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_title_background}
                        style={styles.title_background} >
                        <Text style={styles.title}>{obj.title}</Text>
                    </Image>
                    <View style={styles.midView}>
                        <Text numberOfLines={3} style={styles.description}>{obj.content}</Text>
                        <Text style={styles.more}>{'点击更多'}</Text>
                    </View>
                    <View style={styles.statusBar}>
                        <Text style={styles.childTasks}>
                            {obj.expectStartTime}
                        </Text>
                        <View style={styles.childStyle}>
                            <Text style={styles.childTasks}>
                                {'距离结束还有：'}
                            </Text>
                            <Text style={styles.childState}>
                                {app.utils.getSurplusTimeString(obj.expectFinishTime)}
                            </Text>
                        </View>

                    </View>
                </View>
                {
                    !_.includes(obj.readed, app.personal.info.phone) &&
                    <Image
                        resizeMode='stretch'
                        source={app.img.leader_title_label}
                        style={styles.icon} />
                }
            </TouchableOpacity>
        );
    },
    render () {
        const {dataSource} = this.state;
        return (
            <View style={styles.container}>
                <ListView
                    ref={listView => { this.listView = listView; }}
                    initialListSize={1}
                    removeClippedSubviews={false}
                    enableEmptySections
                    onEndReached={this.onEndReached}
                    style={styles.listStyle}
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    listStyle: {
        alignSelf:'stretch',
        backgroundColor: '#FFFFFF',
    },
    listFooterContainer: {
        height: 60,
        alignItems: 'center',
    },
    listFooter: {
        marginVertical: 10,
        color: 'gray',
        fontSize: 14,
    },
    rowItem: {
        width: sr.w,
        height: 133,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBar: {
        width: sr.w,
        height: 21,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#c7c7c7',
    },
    childTasks: {
        marginLeft: 20,
        fontSize: 9,
        backgroundColor: 'transparent',
    },
    childStyle: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childState: {
        fontSize: 9,
        color:'#f64136',
    },
    rightStyle: {
        width: sr.w,
        marginTop: 14,
        height: 119,
        backgroundColor :'#FFFFFF'
    },
    title_background: {
        width: sr.w,
        height: 27,
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        marginLeft: 20,
        color: '#FFFFFF',
        backgroundColor: 'transparent'
    },
    midView: {
        height: 71,
        width: sr.w,
    },
    description: {
        fontSize: 10,
        marginHorizontal: 20,
        marginTop: 5,
        lineHeight: 16,
        color: '#666666',
    },
    more: {
        fontSize: 10,
        marginTop: 2,
        alignSelf: 'center',
        color: '#666666',
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 4,
        width: 32,
        height: 47,
    },
});
