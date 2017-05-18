'use strict';
import React from 'react';
import Echarts from 'echarts-for-react';
import styles from './index.less';
import { toThousands, getPercentages } from 'helpers/utils';

export default class AgePanel extends React.Component {
    render () {
        const { today, week, month } = this.props.data;
        const optionToday = {
            title: {
                text: '今日消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['8', '10', '12', '14', '16', '18', '20', '22', '24'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: today,
            }],
        };
        const optionWeek = {
            title: {
                text: '本周消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: week,
            }],
        };
        const optionMonth = {
            title: {
                text: '本月消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['上旬', '中旬', '下旬'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: month,
            }],
        };
        return (
            <div className={styles.container}>
                <Echarts
                    option={optionToday}
                    style={{ height: '300px', width: '600px' }}
                    />
                <Echarts
                    option={optionWeek}
                    style={{ height: '300px', width: '600px' }}
                    />
                <Echarts
                    option={optionMonth}
                    style={{ height: '300px', width: '600px' }}
                    />
            </div>
        );
    }
}
