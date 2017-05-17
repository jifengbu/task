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
        const option = {
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
                    // show: false,
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['巴西','印尼','美国','印度','中国']
                }
            ],
            series : [
                {
                    name:'2011年',
                    type:'bar',
                    data:[50, 60, 70, 80, 90],
                    itemStyle: {normal: {
                        label : {show: true, position: 'right'},
                        color: function(params) {
                               // build a color map as your need.
                               var colorList = [
                                 '#EC3E1F','#38C1B4',
                               ];
                               return colorList[params.dataIndex%2]
                           },
                    }},
                },
            ]
        };
        return (
            <Echarts option={option} height={250} />
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
