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
    getInitialState () {
        this.nameArr = [];
        return {
            dataDetail: null,
        };
    },
    componentDidMount() {
        this.getTaskTypeList();
    },
    getTaskTypeList() {
        const param = {
            userId: app.personal.info.userId,
        };
        POST(app.route.ROUTE_GET_TASK_TYPE_LIST, param, this.getPersonalInfoSuccess);
    },
    getPersonalInfoSuccess (data) {
        if (data.success) {
            let typeArr = [];
            let nameArr = [];
            const context = data.context;
            if (context) {
                for (var i = 0; i < context.taskTypeList.length; i++) {
                    typeArr.push(context.taskTypeList[i].key);
                    nameArr.push(context.taskTypeList[i].name);
                }
                this.nameArr = nameArr;
                this.getStatics(typeArr);
            }
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    getStatics(typeList) {
        const param = {
            userId: app.personal.info.userId,
            typeList: typeList,
        };
        POST(app.route.ROUTE_GET_STATICS, param, this.getStaticsSuccess);
    },
    getStaticsSuccess (data) {
        if (data.success) {
            const context = data.context;
            if (context) {
                this.setState({dataDetail: context});
            }
        }
    },
    render () {
        const { dataDetail } = this.state;
        let pieArr = [];
        let barArr = [];
        if (dataDetail) {
            pieArr = [dataDetail.finishTask.month,dataDetail.finishTask.quarter,dataDetail.finishTask.year];
            barArr = [dataDetail.publishTask.month,dataDetail.publishTask.quarter,dataDetail.publishTask.year];
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topView}>
                    {
                        dataDetail&&
                        <PieChart title={'任务完成率'} data={dataDetail.mywork}/>
                    }
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
                                             <BarChart title={item} data={barArr[i]} nama={this.nameArr}/>
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
                                             <PieChart title={item} data={pieArr[i]}/>
                                          }
                                      </View>
                                  );
                              })
                          }
                      </Swiper>
                    }
                </View>
                <View style={styles.topView}>
                    {
                        dataDetail&&
                        <HBarChart data={dataDetail.finishDetail}/>
                    }

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
