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
        const title = this.props.title;
        const colors = ['#f03b0a', '#00c6bb'];
        const data = this.props.data;
        let dataArray = [];
        if (data) {
            let num = (data.finish*1+data.unfinish*1) ==0?0:Math.round(data.finish*100/(data.finish*1+data.unfinish*1));
            let unNum = (data.finish*1+data.unfinish*1)==0?0:Math.round(data.unfinish*100/(data.finish*1+data.unfinish*1));
            dataArray = [{name:'完成'+num+'%',value: this.props.data.finish},{name:'未完成'+unNum+'%',value:this.props.data.unfinish}];
        }
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
            label: {
                normal: {
                    textStyle: {
                        fontSize: 9,
                        color: '#727272'
                    },
                }
            },
            color:colors,
            calculable : true,
            series : [
                {
                    name:'pie',
                    type:'pie',
                    radius : ['30%','60%'],
                    center: ['50%', '60%'],
                    data:dataArray,
                }
            ],
        };
        return (
            <View style={styles.container}>
                <Echarts
                    option={option}
                    height={sr.rs(165)}
                    width={sr.w} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
