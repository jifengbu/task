import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table, Input, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import _ from 'lodash';
const Search = Input.Search;

const columns = [{
    title: '头像',
    width: 50,
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
    width: 300,
    dataIndex: 'reservePhone',
    render: (data) => (data || {}).join('; ')||'无',
}];

export default class SelectClient extends React.Component {
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
    state = { keyword: '', selectedId: this.props.selectedId }
    componentWillReceiveProps (nextProps) {
        if (this.props.selectedId != nextProps.selectedId) {
            this.setState({ selectedId:  nextProps.selectedId });
        }
    }
    onSearch (keyword) {
        const { refresh } = this.props;
        this.setState({ current: 1, keyword });
        refresh(keyword);
    }
    render () {
        const self = this;
        const { current, keyword, selectedId } = this.state;
        const { clients = {}, loadListPage, loading, loadingPage, onSelect } = this.props;
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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedId ? [ selectedId ] : [],
            onSelect (record) {
                self.setState({ selectedId: record.id });
                onSelect(record);
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
                            <Search className={styles.search} placeholder='输入关键字查找' onSearch={::this.onSearch} />
                    }
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        rowKey={(record) => record.id}
                        loading={loadingPage}
                        columns={columns}
                        dataSource={clients.clientList}
                        pagination={pagination}
                        rowSelection={rowSelection} />
                </div>
            </div>
        );
    }
}
