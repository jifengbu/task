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
var arr = [
    {content: '主任下发任务', time: '2017-04-14'},
    {content: '李红接收任务，监督人：李白', time: '2017-04-14'},
    {content: '主任下发任务', time: '2017-04-14'},
    {content: '李红接收任务，监督人：李白', time: '2017-04-14'},
    {content: '主任下发任务', time: '2017-04-14'},
];

module.exports = React.createClass({
    getInitialState () {
        if (this.props.listData) {
            this.list = this.props.listData;
            console.log('this.props.listData', this.props.listData);
        } else {
            this.list = arr;
        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.list),
        };
    },
    renderRow (obj, sectionID, rowID) {
        let lastNum = this.list - 1;
        return (
            <View style={styles.rowItem}>
                {
                  rowID%2 === 0&&
                  <View style={styles.leftStyle}>
                      <Text style={{fontSize: 12,color: rowID == lastNum? 'red': 'gray'}}>{obj.title}</Text>
                      {!!obj.content && <Text style={{fontSize: 12,color: rowID == lastNum? 'red': 'gray'}}>{obj.content}</Text>}
                      <View style={styles.titleStyle}>
                          <Text style={[styles.textFont,{color: rowID == lastNum? 'red': 'gray'}]}>{'更新时间：'+obj.time}</Text>
                      </View>
                  </View>
                }
                <View style={[styles.itemStyle,{marginLeft: rowID%2 !== 0?sr.w/2-15:0}]}>
                    <View style={[styles.lineStyle,{backgroundColor: rowID == 0?'#FFFFFF':'gray'}]}/>
                    <View style={styles.viewStyle}>
                        <View style={styles.cicleStyle}>
                        </View>
                    </View>
                    <View style={[styles.lineStyle,{backgroundColor: rowID == lastNum?'#FFFFFF':'gray'}]}/>
                </View>
                {
                  rowID%2 !== 0&&
                  <View style={styles.rightStyle}>
                      <Text style={{fontSize: 12,color: rowID == lastNum? 'red': 'gray'}}>{obj.title}</Text>
                      {!!obj.content && <Text style={{fontSize: 12,color: rowID == lastNum? 'red': 'gray'}}>{obj.content}</Text>}
                      <View style={styles.titleStyle}>
                          <Text style={[styles.textFont,{color: rowID == lastNum? 'red': 'gray'}]}>{'更新时间：'+obj.time}</Text>
                      </View>
                  </View>
                }
            </View>
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <ListView
                    ref={listView => { this.listView = listView; }}
                    initialListSize={1}
                    onEndReachedThreshold={10}
                    enableEmptySections
                    style={styles.listStyle}
                    dataSource={this.state.dataSource}
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
    },
    listStyle: {
        alignSelf:'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    rowItem: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    leftStyle: {
        width: sr.w/2-15,
        alignItems: 'flex-end',
    },
    itemStyle: {
        width: 30,
        height: 60,
        alignItems: 'center',
    },
    viewStyle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    cicleStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    lineStyle: {
        width: 2,
        height: 20,
        backgroundColor: 'gray'
    },
    rightStyle: {
        width: sr.w/2-15,
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
    textFont: {
        fontSize: 10,
        color: 'gray'
    },
});
