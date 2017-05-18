'use strict';
import React from 'react';
import Echarts from 'echarts-for-react';
import styles from './index.less';
import { toThousands, getPercentages } from 'helpers/utils';

export default class AgePanel extends React.Component {
    render () {
        const { data } = this.props;
        const percentages = getPercentages(data);
        const sections = [
            { name: '10岁以下', count: toThousands(data[0]), percentage: percentages[0], color: '#008fe3' },
            { name: '10-20岁', count: toThousands(data[1]), percentage: percentages[1], color: '#8bd6c5' },
            { name: '20-30岁', count: toThousands(data[2]), percentage: percentages[2], color: '#00a680' },
            { name: '30-40岁', count: toThousands(data[3]), percentage: percentages[3], color: '#008fe3' },
            { name: '40-50岁', count: toThousands(data[4]), percentage: percentages[4], color: '#8bd6c5' },
            { name: '50-60岁', count: toThousands(data[5]), percentage: percentages[5], color: '#00a680' },
            { name: '60-70岁', count: toThousands(data[6]), percentage: percentages[6], color: '#008fe3' },
            { name: '70岁以上', count: toThousands(data[7]), percentage: percentages[7], color: '#8bd6c5' },
        ];
        const option = {
            xAxis: {
                type : 'category',
                data: ['10', '20', '30', '40', '50', '60', '70', '70+'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            grid: {
                top: '5%',
                bottom: '5%',
                containLabel: true,
            },
            yAxis: {
                type : 'value',
            },
            series: [{
                barWidth: '60%',
                type: 'bar',
                data,
            }],
        };
        return (
            <div className={styles.container}>
                <Echarts
                    option={option}
                    style={{ height: '350px', width: '800px' }}
                    />
                <div className={styles.bottomView} style={{ marginLeft:50 }}>
                    {
                        sections.map((item, i) => {
                            return (
                                <div key={i} className={styles.itemView}>
                                    <div className={styles.leftView}>
                                        <span className={styles.littleView} style={{ marginLeft:3, width: 20 }}>
                                            {i + 1}
                                        </span>
                                        <div className={styles.squirView} style={{ backgroundColor: item.color }} />
                                        <span className={styles.littleView}>
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className={styles.littleView}>
                                        {item.percentage}
                                    </span>
                                    <span className={styles.littleViews} tyle={{ marginRight: 39 }}>
                                        {item.count}
                                    </span>
                                    <div className={styles.lineView} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
