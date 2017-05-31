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
import Badge from 'react-native-smart-badge';

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '任务列表',
    },
    getInitialState () {
        this.pageNo = 1;
        this.taskList = [];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.taskList),
        };
    },
    componentDidMount () {
        this.getTaskListByType();
    },
    getTaskListByType() {
        const param = {
            userId: app.personal.info.userId,
            role: 'leader',
            pageNo: this.pageNo,
            pageSize: 10,
        };
        POST(app.route.ROUTE_GET_REJECT_TASK_LIST, param, this.getTaskListByTypeSuccess);
    },
    getTaskListByTypeSuccess (data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.taskList = context.taskList;
                this.setState({dataSource: this.ds.cloneWithRows(this.taskList)});
            }
        } else {
            this.getListFailed();
        }
    },
    getListFailed () {
        this.pageNo--;
    },
    onEndReached () {
        // this.pageNo++;
        // this.getTaskListByType(this.type);
    },
    renderRow (obj, sectionID, rowID) {
        return (
          <View>
            <RowItem  obj={obj}/>
          </View>
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

const RowItem = React.createClass({
    getInitialState () {
        return {
            isLookAll: false,
        };
    },
    _measureLineHeight (e) {
        if (!this.state.lineheight) {
            const { height } = e.nativeEvent.layout;
            this.setState({ lineHeight: height + 26 });
        }
    },
    onPress() {
    },
    doLookAll () {
        this.setState({ isLookAll: !this.state.isLookAll });
    },
    render () {
        const {obj } = this.props;
        const { isLookAll,lineHeight } = this.state;
        let time = app.utils.getSurplusTimeString(obj.expectFinishTime);
        return (
          <TouchableOpacity onPress={this.onPress.bind(null, obj)} style={styles.rowItem}>
              <View style={styles.rightStyle}>
                  <Image
                      resizeMode='stretch'
                      source={app.img.leader_title_background}
                      style={styles.title_background} >
                      <Text style={styles.title}>{obj.title}</Text>
                  </Image>
                  <View style={styles.topView}>
                      <Text style={styles.title_text}>{'打回原因:'}</Text>
                      <Text numberOfLines={2} style={styles.description}>{obj.rejectPublishReason}</Text>
                  </View>
                  <View style={styles.line}/>
                  <View style={[styles.midView,{height: lineHeight}]}>
                      <Text onLayout={this._measureLineHeight} numberOfLines={isLookAll ? 200 : 3} style={styles.description}>
                          {obj.content}
                      </Text>
                      {
                          !isLookAll &&
                          <Image resizeMode='stretch' source={app.img.leader_check_background} style={[styles.maskImage, { height: (lineHeight) / 2 }]} />
                      }
                      <TouchableOpacity onPress={this.doLookAll} style={styles.lookAllStyle}>
                          <Text style={styles.lookAllText}>{isLookAll ? '收起内容' : '查看详情'}</Text>
                          <Image resizeMode='contain' source={app.img.leader_check_detail} style={[styles.iconStyle,{transform:[{ rotate: isLookAll ?'-180deg':'0deg' }]}]} />
                      </TouchableOpacity>
                  </View>
                  {
                      isLookAll &&
                      <View style={styles.statusBar}>
                          <Text style={styles.childTasks}>
                              {obj.expectFinishTime}
                          </Text>
                          <View style={styles.childStyle}>
                              <Text style={styles.childTasks}>
                                  {'距离结束还有：'}
                              </Text>
                              <Text style={styles.childState}>
                                  {time}
                              </Text>
                          </View>
                      </View>
                  }
              </View>
          </TouchableOpacity>
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
    rowItem: {
        width: sr.w,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightStyle: {
        width: sr.w,
        marginTop: 10,
        backgroundColor :'#EEEEEE'
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
    title_text: {
        fontSize: 10,
        marginTop: 5,
        marginLeft: 20,
        color: '#f64136',
        backgroundColor: 'transparent'
    },
    lookAllText: {
        fontSize: 10,
        color: '#f64136',
        backgroundColor: 'transparent'
    },
    topView: {
        height: 55,
        width: sr.w,
    },
    line: {
        height: 1,
        width: sr.w-32,
        marginLeft: 16,
        backgroundColor: 'gray',
    },
    midView: {
        width: sr.w,
    },
    description: {
        fontSize: 10,
        marginHorizontal: 20,
        marginTop: 5,
        lineHeight: 16,
        color: '#666666',
    },
    maskImage: {
        width: sr.w,
        bottom: 20,
        left: 0,
        position: 'absolute',
    },
    iconStyle: {
        width: 11,
        height: 11,
        marginLeft: 6,
    },
    lookAllStyle: {
        width: 100,
        height: 20,
        bottom: 0,
        left: sr.w / 2 - 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    childStyle: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childTasks: {
        marginLeft: 20,
        fontSize: 9,
        backgroundColor: 'transparent',
    },
    childState: {
        fontSize: 9,
        color:'#f64136',
    },
    statusBar: {
        width: sr.w,
        height: 21,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#c7c7c7',
    },
});
