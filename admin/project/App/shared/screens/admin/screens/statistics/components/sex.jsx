'use strict';
import React from 'react';
import Echarts from 'echarts-for-react';
import styles from './index.less';
import { toThousands } from 'helpers/utils';

export default class AgePanel extends React.Component {
    render () {
        const { male, female } = this.props.data;
        const malePercentage = Math.round(male * 100 / (male + female));
        const femalePercentage = 100 - malePercentage;
        const sections = [
            { name: '男', count: toThousands(male), percentage: malePercentage + '%', color: '#C23531' },
            { name: '女', count: toThousands(female), percentage: femalePercentage + '%', color: '#2F4554' },
        ];
        const option = {
            series: [{
                name: '性别比例',
                type: 'pie',
                radius : '70%',
                data: [
                    { value:male, name:'男' },
                    { value:female, name:'女' },
                ],
            }],
        };
        return (
            <div className={styles.container}>
                <Echarts
                    option={option}
                    style={{ height: '350px', width: '500px' }}
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
