import React from 'react';
import { Table, Input, Button, Spin, Modal, Tabs, InputNumber, notification } from 'ant-design';
import CardPanel from './card';
import AgePanel from './age';
import styles from './index.less';
import SexPanel from './sex';
import ConsumePanel from './consume';
const TabPane = Tabs.TabPane;

const statistics = {
    releaseCardInfo: {
        today: 100,
        past: 10000,
        remain: 100000,
    },
    consumeInfo: {
        today: [5, 20, 36, 10, 10, 20, 5, 20, 36],
        week: [5, 20, 36, 10, 10, 20, 5],
        month: [5, 20, 36],
    },
    userSexInfo: {
        male: 1000,
        female: 5000,
    },
    userAgeInfo: [5, 20, 36, 10, 10, 20, 10, 20],
};

export default class Statistics extends React.Component {
    state = { activeType: 'card' }
    onTabsChange (key) {
        this.setState({ activeType: key });
    }
    render () {
        const { activeType } = this.state;
        return (
            <div className={styles.container}>
                <Tabs type='card' onChange={::this.onTabsChange} activeKey={activeType}>
                    <TabPane tab='发卡信息' key='card'>
                        <CardPanel data={statistics.releaseCardInfo} />
                    </TabPane>
                    <TabPane tab='消费信息' key='consume'>
                        <ConsumePanel data={statistics.consumeInfo} />
                    </TabPane>
                    <TabPane tab='用户性别' key='sex'>
                        <SexPanel data={statistics.userSexInfo} />
                    </TabPane>
                    <TabPane tab='用户年龄层' key='age'>
                        <AgePanel data={statistics.userAgeInfo} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
