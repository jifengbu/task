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
            plateNo: 1,
            capacity: 1,
            length: 1,
            width: 1,
            height: 1,
            descriptList: {
                img: 1,
                text: 1,
            },
            remark: 1,
        },
    };
    state = {
        waiting : false,
        editing: this.props.operType === 0,
        partment: _.cloneDeep(this.props.partment) || (this.props.operType === 0 ? {
            capacity: 10,
            length: 10,
            height: 3,
            width: 3,
            descriptList: [],
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
                    确定删除货车 <span className={styles.confirmName}>{partment.name}</span> 吗？
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
            const { actions, form, history, operType, partmentId, partments, partment: originPartment } = this.props;
            const sumbit = operType === 0 ? actions.createPartment : actions.modifyPartment;
            form.validateFields((errors, value) => {
                if (errors) {
                    _.mapValues(errors, (item) => {
                        notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                    });
                    return;
                }

                const descriptList = [];
                for (const index in partment.descriptList) {
                    const item = partment.descriptList[index];
                    if (!item.removed) {
                        const img = item.url || item.img;
                        if (!img) {
                            notification.error({ description: '请上传第' + (index * 1 + 1) + '条描述的图片' });
                            return;
                        }
                        descriptList.push({ img, text: value['descriptText' + index] });
                        delete value['descriptText' + index];
                    }
                }
                value.descriptList = descriptList;

                if (operType === 1) {
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
    getBase64 (img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    onItemImageChange (index, info) {
        const { status, originFileObj, response } = info.file;
        const { partment, partment: { descriptList } } = this.state;
        if (status === 'uploading') {
            if (!descriptList[index].base64Code) {
                this.getBase64(originFileObj, base64Code => {
                    descriptList[index].base64Code = base64Code;
                });
            }
        } else if (status === 'done') {
            descriptList[index].url = response.context.url;
        }
        descriptList[index].fileList = info.fileList.slice(-1);

        this.setState({ partment });
    }
    onItemImageRemove (index, file) {
        const { partment, partment: { descriptList } } = this.state;
        descriptList[index].base64Code = undefined;
        descriptList[index].url = undefined;
        descriptList[index].fileList = undefined;
        this.setState({ partment });
    }
    addDescriptItem (index) {
        const { form } = this.props;
        const { partment, partment: { descriptList } } = this.state;

        if (index === undefined) {
            descriptList.push({});
        } else {
            descriptList.splice(index, 0, {});
        }
        for (const i in descriptList) {
            !descriptList[i].removed && form.setFieldsValue({ ['descriptText' + i]:  descriptList[i].text || '' });
        }
        this.setState({ partment });
    }
    removeDescriptItem (index) {
        const { partment } = this.state;
        partment.descriptList[index].removed = true;
        this.setState({ partment });
    }
    upDescriptItem (index) {
        const { form } = this.props;
        const { partment, partment: { descriptList } } = this.state;
        const repIndex = _.findLastIndex(descriptList, (obj, i) => !obj.removed && i < index);
        const tmp = descriptList[repIndex];
        descriptList[repIndex] = descriptList[index];
        descriptList[index] = tmp;
        for (const i in descriptList) {
            !descriptList[i].removed && form.setFieldsValue({ ['descriptText' + i]:  descriptList[i].text || '' });
        }
        this.setState({ partment });
    }
    downDescriptItem (index) {
        const { form } = this.props;
        const { partment, partment: { descriptList } } = this.state;
        const repIndex = _.findIndex(descriptList, (obj, i) => !obj.removed && i > index);
        const tmp = descriptList[repIndex];
        descriptList[repIndex] = descriptList[index];
        descriptList[index] = tmp;
        for (const i in descriptList) {
            !descriptList[i].removed && form.setFieldsValue({ ['descriptText' + i]:  descriptList[i].text || '' });
        }
        this.setState({ partment });
    }
    handleTextChange (index, event) {
        const { partment } = this.state;
        partment.descriptList[index].text = event.target.value;
        this.setState({ partment });
    }
    render () {
        const { form, operType } = this.props;
        const { waiting, editing, partment } = this.state;
        const { name, plateNo, capacity, length, width, height, descriptList = [], remark } = partment;
        let textIndex = 0;
        const descriptListLength = _.reject(descriptList, (o) => o.removed).length;

        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const nameDecorator = getFieldDecorator('name', {
            initialValue: name,
            rules: [
                { required: true, message: '请填写货车名称' },
            ],
        });
        const plateNoDecorator = getFieldDecorator('plateNo', {
            initialValue: plateNo,
            rules: [
                { required: true, message: '请填写车牌号码' },
            ],
        });
        const capacityDecorator = getFieldDecorator('capacity', {
            initialValue: capacity,
            rules: [
                { required: true, message: '请填写载重' },
            ],
        });
        const lengthDecorator = getFieldDecorator('length', {
            initialValue: length,
            rules: [
                { required: true, message: '请填写货物载重' },
            ],
        });
        const widthDecorator = getFieldDecorator('width', {
            initialValue: width,
            rules: [
                { required: true, message: '请填写货物宽度' },
            ],
        });
        const heightDecorator = getFieldDecorator('height', {
            initialValue: height,
            rules: [
                { required: true, message: '请填写货物高度' },
            ],
        });
        const remarkDecorator = getFieldDecorator('remark', {
            initialValue: remark,
        });
        const uploadProps = {
            name: 'file',
            action: '/uploadFile',
            supportServerRender: true,
        };
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.cell}>货车信息</div>
                    <Button style={{ zIndex: 1000 }} type='ghost' onClick={::this.handleSubmit} loading={waiting}>{operType === 0 ? '发布' : !editing ? '修改' : '确认修改'}</Button>
                </div>
                <Form className={!editing ? styles.editForm : ''}>
                    <FormItem
                        {...formItemLayout}
                        label='货车名称:'
                        hasFeedback
                        >
                        {nameDecorator(
                            <Input disabled={!editing} placeholder='请输入货车名称' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='车牌号码:'
                        hasFeedback
                        >
                        {plateNoDecorator(
                            <Input disabled={!editing} placeholder='请输入车牌号码' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='载重:'
                        hasFeedback
                        >
                        {capacityDecorator(
                            <InputNumber disabled={!editing} min={1} step={1} />
                        )}
                        <span className={styles.unit}>吨</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='车长:'
                        hasFeedback
                        >
                        {lengthDecorator(
                            <InputNumber disabled={!editing} min={1} step={0.1} />
                        )}
                        <span className={styles.unit}>米</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='车宽:'
                        hasFeedback
                        >
                        {widthDecorator(
                            <InputNumber disabled={!editing} min={1} step={0.1} />
                        )}
                        <span className={styles.unit}>米</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='车高:'
                        hasFeedback
                        >
                        {heightDecorator(
                            <InputNumber disabled={!editing} min={1} step={0.1} />
                        )}
                        <span className={styles.unit}>米</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='备注:'
                        hasFeedback
                        >
                        {remarkDecorator(
                            <Input disabled={!editing} type='textarea' rows={4} />
                        )}
                    </FormItem>
                    <div className={styles.descriptContainer}>
                        {
                            descriptList.map((item, i) => {
                                !item.removed && (textIndex++);
                                return item.removed ? null : (
                                    <div key={i} className={styles.descriptItem}>
                                        <FormItem
                                            {...formItemLayout}
                                            label={descriptListLength > 1 ? '第' + textIndex + '条描述:' : '描述:'}
                                            >
                                            <div className={styles.iconButtonContainer}>
                                                {
                                                    editing &&
                                                    <FloatingActionButton secondary className={styles.iconButton} onTouchTap={this.removeDescriptItem.bind(this, i)}>
                                                        <ContentDelete />
                                                    </FloatingActionButton>
                                                }
                                                {
                                                    editing && textIndex !== 1 &&
                                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.upDescriptItem.bind(this, i)}>
                                                        <NavigationArrowUpward />
                                                    </FloatingActionButton>
                                                }
                                                {
                                                    editing && textIndex !== descriptListLength &&
                                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.downDescriptItem.bind(this, i)}>
                                                        <NavigationArrowDownward />
                                                    </FloatingActionButton>
                                                }
                                                {
                                                    editing && descriptListLength < 3 &&
                                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.addDescriptItem.bind(this, i)}>
                                                        <ContentAdd />
                                                    </FloatingActionButton>
                                                }
                                            </div>
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label='文字描述:'
                                            hasFeedback
                                            >
                                            {getFieldDecorator('descriptText' + i, {
                                                initialValue: item.text || '',
                                                rules: [
                                                    { required: true, message: '请填写文字描述' },
                                                ],
                                            })(
                                                <Input disabled={!editing} placeholder='请输入文字描述' onChange={this.handleTextChange.bind(this, i)} />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label={'货物图片:'}
                                            >
                                            <div className={styles.draggerItemImgContainer}>
                                                <Dragger disabled={!editing} {...uploadProps} accept='.jpg,.png'
                                                    onChange={this.onItemImageChange.bind(this, i)}
                                                    onRemove={this.onItemImageRemove.bind(this, i)}
                                                    fileList={item.fileList}>
                                                    {
                                                        item.base64Code || item.img ?
                                                            <img src={item.base64Code || item.img} role='presentation' className={styles.draggerItemImgContainer} />
                                                        :
                                                            <Icon type='plus' />
                                                    }
                                                </Dragger>
                                            </div>
                                        </FormItem>
                                    </div>
                                );
                            })
                        }
                        {
                            editing && descriptListLength < 3 &&
                            <FormItem
                                {...formItemLayout}
                                label='追加描述:'
                                hasFeedback
                                >
                                <div className={styles.iconButtonContainer}>
                                    <FloatingActionButton className={styles.iconButton} onTouchTap={this.addDescriptItem.bind(this, undefined)}>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </div>
                            </FormItem>
                        }
                    </div>
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
