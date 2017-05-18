import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import styles from './index.less';
import { Link } from 'react-router';
import verification from 'helpers/verification';
import { Button, Form, Input, Spin, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class Login extends React.Component {
    state = { waiting : false }
    handleSubmit (e) {
        e.preventDefault();
        const self = this;
        const { actions, form } = this.props;
        form.validateFields((errors, value) => {
            if (errors) {
                _.mapValues(errors, (item) => {
                    notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                });
                return;
            }
            self.setState({ waiting: true });
            actions.login(value.phone, value.password, (data) => {
                const { success, msg } = data;
                if (success) {
                    window.location.href = '/admin';
                } else {
                    self.setState({ waiting: false });
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
        const { waiting } = this.state;
        const { phone, form:{ getFieldDecorator, getFieldError, isFieldValidating } } = this.props;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true },
                { validator: ::this.checkPhone },
            ],
        });
        const passwdDecorator = getFieldDecorator('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
            ],
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
                                    <Input placeholder='请电话号码' />
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
                        </Form>
                        <Button className={styles.login_button} type='primary' onClick={::this.handleSubmit} loading={waiting}>登录</Button>
                        <div className={styles.functionContainer}>
                            <Link to='/admin/forgotPwd'>
                                <Button className={styles.functionButton}>忘记密码？</Button>
                            </Link>
                            <Link to='/admin/register'>
                                <Button className={styles.functionButton}>立即注册</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
