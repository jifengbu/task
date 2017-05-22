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
                    data:[
                        {value:3350, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                    ],
                }
            ],
        };
        return (
            <View style={styles.container}>
                <Echarts
                    option={option}
                    height={165}
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
