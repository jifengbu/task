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
        const { data } = this.props;
        let xData = [];
        let yData = [];
        let height = sr.rs(95);
        if (!!data) {
            for (var i = 0; i < data.length; i++) {
                let num = (data[i].unfinish*1+data[i].finish*1) ==0?0:Math.round(data[i].finish*100/(data[i].unfinish*1+data[i].finish*1));
                xData.push(data[i].name);
                yData.push(num);
            }
            height = sr.rs(95+data.length*25);
        }
        const option = {
            grid: {
                left: '5%',
                right: '10%',
                top: '15%',
                bottom: '5%',
                containLabel: true,
            },
            title : {
                text: '其他人任务完成比例',
                x:'center',
                y: 0,
                textStyle: {
                    color: 'gray',
                    fontSize: 12,
                }
            },
            xAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#DDDDDD',
                    },
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                        color: '#AEAEAE',
                    },
                },
            },
            yAxis: {
                name: '',
                data: xData,
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
            series : [
                {
                    name:'2011年',
                    type:'bar',
                    data:yData,
                    barWidth: '50%',
                    itemStyle: {normal: {
                        label : {show: true, position: 'right'},
                        color: function(params) {
                               // build a color map as your need.
                               var colorList = [
                                 '#bfe7ee','#ffe3e4',
                               ];
                               return colorList[params.dataIndex%2]
                           },
                    }},
                },
            ]
        };
        return (
            <Echarts option={option} height={height} />
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
