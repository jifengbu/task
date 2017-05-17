'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
} = ReactNative;

import Echarts from 'native-echarts';

module.exports = React.createClass({
    render () {
        const sections = ['总商户数','我行商户'];//this.props.sections;
        const radios = ['50324','8984',];//this.props.radios;
        const numbers = [11,22,4,2]; //this.props.numbers;
        const colors = ['#C28BC4', '#F4715A', '#3076C7', '#AE3100', 'pink'];
        const option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '该区域POS比例',
                x:'center',
                y: 30,
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         mark : {show: true},
            //         dataView : {show: true, readOnly: false},
            //         magicType : {
            //             show: true,
            //             type: ['pie', 'funnel'],
            //             option: {
            //                 funnel: {
            //                     x: '25%',
            //                     width: '50%',
            //                     funnelAlign: 'left',
            //                     max: 1548
            //                 }
            //             }
            //         },
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            color:colors,
            calculable : true,
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '50%',
                    center: ['50%', '70%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                }
            ],
        };
        return (
            <View style={styles.container}>
                <View style={styles.chartViewTop}>
                    <Echarts
                        option={option}
                        height={300}
                        width={sr.w} />
                </View>
                <View style={styles.chartViewBottom}>
                    {
                         sections && sections.length > 0 &&
                         sections.map((item, i) => {
                             return (
                                 <View key={i} style={styles.itemView}>
                                     <View style={styles.leftView}>
                                         <Text style={[styles.littleView, { width:60 }]}>{sections[i]}</Text>
                                         <Text style={[styles.littleView, { width:50 }]}>{radios[i]}</Text>
                                     </View>
                                 </View>
                             );
                         })
                     }
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        height: sr.h,
        width: sr.w,
    },
    chartViewTop: {
        height: 300,
        width: sr.w,
    },
    chartViewBottom: {
        width: sr.w,
        alignItems:'center',
        justifyContent:'center',
    },
    itemView: {
        width: sr.w,
        height: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    littleView: {
        fontSize: 14,
        marginRight: 12,
        color: '#8e8e8e',
        fontFamily: 'STHeitiSC-Medium',
    },
});
