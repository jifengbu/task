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
}, {
    title: '下属单位个数',
    dataIndex: 'suborsNum',
}];

export default class Partments extends React.Component {
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
    state = { current: this.props.lastCurrent || 1, keyword: '' }
    onRowClick (record, index) {
        const { relate, history, partments } = this.props;
        const { current } = this.state;
        relate.setKeepData({ lastSelectIndex: index, lastCurrent: current });
        history.push({ pathname: '/admin/partments/detail', state: { operType: 1, partmentId: record.id, record, partments } });
    }
    rowClassName (record, index) {
        const { lastCurrent, lastSelectIndex } = this.props;
        const { current } = this.state;
        return current === lastCurrent && lastSelectIndex === index ? styles.selected : '';
    }
    onSearch (keyword) {
        const { getPartments } = this.props;
        this.setState({ current: 1, keyword });
        getPartments(keyword);
    }
    showCreatePartment () {
        const { relate, history, partments } = this.props;
        relate.setKeepData(true);
        history.push({ pathname: '/admin/partments/detail', state: { operType: 0, partments } });
    }
    render () {
        const self = this;
        const { current, keyword } = this.state;
        const { partments = {}, loadListPage, loading, loadingPage } = this.props;
        const pagination = {
            total: partments.count,
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
                            <FloatingActionButton secondary className={styles.iconAdd} onTouchTap={::this.showCreatePartment}>
                                <ContentAdd />
                            </FloatingActionButton>
                            <span className={styles.iconAddText}>
                                新增部门
                            </span>
                        </div>
                    }
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        rowKey={(record, key) => key}
                        loading={loadingPage}
                        columns={columns}
                        expandedRowRender={record => <p>{record.descript}</p>}
                        dataSource={partments.partmentList}
                        pagination={pagination}
                        rowClassName={::this.rowClassName}
                        onRowClick={::this.onRowClick}
                        />
                </div>
            </div>
        );
    }
}
