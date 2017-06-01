import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table, Input, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import _ from 'lodash';
const Search = Input.Search;

const columns = [{
    title: '部门名称',
    dataIndex: 'name',
}, {
    title: '联系电话',
    dataIndex: 'phoneList',
    render: (data) => data.join(';'),
}, {
    title: '负责人',
    dataIndex: 'chargeMan',
    render: (data) => data ? (data.name ? data.name + '(' + data.phone + ')' : data.phone) : '',
}, {
    title: '部门人数',
    dataIndex: 'membersNum',
}, {
    title: '上级单位',
    dataIndex: 'superior',
    render: (data) => data ? data.name: '',
}, {
    title: '下属单位个数',
    dataIndex: 'suborsNum',
}];

export default class SelectPartment extends React.Component {
    static fragments = {
        partments: {
            count: 1,
            partmentList: {
                id: 1,
                name: 1,
                descript: 1,
                phoneList: 1,
                chargeMan: {
                    name: 1,
                    phone: 1,
                },
                superior: {
                    name: 1,
                },
                membersNum: 1,
                suborsNum: 1,
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
        const { partments = {}, loadListPage, loading, loadingPage, onSelect } = this.props;
        const pagination = {
            total: partments.count,
            showSizeChanger: false,
            current,
            pageSize: 10,
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
                        dataSource={partments.partmentList}
                        pagination={pagination}
                        rowSelection={rowSelection} />
                </div>
            </div>
        );
    }
}
