'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TextInput,
    TouchableOpacity,
} = ReactNative;

const Subscribable = require('Subscribable');
const HBarChart = require('./HBarChart.js');
const BarChart = require('./BarChart.js');
const PieChart = require('./PieChart.js');
import Swiper from 'react-native-swiper2';
const { Button } = COMPONENTS;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    onChangePage () {
        this.setState({});
    },
    render () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topView}>
                    <PieChart title={'任务完成率'}/>
                </View>
                <View style={styles.midView}>
                    {
                        <Swiper
                          paginationStyle={styles.paginationStyle}
                          dot={<View style={{ backgroundColor:'#E0E0E0', width: 6, height: 6, borderRadius: 3, marginLeft: 8, marginRight: 8 }} />}
                          activeDot={<View style={{ backgroundColor:'#FA4C50', width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8 }} />}
                          height={sr.rs(242)}
                          onChangePage={this.onChangePage}
                          loop={false}>
                          {
                              ['月任务完成比例', '季度任务完成比例', '年任务完成比例'].map((item, i) => {
                                  return (
                                      <View key={i} style={styles.heightView}>
                                          {
                                             <BarChart title={item}/>
                                          }
                                      </View>
                                  );
                              })
                          }
                      </Swiper>
                    }
                </View>
                <View style={styles.bottomView}>
                    {
                        <Swiper
                          paginationStyle={styles.paginationStyle}
                          dot={<View style={{ backgroundColor:'#E0E0E0', width: 6, height: 6, borderRadius: 3, marginLeft: 8, marginRight: 8 }} />}
                          activeDot={<View style={{ backgroundColor:'#FA4C50', width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8 }} />}
                          height={sr.rs(184)}
                          onChangePage={this.onChangePage}
                          loop={false}>
                          {
                              ['月任务完成比例', '季度任务完成比例', '年任务完成比例'].map((item, i) => {
                                  return (
                                      <View key={i} style={styles.heightView}>
                                          {
                                             <PieChart title={item}/>
                                          }
                                      </View>
                                  );
                              })
                          }
                      </Swiper>
                    }
                </View>
                <View style={styles.topView}>
                    <HBarChart />
                </View>
                <View style={styles.empty}/>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    topView: {
        width: sr.w,
        height: 165,
        marginTop: 2,
    },
    midView: {
        width: sr.w,
        height: 242,
        marginTop: 2,
        backgroundColor: '#FFFFFF'
    },
    bottomView: {
        marginTop: 2,
        width: sr.w,
        height: 184,
    },
    heightView: {
        height: 184,
        width: sr.w,
        backgroundColor: '#FFFFFF'
    },
    botView: {
        marginTop: 2,
        width: sr.w,
        height: 238,
    },
    empty: {
        width: sr.w,
        height: 60,
    },
    paginationStyle: {
        width: sr.w,
        bottom: 10,
    },
});
