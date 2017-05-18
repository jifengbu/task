import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import verification from 'helpers/verification';
import { Button, Form, Input, Spin, Modal, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class ForgotPwd extends React.Component {
    state = { waiting: false }
    handleReset (e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit (e) {
        e.preventDefault();
        const self = this;
        const { actions, form, history } = this.props;
        form.validateFields((errors, value) => {
            if (errors) {
                _.mapValues(errors, (item) => {
                    notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                });
                return;
            }
            self.setState({ waiting: true });
            actions.forgotPwd(value.phone, value.email, (data) => {
                const { success, msg } = data;
                self.setState({ waiting: false });
                if (success) {
                    Modal.success({
                        content: '新的密码已经发送到你的邮箱',
                        onOk () {
                            history.push({ pathname: '/admin/login', state: { phone: form.getFieldValue('phone') } });
                        },
                    });
                } else {
                    notification.error({ description: msg });
                }
            });
        });
    }
    checkPhone (rule, value, callback) {
        if (!verification.checkPhone(value)) {
            callback('请输入正确的电话号码');
        } else {
            callback();
        }
    }
    render () {
        const { form } = this.props;
        const { waiting } = this.props.states || {};
        const { email, phone } = {};
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true },
                { validator: ::this.checkPhone },
            ],
        });
        const emailDecorator = getFieldDecorator('email', {
            initialValue: email,
            validate: [{
                rules: [
                    { required: true, message: '请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className={styles.container}>
                <div className={styles.centerContainer}>
                    <div className={styles.leftContainer}>
                        <img className={styles.logo} src='/img/common/logo.png' />
                        <div className={styles.leftDownContainer}>
                            <span className={styles.leftText1}>欢迎使用</span>
                            <span className={styles.leftText2}> 商务厅管理端</span>
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <Form horizontal className={styles.form}>
                            <FormItem
                                {...formItemLayout}
                                label='电话号码:'
                                hasFeedback
                                >
                                {phoneDecorator(
                                    <Input placeholder='请电话号码' />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='找回密码的邮箱:'
                                hasFeedback
                                >
                                {emailDecorator(
                                    <Input placeholder='请输入找回密码的邮箱' />
                                )}
                            </FormItem>
                        </Form>
                        <div className={styles.buttonContainer}>
                            {
                                waiting ?
                                    <div style={{ textAlign:'center' }}>
                                        <Spin />
                                        <div>请稍后...</div>
                                    </div>
                                :
                                    <Button className={styles.button} type='primary' onClick={::this.handleSubmit}>确 定</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
