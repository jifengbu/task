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
export default class PartmentDetail extends React.Component {
    static fragments = {
        partment: {
            id: 1,
            name: 1,
            descript: 1,
            phoneList: 1,
            chargeMan: {
                id: 1,
                name: 1,
                phone: 1,
                head: 1,
                email: 1,
                reservePhone: 1,
            },
            superior: {
                id: 1,
                name: 1,
                descript: 1,
                phoneList: 1,
                chargeMan: {
                    name: 1,
                    phone: 1,
                }
            },
            members: {
                id: 1,
                name: 1,
                phone: 1,
                head: 1,
                email: 1,
                reservePhone: 1,
            },
            subors: {
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
    columns = [{
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
        render: (data) => data||'无',
    }, {
        title: '预留电话',
        width: 300,
        dataIndex: 'reservePhone',
        render: (data) => (data || []).join('; ')||'无',
    },  {
        title: '操作',
        width: 100,
        dataIndex: 'operation',
        render: (text, record, index) => (
            <Popconfirm title="确定要移除踢出成员吗?" onConfirm={this.handleDeleteMember.bind(this, index)}>
                <a href="#">踢出</a>
            </Popconfirm>
        ),
    }];
    suborColumns = [{
        title: '部门名称',
        dataIndex: 'name',
    }, {
        title: '联系电话',
        dataIndex: 'phoneList',
        render: (data) => (data||[]).join(';'),
    }, {
        title: '负责人',
        dataIndex: 'chargeMan',
        render: (data) => data ? (data.name ? data.name + '(' + data.phone + ')' : data.phone) : '',
    }, {
        title: '部门人数',
        dataIndex: 'membersNum',
    }, {
        title: '下属单位个数',
        dataIndex: 'suborsNum',
    }, {
        title: '操作',
        dataIndex: 'operation',
        width: 100,
        render: (text, record, index) => (
            <Popconfirm title="确定要踢出这个下属单位吗?" onConfirm={this.handleDeleteSubor.bind(this, index)}>
                <a href="#">踢出</a>
            </Popconfirm>
        ),
    }];
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
    handleEditCancel(e) {
        e.preventDefault();
        const self = this;
        const { partment, form } = this.props;
        const { name, plateNo, capacity, length, width, height, descriptList = [], remark } = partment;
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
                self.setState({partment: _.cloneDeep(partment), editing: false});
                const descriptTexts = {};
                descriptList.forEach((item, i)=>{ descriptTexts['descriptText'+i] = item.text })
                form.setFieldsValue({
                    name,
                    plateNo,
                    capacity,
                    length,
                    width,
                    height,
                    remark,
                    ...descriptTexts,
                });
            },
        });
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
                if (!value.phoneList.length) {
                    notification.error({ description: '请至少填写一个电话号码' });
                    return;
                }

                value.chargeMan = (partment.chargeMan || {}).id;
                if (!value.chargeMan) {
                    notification.error({ description: '请选择部门负责人' });
                    return;
                }
                value.superior = (partment.superior || {}).id;
                value.subors = (partment.subors||[]).map((o)=>o.id);
                value.members = (partment.members||[]).map((o)=>o.id);

                if (operType === 1) {
                    const temp = this.props.partment;
                    const origin = {
                        ...temp,
                        superior: (temp.superior || {}).id,
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
                    value.partmentId = partmentId;
                }

                self.setState({ waiting: true });
                sumbit(value, {
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
                }, (data) => {
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
    handleDeleteSubor(index) {
        const { partment } = this.state;
        partment.subors.splice(index, 1);
        this.setState({ partment });
    }
    handleDeleteMember(index) {
        const { partment } = this.state;
        partment.members.splice(index, 1);
        this.setState({ partment });
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
        const { chargeMan = {} } = this.state.partment||{};
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
        const { partment } = this.state;
        if (this.clientType === 0) {
            partment.chargeMan = this.tempClient;
        } else {
            partment.members.push(this.tempClient);
        }
        this.setState({ partment, clientModalVisible: false });
    }
    showSelectPartment(type) {
        this.partmentType = type;
        const { superior = {} } = this.state.partment||{};
        this.setState({
            hasPartmentOkButton: false,
            partmentModalVisible: true,
            partmentTitle: type === 0 ? '上级部门' : '下属部门',
            selectedPartmentId: type === 0 ? superior.id : '',
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
        const { partment } = this.state;
        if (this.partmentType === 0) {
            partment.superior = this.tempPartment;
        } else {
            partment.subors.push(this.tempPartment);
        }
        this.setState({ partment, partmentModalVisible: false });
    }
    render () {
        const self = this;
        const { form, operType } = this.props;
        const { current, waiting, editing, partment, clientModalVisible, hasClientOkButton, clientTitle, selectedClientId, partmentModalVisible, hasPartmentOkButton, partmentTitle, selectedPartmentId } = this.state;
        const { name, descript, phoneList = [], superior, subors = [], members = [], chargeMan = {} } = partment;

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
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        };
        const formItemInnerLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        const formItemTableLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
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
        const suborPagination = {
            total: subors.length,
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
                    <div style={{ zIndex: 1000}}>
                        { operType === 1 && editing &&  <Button style={{ marginRight: 10 }} type='ghost' onClick={::this.handleEditCancel} loading={waiting}>取消修改</Button>}
                        <Button type='ghost' onClick={::this.handleSubmit} loading={waiting}>{operType === 0 ? '发布' : !editing ? '修改' : '确认修改'}</Button>
                    </div>
                </div>
                <Form className={!editing ? styles.editForm : ''}>
                    <FormItem
                        {...formItemLayout}
                        label='部门名称'
                        hasFeedback
                        >
                        {nameDecorator(
                            <Input disabled={!editing} placeholder='请输入部门名称' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='描述'
                        hasFeedback
                        >
                        {descriptDecorator(
                            <Input disabled={!editing} type='textarea' rows={4} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='联系电话'
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
                    <FormItem
                        {...formItemLayout}
                        label='负责人'
                        >
                        <div className={styles.iconButtonContainer}>
                        {
                            editing &&
                                <FloatingActionButton className={styles.iconButton} onTouchTap={this.showSelectClient.bind(this, 0)}>
                                    <EditorModeEdit />
                                </FloatingActionButton>
                        }
                        <img src={chargeMan.head ? chargeMan.head : '/img/common/default_head.png'} className={styles.head} />
                        {`${chargeMan.name} ( ${chargeMan.phone} )`}
                        </div>
                    </FormItem>
                    <FormItem
                        {...formItemTableLayout}
                        label='成员'
                        >
                        <div className={styles.tableContainer}>
                            {
                                editing &&

                                <div className={styles.iconButtonInnerContainer}>
                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.showSelectClient.bind(this, 1)}>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </div>
                            }
                            <Table
                                rowKey={(record, key) => key}
                                columns={editing ? this.columns : _.reject(this.columns, (o)=>o.dataIndex === 'operation')}
                                dataSource={members}
                                pagination={pagination}
                                rowClassName={::this.rowClassName}
                                onRowClick={::this.onRowClick}
                                />
                        </div>
                    </FormItem>
                    <FormItem
                        {...formItemTableLayout}
                        label='上级单位'
                        >
                        <div className={styles.iconButtonContainer}>
                        {
                            editing &&
                                <FloatingActionButton className={styles.iconButton} onTouchTap={this.showSelectPartment.bind(this, 0)}>
                                    <EditorModeEdit />
                                </FloatingActionButton>
                        }
                        {
                            !!superior  && (
                                <span>
                                    <span>{superior.name}</span>
                                    <span style={{marginLeft: 20}}>{`联系电话：${superior.phoneList.join(';')}`}</span>
                                    <span style={{marginLeft: 20}}>{`负责人：${superior.chargeMan ? (superior.chargeMan.name ? superior.chargeMan.name + '(' + superior.chargeMan.phone + ')' : superior.chargeMan.phone) : ''}`}</span>
                                </span>
                            )
                        }
                        </div>
                    </FormItem>
                    <FormItem
                        {...formItemTableLayout}
                        label='下属单位'
                        >
                        <div className={styles.tableContainer}>
                            {
                                editing &&
                                <div className={styles.iconButtonInnerContainer}>
                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.showSelectPartment.bind(this, 1)}>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </div>
                            }
                            <Table
                                rowKey={(record, key) => key}
                                columns={editing ? this.suborColumns : _.reject(this.suborColumns, (o)=>o.dataIndex === 'operation')}
                                dataSource={subors}
                                pagination={suborPagination}
                                rowClassName={::this.suborRowClassName}
                                onRowClick={::this.onSuborRowClick}
                                />
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
