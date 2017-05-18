import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Button, Icon } from 'ant-design';
import styles from './sidebar.less';
import menudata from 'config/menu';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class Sidebar extends React.Component {
    state = {
        current: '0',
        openKeys: [],
    };
    selectMenuItem (current) {
        this.setState({ current });
    }
    handleClick (e) {
        this.setState({ current: e.key });
        this.props.selectHeaderMenuItem('-1');
    }
    onOpenChange (openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys (key) {
        const list = key.split('_');
        if (list.length < 2) {
            return [];
        }
        let lastAncestor = list[0];
        const ancestor = [lastAncestor];
        for (let i = 1, len = list.length - 1; i < len; i++) {
            lastAncestor = `${lastAncestor}_${list[i]}`;
            ancestor.push(lastAncestor);
        }
        return ancestor;
    }
    showMenuItem (data, key) {
        return data.map((item, i) => {
            const newkey = key !== undefined ? key + '_' + i : i;
            if (item === '-') {
                return <MenuDivider key={newkey} className={styles.divider} />;
            }
            const { label, icon, link, child } = item;
            if (!child) {
                return (
                    <MenuItem key={newkey} className={styles.menuItem}>
                        <Link to={link} className={styles.menu_button}>{label}</Link>
                    </MenuItem>
                );
            } else {
                return (
                    <SubMenu key={newkey} title={<span>{icon && <Icon type={icon} />}{label}</span>}>
                        {this.showMenuItem(child, newkey)}
                    </SubMenu>
                );
            }
        });
    }
    render () {
        const { openKeys, current } = this.state;
        return (
            <aside className={styles.sider}>
                <div className={styles.siderInner}>
                    <Menu
                        className={styles.menu}
                        onClick={::this.handleClick}
                        openKeys={openKeys}
                        onOpenChange={::this.onOpenChange}
                        selectedKeys={[current]}
                        mode='inline'
                        >
                        {this.showMenuItem(menudata)}
                    </Menu>
                </div>
            </aside>
        );
    }
}
