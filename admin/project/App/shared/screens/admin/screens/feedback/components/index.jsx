import React from 'react';
import antd_form_create from 'decorators/antd_form_create';
import { Button, Form, Input, Modal, notification } from 'ant-design';
import _ from 'lodash';
import styles from './index.less';
const FormItem = Form.Item;

@antd_form_create
export default class Statistics extends React.Component {
    state = { waiting : false }
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
            actions.feedback(value.content, value.email, (data) => {
                self.setState({ waiting: false });
                if (data.success) {
                    Modal.success({
                        content: data.msg,
                        onOk () {
                            history.push({ pathname: '/admin/consume' });
                        },
                    });
                } else {
                    notification.error({ description: data.msg });
                }
            });
        });
    }
    render () {
        const { form } = this.props;
        const { waiting } = this.state;
        const { email = '42550564@qq.com' } = {};
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const contentDecorator = getFieldDecorator('content', {
            rules: [
                { required: true, message: '反馈的内容不能为空' },
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
        return (
            <div className={styles.container}>
                <Form horizontal>
                    <div className={styles.title}>
                        请输入你需要反馈的内容:
                    </div>
                    <FormItem
                        hasFeedback
                        >
                        {contentDecorator(
                            <Input type='textarea' rows={10} />
                        )}
                    </FormItem>
                    <div className={styles.title}>
                        联系邮箱<span className={styles.titleDisc}>（留下您的联系邮箱，以便我们将处理结果通知给您，我们会严格保密）</span>:
                    </div>
                    <FormItem
                        hasFeedback
                        >
                        {emailDecorator(
                            <Input placeholder='请输入邮箱' />
                        )}
                    </FormItem>
                    <div className={styles.buttonContainer}>
                        <Button type='primary' onClick={::this.handleSubmit} loading={waiting}>提交反馈</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
