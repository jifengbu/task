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
    render () {
        const data = this.props.data;
        const date = this.props.date;
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
                data: [1,2,3,4],
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
                    textStyle: {
                        color: '#AEAEAE',
                    },
                },
            },
            series: [{
                name: '销量',
                type: 'bar',
                barWidth: '40%',
                data: ['11', '22', '33', '44'],
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
                    data : [
                       { name: '当前', xAxis: 11, yAxis:22 },
                    ],
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
