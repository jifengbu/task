import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import verification from 'helpers/verification';
import { Button, Modal, Form, Row, Col, Input, Icon, Spin, Select, InputNumber, Upload, notification } from 'ant-design';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

@antd_form_create
export default class PartmentDetail extends React.Component {
    static fragments = {
        partment: {
            id: 1,
            name: 1,
            descript: 1,
            phoneList: 1,
            chargeMan: {
                name: 1,
                phone: 1,
                head: 1,
            },
            superior: {
                name: 1,
            },
            members: {
                name: 1,
                phone: 1,
                head: 1,
            },
            subors: {
                name: 1,
            },
        },
    };
    state = {
        waiting : false,
        editing: this.props.operType === 0,
        partment: _.cloneDeep(this.props.partment) || (this.props.operType === 0 ? {
            phoneList: [],
        } : {}),
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.operType === 1) {
            const { partment } = nextProps;
            if (!_.isEqual(partment, this.props.partment)) {
                this.setState({ partment: _.cloneDeep(partment) });
            }
        }
    }
    handleDelete (e) {
        const self = this;
        const { actions, history, partment, partmentId } = this.props;
        Modal.confirm({
            title: '提示',
            content: (
                <div className={styles.confirmContainer}>
                    确定删除部门 <span className={styles.confirmName}>{partment.name}</span> 吗？
                </div>
            ),
            okText: '确定',
            cancelText: '取消',
            onOk () {
                self.setState({ waiting: true });
                actions.removePartment(partmentId, (data) => {
                    self.setState({ waiting: false });
                    if (data.success) {
                        Modal.success({
                            content: '删除成功',
                            onOk () {
                                history.replace({ pathname: '/admin/partments' });
                            },
                        });
                    } else {
                        notification.error({ description: data.msg });
                    }
                });
            },
        });
    }
    handleSubmit (e) {
        e.preventDefault();
        const { partment, editing } = this.state;
        if (editing) {
            const self = this;
            const { actions, form, history, operType, partmentId, partments } = this.props;
            const sumbit = operType === 0 ? actions.createPartment : actions.modifyPartment;
            form.validateFields((errors, value) => {
                if (errors) {
                    _.mapValues(errors, (item) => {
                        notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                    });
                    return;
                }
                for (const index in partment.phoneList) {
                    delete value['phone' + index];
                }
                value.phoneList = partment.phoneList;


                if (operType === 1) {
                    const originPartment = this.props.partment;
                    _.forIn(value, (v, k) => {
                        if (_.isEqual(originPartment[k], v)) {
                            delete value[k];
                        }
                    });
                    if (!_.keys(value).length) {
                        notification.error({ description: '信息没有任何改变，无需修改' });
                        self.setState({ editing: false });
                        return;
                    }
                    value.partmentId = partmentId;
                }

                self.setState({ waiting: true });
                sumbit(value, PartmentDetail.fragments.partment, (data) => {
                    self.setState({ waiting: false });
                    if (data.success) {
                        if (operType === 0) {
                            partments.partmentList.unshift(data.context);
                            partments.count++;
                        }
                        notification.success({ description:  (operType === 0 ? '创建' : '修改') + '成功' });
                        self.setState({ editing: false });
                        history.replace({ pathname: '/admin/partments' });
                    } else {
                        notification.error({ description: data.msg });
                    }
                });
            });
        } else {
            this.setState({ editing: true });
        }
    }
    addPhoneItem () {
        const { form } = this.props;
        const { partment, partment: { phoneList } } = this.state;

        phoneList.push('');
        for (const i in phoneList) {
            form.setFieldsValue({ ['descriptText' + i]:  phoneList[i].text || '' });
        }
        this.setState({ partment });
    }
    removePhoneItem (index) {
        const { partment } = this.state;
        partment.phoneList.splice(index, 1);
        this.setState({ partment });
    }
    handleTextChange (index, event) {
        const { partment } = this.state;
        partment.phoneList[index] = event.target.value;
        this.setState({ partment });
    }
    render () {
        const { form, operType } = this.props;
        const { current, waiting, editing, partment } = this.state;
        const { name, descript, phoneList = [], subors = [], members = [] } = partment;

        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const nameDecorator = getFieldDecorator('name', {
            initialValue: name,
            rules: [
                { required: true, message: '请填写部门名称' },
            ],
        });
        const descriptDecorator = getFieldDecorator('descript', {
            initialValue: descript,
        });
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const formItemInnerLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 },
        };
        const pagination = {
            total: members.length,
            showSizeChanger: false,
            current,
            pageSize: 3,
            onChange (current) {
                self.setState({ current });
            },
        };
        return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.cell}>部门信息</div>
                    <Button style={{ zIndex: 1000 }} type='ghost' onClick={::this.handleSubmit} loading={waiting}>{operType === 0 ? '发布' : !editing ? '修改' : '确认修改'}</Button>
                </div>
                <Form className={!editing ? styles.editForm : ''}>
                    <FormItem
                        {...formItemLayout}
                        label='部门名称:'
                        hasFeedback
                        >
                        {nameDecorator(
                            <Input disabled={!editing} placeholder='请输入部门名称' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='描述:'
                        hasFeedback
                        >
                        {descriptDecorator(
                            <Input disabled={!editing} type='textarea' rows={4} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='联系电话：'
                        hasFeedback
                        >
                        <div className={styles.iconButtonContainer}>
                        {
                            editing && phoneList.length < 3 &&
                            <FloatingActionButton className={styles.iconButton} onTouchTap={::this.addPhoneItem}>
                                <ContentAdd />
                            </FloatingActionButton>
                        }
                        </div>
                    </FormItem>
                    {
                        phoneList.map((item, i)=>(
                            <FormItem
                                key={i}
                                {...formItemInnerLayout}
                                label={`电话号码${i+1}`}
                                hasFeedback
                                >
                                <div className={styles.iconButtonContainer}>
                                    {
                                        editing &&
                                        <FloatingActionButton secondary className={styles.iconButton} onTouchTap={this.removePhoneItem.bind(this, i)}>
                                            <ContentDelete />
                                        </FloatingActionButton>
                                    }
                                    {getFieldDecorator('phone' + i, {
                                        initialValue: item || '',
                                        rules: [
                                            { required: true, message: '请填写电话号码' },
                                        ],
                                    })(
                                        <Input placeholder='请输入电话号码' onChange={this.handleTextChange.bind(this, i)} />
                                    )}
                                </div>
                            </FormItem>
                        ))
                    }
                </Form>
                {
                    editing && operType === 1 &&
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} type='primary' onClick={::this.handleDelete}>删 除</Button>
                    </div>
                }
            </div>
        );
    }
}
