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
        const data = [1,2,3,4,5];//this.props.data;
        const option = {
            grid: {
                left: '5%',
                right: '6%',
                top: '3%',
                containLabel: true,
            },
            // title : {
            //     text: '世界人口总量',
            //     subtext: '数据来自网络'
            // },
            // tooltip : {
            //     trigger: 'axis'
            // },
            // legend: {
            //     data:['2011年', '2012年']
            // },
            // toolbox: {
            //     // show : true,
            //     feature : {
            //         mark : {show: true},
            //         dataView : {show: true, readOnly: false},
            //         magicType: {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'value',
                    data : [0, 100],
                    show: false,
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['王小六','王小五','王小四','王小三','王晓易','王小二']
                }
            ],
            series : [
                {
                    name:'2011年',
                    type:'bar',
                    data:[50, 60, 70, 80, 90, 30],
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
            <Echarts option={option} height={238} />
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
