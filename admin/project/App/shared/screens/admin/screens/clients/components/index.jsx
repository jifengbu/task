import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table, Input, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import _ from 'lodash';
const Search = Input.Search;

const columns = [{
    title: '头像',
    width: 80,
    dataIndex: 'head',
    render: (data) => <img src={data || '/img/common/default_head.png'} className={styles.head} />,
}, {
    title: '姓名',
    width: 120,
    dataIndex: 'name',
    render: (data) => data||'未知',
}, {
    title: '电话',
    width: 150,
    dataIndex: 'phone',
}, {
    title: '邮箱',
    width: 250,
    dataIndex: 'email',
    render: (data) => data||'未知',
}, {
    title: '预留电话',
    dataIndex: 'reservePhone',
    render: (data) => (data || {}).join('; ')||'无',
}];

export default class Clients extends React.Component {
    static fragments = {
        clients: {
            count: 1,
            clientList: {
                id: 1,
                head: 1,
                name: 1,
                phone: 1,
                email: 1,
                reservePhone: 1,
            },
        },
    };
    state = { current: this.props.lastCurrent || 1, keyword: '' }
    onRowClick (record, index) {
        const { relate, history, clients } = this.props;
        const { current } = this.state;
        relate.setKeepData({ lastSelectIndex: index, lastCurrent: current });
        history.push({ pathname: '/admin/clients/detail', state: { operType: 1, clientId: record.id, record, clients } });
    }
    rowClassName (record, index) {
        const { lastCurrent, lastSelectIndex } = this.props;
        const { current } = this.state;
        return current === lastCurrent && lastSelectIndex === index ? styles.selected : '';
    }
    onSearch (keyword) {
        const { getClients } = this.props;
        this.setState({ current: 1, keyword });
        getClients(keyword);
    }
    showCreateClient () {
        const { relate, history, clients } = this.props;
        relate.setKeepData(true);
        history.push({ pathname: '/admin/clients/detail', state: { operType: 0, clients } });
    }
    render () {
        const self = this;
        const { current, keyword } = this.state;
        const { clients = {}, loadListPage, loading, loadingPage } = this.props;
        const pagination = {
            total: clients.count,
            showSizeChanger: false,
            current,
            pageSize: 3,
            onChange (current) {
                self.setState({ current });
                loadListPage(keyword, current - 1);
            },
        };
        return (
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    {
                        loading ?
                            <div style={{ textAlign:'center' }}>
                                <Spin />
                                <div>正在查找...</div>
                            </div>
                        :
                            <Search placeholder='输入关键字查找' onSearch={::this.onSearch} />
                    }
                    {
                        !loading &&
                        <div className={styles.iconAddContainer}>
                            <FloatingActionButton secondary className={styles.iconAdd} onTouchTap={::this.showCreateClient}>
                                <ContentAdd />
                            </FloatingActionButton>
                            <span className={styles.iconAddText}>
                                添加成员
                            </span>
                        </div>
                    }
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        bordered
                        rowKey={(record, key) => key}
                        loading={loadingPage}
                        columns={columns}
                        dataSource={clients.clientList}
                        pagination={pagination}
                        rowClassName={::this.rowClassName}
                        onRowClick={::this.onRowClick}
                        />
                </div>
            </div>
        );
    }
}
