'use strict';
import React from 'react';
import Echarts from 'echarts-for-react';
import styles from './index.less';
import { toThousands } from 'helpers/utils';

export default class AgePanel extends React.Component {
    render () {
        const { today, past, remain } = this.props.data;
        const sections = [
            { name: '今日发卡数', count: toThousands(today), color: '#008fe3' },
            { name: '往日已发卡数', count: toThousands(past), color: '#8bd6c5' },
            { name: '剩余发卡数', count: toThousands(remain), color: '#00a680' },
        ];
        const option = {
            series: [{
                name: '发卡数量',
                type: 'pie',
                radius : '60%',
                data: [ { value:today, name:'今日发卡数' },
                { value:past, name:'往日已发卡数' },
                { value:remain, name:'剩余发卡数' }],
            }],
        };
        return (
            <div className={styles.container}>
                <Echarts
                    option={option}
                    style={{ height: '300px', width: '500px' }}
                    />
                <div className={styles.bottomView}>
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
