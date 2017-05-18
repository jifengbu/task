import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import verification from 'helpers/verification';
import { Button, Form, Input, Spin, Modal, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class Register extends React.Component {
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
            actions.register({
                phone: value.phone,
                password: value.password,
                email: value.email,
            }, (data) => {
                const { success, msg } = data;
                self.setState({ waiting: false });
                if (data.success) {
                    Modal.success({
                        content: '注册成功',
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
    checkPass (rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    }
    checkPass2 (rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render () {
        const { form } = this.props;
        const { waiting } = this.state;
        const { phone, name, email } = {};
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true },
                { validator: ::this.checkPhone },
            ],
        });
        const passwdDecorator = getFieldDecorator('password', {
            rules: [
                { required: true, whitespace: true, min:3, message: '请输入密码' },
                { validator: ::this.checkPass },
            ],
        });
        const rePasswdDecorator = getFieldDecorator('rePassword', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: ::this.checkPass2,
            }],
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
                            <span className={styles.leftText1}>欢迎登陆</span>
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
                                    <Input placeholder='请输入电话号码' />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='密码:'
                                hasFeedback
                                >
                                {passwdDecorator(
                                    <Input type='password' autoComplete='off'
                                        onContextMenu={_.noop} onPaste={_.noop} onCopy={_.noop} onCut={_.noop}
                                        />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='确认密码:'
                                hasFeedback
                                >
                                {rePasswdDecorator(
                                    <Input type='password' autoComplete='off' placeholder='两次输入密码保持一致'
                                        onContextMenu={_.noop} onPaste={_.noop} onCopy={_.noop} onCut={_.noop}
                                        />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label='邮箱:'
                                hasFeedback
                                >
                                {emailDecorator(
                                    <Input placeholder='请输入找回密码的邮箱（非常重要）' />
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
                                    <div className={styles.buttonInnerContainer}>
                                        <Button className={styles.button} type='primary' onClick={::this.handleSubmit}>确 定</Button>
                                        <Button type='ghost' onClick={::this.handleReset}>重 置</Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
