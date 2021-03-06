import React, { PropTypes } from 'react';
import styles from './index.less';

export default class Home extends React.Component {
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.centerContainer}>
                    <div className={styles.leftContainer}>
                        <img className={styles.logo} src='/img/common/logo.png' />
                        <div>
                            <span className={styles.leftText1}>欢迎使用</span>
                            <span className={styles.leftText2}> 经开区任务根据提醒管理平台 </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
