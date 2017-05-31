import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import verification from 'helpers/verification';
import { Table, Button, Modal, Form, Row, Col, Input, Icon, Spin, Select, InputNumber, Upload, Popconfirm, notification } from 'ant-design';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SelectClient from 'components/SelectClient';
import SelectPartment from 'components/SelectPartment';
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

@antd_form_create
export default class ClientDetail extends React.Component {
    static fragments = {
        client: {
            id: 1,
            head: 1,
            name: 1,
            phone: 1,
            email: 1,
            reservePhone: 1,
            age: 1,
            sex: 1,
            birthday: 1,
            authority: 1,
            partment: {
                id: 1,
                name: 1,
                descript: 1,
                chargeMan: {
                    phone: 1,
                    name: 1,
                    head: 1,
                },
                superior: {
                    name: 1,
                },
                phoneList: 1,
                membersNum: 1,
                suborsNum: 1,
            },
        },
    };
    state = {
        waiting : false,
        partmentModalVisible: false,
        hasPartmentOkButton: false,
        partmentTitle: '',
        editing: this.props.operType === 0,
        client: _.cloneDeep(this.props.client || {}),
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.operType === 1) {
            const { client } = nextProps;
            if (!_.isEqual(client, this.props.client)) {
                this.setState({ client: _.cloneDeep(client) });
            }
        }
    }
    handleEditCancel(e) {
        e.preventDefault();
        const self = this;
        const { client } = this.props;
        Modal.confirm({
            title: '提示',
            content: (
                <div className={styles.confirmContainer}>
                    确定取消修改吗？
                </div>
            ),
            okText: '确定',
            cancelText: '取消',
            onOk () {
                self.setState({client: _.cloneDeep(client), editing: false});
            },
        });
    }
    handleDelete (e) {
        const self = this;
        const { actions, history, client, clientId } = this.props;
        Modal.confirm({
            title: '提示',
            content: (
                <div className={styles.confirmContainer}>
                    确定删除部门 <span className={styles.confirmName}>{client.name}</span> 吗？
                </div>
            ),
            okText: '确定',
            cancelText: '取消',
            onOk () {
                self.setState({ waiting: true });
                actions.removeClient(clientId, (data) => {
                    self.setState({ waiting: false });
                    if (data.success) {
                        Modal.success({
                            content: '删除成功',
                            onOk () {
                                history.replace({ pathname: '/admin/clients' });
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
        const { client, editing } = this.state;
        if (editing) {
            const self = this;
            const { actions, form, history, operType, clientId, clients } = this.props;
            const sumbit = operType === 0 ? actions.createClient : actions.modifyClient;
            form.validateFields((errors, value) => {
                if (errors) {
                    _.mapValues(errors, (item) => {
                        notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                    });
                    return;
                }

                value.authority = value.authority*1;
                value.partment = (client.partment || {}).id;
                if (operType === 1) {
                    const temp = this.props.client;
                    const origin = {
                        ...temp,
                        partment: (temp.partment || {}).id,
                    };

                    _.forIn(value, (v, k) => {
                        if (_.isEqual(origin[k], v)) {
                            delete value[k];
                        }
                    });
                    if (!_.keys(value).length) {
                        notification.error({ description: '信息没有任何改变，无需修改' });
                        self.setState({ editing: false });
                        return;
                    }
                    value.clientId = clientId;
                }

                self.setState({ waiting: true });
                sumbit(value, {
                    id: 1,
                    head: 1,
                    name: 1,
                    phone: 1,
                    email: 1,
                    reservePhone: 1,
                    authority: 1,
                    partment: {
                        name: 1,
                    },
                }, (data) => {
                    self.setState({ waiting: false });
                    if (data.success) {
                        if (operType === 0) {
                            clients.clientList.unshift(data.context);
                            clients.count++;
                        }
                        notification.success({ description:  (operType === 0 ? '创建' : '修改') + '成功' });
                        self.setState({ editing: false });
                        history.replace({ pathname: '/admin/clients' });
                    } else {
                        notification.error({ description: data.msg });
                    }
                });
            });
        } else {
            this.setState({ editing: true });
        }
    }
    showSelectPartment(type) {
        const { partment = {} } = this.state.client||{};
        this.setState({
            hasPartmentOkButton: false,
            partmentModalVisible: true,
            partmentTitle: '部门',
            selectedPartmentId: partment.id,
        });
    }
    handleSelectPartmentCancel () {
        this.setState({ partmentModalVisible: false });
    }
    onSelectPartment(partment) {
        const { selectedPartmentId, hasPartmentOkButton } = this.state;
        this.tempPartment = partment;
        if (!hasPartmentOkButton && selectedPartmentId !== partment.id) {
            this.setState({hasPartmentOkButton : true});
        }
    }
    handleSelectPartmentOk () {
        const { client } = this.state;
        client.partment = this.tempPartment;
        this.setState({ client, partmentModalVisible: false });
    }
    render () {
        const self = this;
        const { form, operType } = this.props;
        const { waiting, editing, client, partmentModalVisible, hasPartmentOkButton, partmentTitle, selectedPartmentId } = this.state;
        const { name, phone, authority = 1, partment, birthday, head, email, age, sex, reservePhone } = client;
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const nameDecorator = getFieldDecorator('name', {
            initialValue: name,
            rules: [
                { required: true, message: '请填写姓名' },
            ],
        });
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true, message: '请填写电话' },
            ],
        });
        const authorityDecorator = getFieldDecorator('authority', {
            initialValue: authority+'',
            rules: [
                { required: true, message: '请选择该用户拥有的权限' },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        };
        const formItemTableLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        };
        return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.cell}>部门信息</div>
                    <div style={{ zIndex: 1000}}>
                        { operType === 1 && editing &&  <Button style={{ marginRight: 10 }} type='ghost' onClick={::this.handleEditCancel} loading={waiting}>取消修改</Button>}
                        <Button type='ghost' onClick={::this.handleSubmit} loading={waiting}>{operType === 0 ? '发布' : !editing ? '修改' : '确认修改'}</Button>
                    </div>
                </div>
                <Form className={!editing ? styles.editForm : ''}>
                    <FormItem
                        {...formItemLayout}
                        label='头像'
                        >
                        <img src={head ? head : '/img/common/default_head.png'} className={styles.head} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='姓名'
                        hasFeedback
                        >
                        {editing ? nameDecorator(
                            <Input placeholder='请输入姓名' />
                        ) : <span className={styles.value}>{name}</span>}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='电话'
                        hasFeedback
                        >
                        {editing ? phoneDecorator(
                            <Input placeholder='请输入电话' />
                        ) : <span className={styles.value}>{phone}</span>}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='拥有权限'
                        hasFeedback
                        >
                        {editing ? authorityDecorator(
                            <Select placeholder='请选择该用户拥有的权限'>
                                <Option value='1'>普通权限</Option>
                                <Option value='2'>拥有领导权限</Option>
                                <Option value='4'>拥有综合部权限</Option>
                                <Option value='8'>拥有监督者权限</Option>
                            </Select>
                        ) : <span className={styles.value}>{{1: '普通权限', 2: '拥有领导权限', 4: '拥有综合部权限', 8: '拥有监督者权限'}[authority]||'普通权限'}</span>}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='邮箱'
                        >
                        <span className={styles.value}>{email}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='年龄'
                        >
                        <span className={styles.value}>{age}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='生日'
                        >
                        <span className={styles.value}>{birthday}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='性别'
                        >
                        <span className={styles.value}>{sex===0 ? '男' : '女'}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='领导'
                        >
                        {
                            !!partment  && (
                                <div className={styles.iconButtonContainer}>
                                    <img src={partment.chargeMan.head ? partment.chargeMan.head : '/img/common/default_head.png'} className={styles.head} />
                                    <span className={styles.value}>{`${partment.chargeMan.name} ( ${partment.chargeMan.phone} )`}</span>
                                </div>
                            ) ||  '无'
                        }
                    </FormItem>
                    <FormItem
                        {...formItemTableLayout}
                        label='所在部门'
                        >
                        <div className={styles.iconButtonContainer}>
                            {
                                editing &&
                                <FloatingActionButton className={styles.iconButton} onTouchTap={::this.showSelectPartment}>
                                    <EditorModeEdit />
                                </FloatingActionButton>
                            }
                            {
                                !!partment  && (
                                    <span className={styles.value}>
                                        <span>{partment.name}</span>
                                        <span style={{marginLeft: 20}}>{`联系电话：${partment.phoneList.join(';')}`}</span>
                                        <span style={{marginLeft: 20}}>{`负责人：${partment.chargeMan ? (partment.chargeMan.name ? partment.chargeMan.name + '(' + partment.chargeMan.phone + ')' : partment.chargeMan.phone) : ''}`}</span>
                                    </span>
                                ) || '无'
                            }
                        </div>
                    </FormItem>
                </Form>
                {
                    editing && operType === 1 &&
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} type='primary' onClick={::this.handleDelete}>删 除</Button>
                    </div>
                }
                {
                    partmentModalVisible &&
                    <Modal title={'选择' + partmentTitle} visible={true} className={hasPartmentOkButton ? styles.clientModal : styles.clientModalNoButton} onCancel={::this.handleSelectPartmentCancel} onOk={::this.handleSelectPartmentOk}>
                        <SelectPartment onSelect={::this.onSelectPartment} selectedId={selectedPartmentId}/>
                    </Modal>
                }
            </div>
        );
    }
}
