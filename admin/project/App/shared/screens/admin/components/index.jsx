import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

import styles from './index.less';

export default class App extends React.Component {
    static fragments = Header.fragments;
    selectSidebarMenuItem (current) {
        this.refs.sidebar.selectMenuItem(current);
    }
    selectHeaderMenuItem (current) {
        this.refs.header.selectMenuItem(current);
    }
    render () {
        const { personal } = this.props;
        return (
            <div className={styles.container}>
                <Sidebar ref='sidebar' selectHeaderMenuItem={::this.selectHeaderMenuItem} />
                <Header ref='header' personal={personal} selectSidebarMenuItem={::this.selectSidebarMenuItem} />
                <div className={styles.main}>
                    <div className={styles.content}>
                        {this.props.children}
                        <img className={styles.right_bottom} src='/img/common/right_bottom.png' />
                    </div>
                </div>
            </div>
        );
    }
}
