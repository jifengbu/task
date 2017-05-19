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
import { TextFormItem, NumberFormItem, SelectFormItem } from 'customs';
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
        }
    };
    state = {
        waiting : false,
        current: 1,
        suborCurrent: 1,
        clientModalVisible: false,
        hasClientOkButton: false,
        clientTitle: '',
        partmentModalVisible: false,
        hasPartmentOkButton: false,
        partmentTitle: '',
        editing: this.props.operType === 0,
        client: _.cloneDeep(this.props.client) || (this.props.operType === 0 ? {
            reservePhone: [],
        } : {}),
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
                console.log("============", value);
                return;
                for (const index in client.reservePhone) {
                    delete value['phone' + index];
                }
                value.reservePhone = client.reservePhone;
                if (!value.reservePhone.length) {
                    notification.error({ description: '请至少填写一个电话号码' });
                    return;
                }

                value.chargeMan = (client.chargeMan || {}).id;
                if (!value.chargeMan) {
                    notification.error({ description: '请选择部门负责人' });
                    return;
                }
                value.partment = (client.partment || {}).id;
                value.subors = (client.subors||[]).map((o)=>o.id);
                value.members = (client.members||[]).map((o)=>o.id);

                if (operType === 1) {
                    const temp = this.props.client;
                    const origin = {
                        ...temp,
                        partment: (temp.partment || {}).id,
                        chargeMan: (temp.chargeMan || {}).id,
                        subors:  (temp.subors||[]).map((o)=>o.id),
                        members: (temp.members||[]).map((o)=>o.id),
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
                    name: 1,
                    descript: 1,
                    reservePhone: 1,
                    chargeMan: {
                        name: 1,
                        phone: 1,
                    },
                    partment: {
                        name: 1,
                    },
                    membersNum: 1,
                    suborsNum: 1,
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
    handleDeleteSubor(index) {
        const { client } = this.state;
        client.subors.splice(index, 1);
        this.setState({ client });
    }
    handleDeleteMember(index) {
        const { client } = this.state;
        client.members.splice(index, 1);
        this.setState({ client });
    }
    addPhoneItem (index) {
        const { form } = this.props;
        const { client, client: { reservePhone } } = this.state;
        if (index === undefined) {
            reservePhone.push('');
        } else {
            reservePhone.splice(index, 0, '');
        }
        for (const i in reservePhone) {
            form.setFieldsValue({ ['descriptText' + i]:  reservePhone[i].text || '' });
        }
        this.setState({ client });
    }
    removePhoneItem (index) {
        const { client } = this.state;
        client.reservePhone.splice(index, 1);
        this.setState({ client });
    }
    handleTextChange (index, event) {
        const { client } = this.state;
        client.reservePhone[index] = event.target.value;
        this.setState({ client });
    }
    rowClassName (record, index) {
        const { lastCurrent, lastSelectIndex } = this.selectd||{};
        const { current } = this.state;
        return current === lastCurrent && lastSelectIndex === index ? styles.selected : '';
    }
    onRowClick (record, index) {
        const { current } = this.state;
        this.selectd = { lastSelectIndex: index, lastCurrent: current };
    }
    suborRowClassName (record, index) {
        const { lastCurrent, lastSelectIndex } = this.suborSelectd||{};
        const { suborCurrent } = this.state;
        return suborCurrent === lastCurrent && lastSelectIndex === index ? styles.selected : '';
    }
    onSuborRowClick (record, index) {
        const { suborCurrent } = this.state;
        this.suborSelectd = { lastSelectIndex: index, lastCurrent: suborCurrent };
    }
    showSelectClient(type) {
        this.clientType = type;
        const { chargeMan = {} } = this.state.client||{};
        this.setState({
            hasClientOkButton: false,
            clientModalVisible: true,
            clientTitle: type === 0 ? '负责人' : '部门成员',
            selectedClientId: type === 0 ? chargeMan.id : '',
        });
    }
    handleSelectClientCancel () {
        this.setState({ clientModalVisible: false });
    }
    onSelectClient(client) {
        const { selectedClientId, hasClientOkButton } = this.state;
        this.tempClient = client;
        if (!hasClientOkButton && selectedClientId !== client.id) {
            this.setState({hasClientOkButton : true});
        }
    }
    handleSelectClientOk () {
        const { client } = this.state;
        if (this.clientType === 0) {
            client.chargeMan = this.tempClient;
        } else {
            client.members.push(this.tempClient);
        }
        this.setState({ client, clientModalVisible: false });
    }
    showSelectPartment(type) {
        this.partmentType = type;
        const { partment = {} } = this.state.partment||{};
        this.setState({
            hasPartmentOkButton: false,
            partmentModalVisible: true,
            partmentTitle: type === 0 ? '上级部门' : '下属部门',
            selectedPartmentId: type === 0 ? partment.id : '',
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
        if (this.partmentType === 0) {
            client.partment = this.tempPartment;
        } else {
            client.subors.push(this.tempPartment);
        }
        this.setState({ client, partmentModalVisible: false });
    }
    render () {
        const self = this;
        const { form, operType } = this.props;
        const { current, waiting, editing, client, clientModalVisible, hasClientOkButton, clientTitle, selectedClientId, partmentModalVisible, hasPartmentOkButton, partmentTitle, selectedPartmentId } = this.state;
        const { name, phone, email, sex, age, head, birthday, reservePhone = [], salary, post, partment } = client;
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
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
                    <TextFormItem form={form} label='姓名' value={{name}} editing={editing} />
                    <TextFormItem form={form} label='手机号码' value={{phone}} editing={editing} />
                    <TextFormItem form={form} label='邮箱' value={{email}} editing={editing} />
                    <TextFormItem form={form} label='职位' value={{post}} editing={editing} />
                    <TextFormItem form={form} label='备注' rows={[2, 4]} value={{remark: ''}} editing={editing} required={false}/>
                    <NumberFormItem form={form} label='工资' value={{salary: 0}} unit='元' editing={editing} />
                    <TextFormItem form={form} label='年龄' value={{age: 60}} editing={editing} disabled/>
                    <SelectFormItem form={form} label='性别' value={{sex: 1}} options={{0: '男', 1: '女'}} editing={editing} />
                    {
                        !reservePhone.length &&
                        <FormItem
                            {...formItemLayout}
                            label='预留电话'
                            >
                            <div className={styles.iconButtonContainer}>
                            {
                                editing ?
                                <FloatingActionButton className={styles.iconButton} onTouchTap={::this.addPhoneItem}>
                                    <ContentAdd />
                                </FloatingActionButton>
                                :
                                <span className={styles.value}>无</span>
                            }
                            </div>
                        </FormItem>
                    }
                    {
                        reservePhone.map((item, i)=>(
                            <FormItem
                                key={i}
                                {...formItemLayout}
                                label={`预留电话${i+1}`}
                                hasFeedback
                                >
                                <div className={styles.iconButtonContainer}>
                                    {
                                        editing && reservePhone.length < 4 &&
                                        <FloatingActionButton className={styles.iconButton} onTouchTap={this.addPhoneItem.bind(this, i)}>
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    }
                                    {
                                        editing &&
                                        <FloatingActionButton secondary className={styles.iconButton} onTouchTap={this.removePhoneItem.bind(this, i)}>
                                            <ContentDelete />
                                        </FloatingActionButton>
                                    }
                                    {editing ? getFieldDecorator('phone' + i, {
                                        initialValue: item || '',
                                        rules: [
                                            { required: true, message: '请填写电话号码' },
                                        ],
                                    })(
                                        <Input placeholder='请输入电话号码' onChange={this.handleTextChange.bind(this, i)} />
                                    ) : <span className={styles.value}>{item}</span>}
                                </div>
                            </FormItem>
                        ))
                    }
                    <FormItem
                        {...formItemTableLayout}
                        label='部门'
                        >
                        <div className={styles.iconButtonContainer}>
                        {
                            editing &&
                                <FloatingActionButton className={styles.iconButton} onTouchTap={this.showSelectPartment.bind(this, 0)}>
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
                            ) || (
                                <span className={styles.value}>未设置</span>
                            )
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
                    clientModalVisible &&
                    <Modal title={'选择' + clientTitle} visible={true} className={hasClientOkButton ? styles.clientModal : styles.clientModalNoButton} onCancel={::this.handleSelectClientCancel} onOk={::this.handleSelectClientOk}>
                        <SelectClient onSelect={::this.onSelectClient} selectedId={selectedClientId}/>
                    </Modal>
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
