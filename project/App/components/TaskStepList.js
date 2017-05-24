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

const DImage = require('./DImage.js');

module.exports = React.createClass({
    getInitialState () {
        this.list = [];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.list),
        };
    },
    renderRow (obj, sectionID, rowID) {
        let lastNum = this.list.length - 1;
        return (
            <View style={styles.rowItem}>
                {
                  rowID%2 === 0&&
                  <View style={styles.leftStyle}>
                      <View style={styles.titleStyle}>
                          <Text style={[styles.timeText,{color: rowID == lastNum? 'red': '#1b1b1b'}]}>{obj.createTime}</Text>
                      </View>
                      <Text style={[styles.textContent, {color: rowID == lastNum? 'red': '#c1c1c1'}]}>{obj.userName}</Text>
                      <Text style={[styles.textContent, {color: rowID == lastNum? 'red': '#c1c1c1'}]}>{obj.content}</Text>
                  </View>
                }
                <View style={[styles.itemStyle,{marginLeft: rowID%2 !== 0?sr.w/2-25:0}]}>
                    <View style={[styles.lineStyle,{backgroundColor: '#cacaca'}]}/>
                    <DImage
                        resizeMode='cover'
                        source={app.img.home_dot}
                        style={styles.dotImage}/>
                    <View style={[styles.lineStyle,{backgroundColor: '#cacaca'}]}/>
                </View>
                {
                  rowID%2 !== 0&&
                  <View style={styles.rightStyle}>
                      <View style={styles.titleStyle}>
                          <Text style={[styles.timeText,{color: rowID == lastNum? 'red': '#1b1b1b'}]}>{obj.createTime}</Text>
                      </View>
                      <Text style={[styles.textContent, {color: rowID == lastNum? 'red': '#c1c1c1'}]}>{obj.userName}</Text>
                      {!!obj.content && <Text style={[styles.textContent, {color: rowID == lastNum? 'red': '#c1c1c1'}]}>{obj.content}</Text>}
                  </View>
                }
            </View>
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{'任务进度'}</Text>
                </View>
                <ListView
                    ref={listView => { this.listView = listView; }}
                    initialListSize={1}
                    onEndReachedThreshold={10}
                    enableEmptySections
                    style={styles.listStyle}
                    dataSource={this.ds.cloneWithRows(this.props.listData)}
                    renderRow={this.renderRow}
                    />
                <View style={{height: 20, backgroundColor: '#FFFFFF'}}/>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    titleView: {
        width: 80,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ea372f',
        borderRadius: 6,

    },
    titleText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontFamily: 'STHeitiSC-Medium',
    },
    listStyle: {
        alignSelf:'stretch',
    },
    rowItem: {
        flexDirection: 'row',
        height: 60,
    },
    leftStyle: {
        width: sr.w/2-25,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    itemStyle: {
        width: 30,
        alignItems: 'center',
    },
    dotImage: {
        width: 20,
        height: 20,
    },
    lineStyle: {
        width: 2,
        height: 25,
        backgroundColor: 'gray'
    },
    rightStyle: {
        width: sr.w/2-15,
        justifyContent: 'center',
    },
    titleStyle: {
        marginTop: 5,
    },
    separator: {
        height: 1,
        width: sr.w - 34,
        alignSelf: 'center',
        backgroundColor: 'gray',
    },
    timeText: {
        fontSize: 13,
    },
    textContent: {
        fontSize: 12,
        marginTop: 5,
    },
});
