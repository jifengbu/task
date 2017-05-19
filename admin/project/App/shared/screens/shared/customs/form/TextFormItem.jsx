import React from 'react';
import { Form, Input } from 'ant-design';
import styles from './index.less';
const FormItem = Form.Item;

const defaultFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};
const defaultRules = (label, required) => [{ required, message: `请填写${label}` }];

export default class FormInputItem extends React.Component {
    render () {
        const { form, label, value, editing, rows, formItemLayout = defaultFormItemLayout,
            rules, required = true, hasFeedback=true, disabled } = this.props;
        const key = _.keys(value)[0];
        const option = {};
        if (rows) {
            option.type = 'textarea';
            if (_.isArray(rows)) {
                if (rows.length === 1) {
                    option.rows = rows[0];
                } else {
                    option.autosize = {minRows: rows[0], maxRows: rows[1]}
                }
            } else {
                option.rows = rows;
            }
        }

        return (
            <FormItem
                {...formItemLayout}
                label={label}
                hasFeedback={hasFeedback}
                >
                {
                    !disabled && editing && form.getFieldDecorator(key, {
                        initialValue: value[key],
                        rules: rules || defaultRules(label, required),
                    })(
                        <Input {...option} placeholder={`请输入${label}`} />
                    ) || (
                        <span className={styles.value}>{value[key]}</span>
                    )
                }
            </FormItem>
        );
    }
}
