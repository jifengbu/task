import React from 'react';
import antd_form_create from 'decorators/antd_form_create';
import { Form, Table, Input, Button, Spin, Modal, InputNumber, Popconfirm, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import _ from 'lodash';
const FormItem = Form.Item;

@antd_form_create
export default class TaskTypes extends React.Component {
    static fragments = {
        taskTypes: {
            taskTypeList: {
                id: 1,
                key: 1,
                name: 1,
            },
        },
    };
    state = {
        waiting : false,
        modalVisible: false,
        modalTitle: '',
        record: {},
        operType: 0,
    }
    doAddTaskType() {
        this.setState({
            modalVisible: true,
            modalTitle: '创建类型',
            record: {},
            operType: 0,
        });
    }
    doModifyTaskType(record) {
        this.setState({
            modalVisible: true,
            modalTitle: '修改类型',
            record,
            operType: 1,
        });
    }
    doDeleteTaskType(record) {
        const self = this;
        const { actions, taskTypes = {} } = this.props;
        this.setState({ waiting: true });
        actions.removeTaskType(record.id, (data) => {
            if (data.success) {
                _.remove(taskTypes.taskTypeList, o=>o.id===record.id);
                Modal.success({
                    content: '删除成功',
                });
            } else {
                notification.error({ description: data.msg });
            }
            self.setState({ waiting: false });
        });
    }
    handleModalCancel() {
        this.setState({ modalVisible: false });
    }
    handleModalOk() {
        const self = this;
        const { actions, form, taskTypes = {} } = this.props;
        const { operType, record } = this.state;
        const sumbit = operType === 0 ? actions.createTaskType : actions.modifyTaskType;
        form.validateFields((errors, value) => {
            if (errors) {
                _.mapValues(errors, (item) => {
                    notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                });
                return;
            }

            if (operType === 1) {
                _.forIn(value, (v, k) => {
                    if (_.isEqual(record[k], v)) {
                        delete value[k];
                    }
                });
                if (!_.keys(value).length) {
                    notification.error({ description: '信息没有任何改变，无需修改' });
                    return;
                }
                value.taskTypeId = record.id;
            }

            self.setState({ waiting: true });
            sumbit(value, {
                id: 1,
                key: 1,
                name: 1,
            }, (data) => {
                self.setState({ waiting: false });
                if (data.success) {
                    if (operType === 0) {
                        taskTypes.taskTypeList.push(data.context);
                    } else {
                        Object.assign(record, data.context);
                    }
                    notification.success({ description:  (operType === 0 ? '创建' : '修改') + '成功' });
                    self.setState({ modalVisible: false });
                } else {
                    notification.error({ description: data.msg });
                }
            });
        });
    }
    render () {
        const self = this;
        const { form, taskTypes = {}, loading, loadingPage } = this.props;
        const { waiting, modalVisible, modalTitle, record } = this.state;
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        const columns = [{
            title: '任务key值',
            dataIndex: 'key',
        }, {
            title: '任务名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            key: 'action',
            width: 360,
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.doModifyTaskType.bind(this, record)}>修改</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除这个类型吗?" onConfirm={this.doDeleteTaskType.bind(this, record)}>
                        <a href="#" style={{color: 'red'}}>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    任务类型
                    {
                        !loading &&
                        <div className={styles.iconAddContainer}>
                            <FloatingActionButton secondary className={styles.iconAdd} onTouchTap={::this.doAddTaskType}>
                                <ContentAdd />
                            </FloatingActionButton>
                            <span className={styles.iconAddText}>
                                新增
                            </span>
                        </div>
                    }
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        pagination={false}
                        rowKey={(record, key) => key}
                        loading={loadingPage}
                        columns={columns}
                        dataSource={taskTypes.taskTypeList}
                        />
                </div>
                {
                    modalVisible &&
                    <Modal title={modalTitle} visible={true} className={styles.modal} onCancel={::this.handleModalCancel} onOk={::this.handleModalOk}>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label='类型key值'
                                hasFeedback
                                >
                                {getFieldDecorator('key', {
                                    initialValue: record.key,
                                    rules: [
                                        { required: true, message: '请填写类型key值' },
                                    ],
                                })(
                                    <Input placeholder='请输入类型key值' />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='类型名称'
                                hasFeedback
                                >
                                {getFieldDecorator('name', {
                                    initialValue: record.name,
                                    rules: [
                                        { required: true, message: '请填写类型名称' },
                                    ],
                                })(
                                    <Input placeholder='请输入类型名称' />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                }
            </div>
        );
    }
}
