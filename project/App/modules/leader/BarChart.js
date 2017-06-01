'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
} = ReactNative;

import Echarts from 'native-echarts';

module.exports = React.createClass({
    percent(data) {
        let num = 0;
        let sum = 0;
        let array = [];
        for (var i = 0; i < data.length; i++) {
            num += data[i]*1;
        }
        if (num == 0) {
            num = 1;
        }
        for (var i = 0; i < data.length-1; i++) {
            array.push(Math.round(data[i]*100/num));
            sum += Math.round(data[i]*100/num);
        }
        if (sum == 0) {
            array.push(0);
        } else {
            array.push(100-sum);
        }

        return array;
    },
    render () {
        const data = this.props.data;
        let numArr = [];
        if (!!data) {
            numArr = this.percent(data);
        }
        const name = this.props.name;
        const title = this.props.title;
        const option = {
            title : {
                text: title,
                x:'center',
                y: 5,
                textStyle: {
                    color: '#f03b0a',
                    fontSize: 12,
                }
            },
            grid: {
                left: '5%',
                right: '6%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                data: name,
                axisLine:{
                    lineStyle:{
                        color:'#DDDDDD',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#AEAEAE',
                    },
                },
            },
            yAxis: {
                name: '',
                axisLine:{
                    lineStyle:{
                        color:'#DDDDDD',
                    },
                },
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                        color: '#AEAEAE',
                    },
                },
            },
            series: [{
                name: '销量',
                type: 'bar',
                barWidth: '40%',
                data: numArr,
                itemStyle: {
                    normal: {
                        color:'#F8BDAD',
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                        },
                    },
                    emphasis: {
                        color: '#F6603C',
                    },
                },
                markPoint : {
                    itemStyle: {
                        normal: {
                            color:'#F6603C',
                        },
                    },
                },
            }],
        };
        return (
            <Echarts option={option} height={220} />
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6EBEC',
    },
});
