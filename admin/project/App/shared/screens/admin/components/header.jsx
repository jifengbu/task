import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'ant-design';
import styles from './header.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class Header extends React.Component {
    state = {
        current: '-1',
    };
    selectMenuItem (current) {
        this.setState({ current });
    }
    handleMenuClick (e) {
        this.setState({ current: e.key });
        this.props.selectSidebarMenuItem('-1');
    }
    render () {
        const { current } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src='/img/common/logo.png' className={styles.head} />
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>
                            贵州单用途预付卡管理平台
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <img className={styles.head_image} src='/img/common/head_image.png' />
                    <Menu className={styles.menu} mode='horizontal' selectedKeys={[current]} onClick={::this.handleMenuClick}>
                        <MenuItem key='0'>
                            <Link to='/admin/notify'>
                                新消息
                            </Link>
                        </MenuItem>
                        <MenuDivider key={'_0'} className={styles.line} />
                        <MenuItem key='1'>
                            <Link to='/admin/applyPublishCard'>
                                申请发卡
                            </Link>
                        </MenuItem>
                        <MenuDivider key={'_1'} className={styles.line} />
                        <MenuItem key='2'>
                            <Link to='/admin/feedback'>
                                意见反馈
                            </Link>
                        </MenuItem>
                        <MenuDivider key={'_2'} className={styles.line} />
                        <MenuItem key='3'>
                            <a href='/admin/logout'>
                                退出
                            </a>
                        </MenuItem>
                    </Menu>
                    <div className={styles.company}>
                        贵州信合融通信息产业有限公司
                    </div>
                </div>
            </div>
        );
    }
}
