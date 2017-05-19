import React from 'react';
import { Form, InputNumber } from 'ant-design';
import styles from './index.less';
const FormItem = Form.Item;

const defaultFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};
const defaultRules = (label, required) => [{ required, message: `请填写${label}` }];

export default class FormInputItem extends React.Component {
    render () {
        const { form, label, value, min, max, step, unit, editing, formItemLayout = defaultFormItemLayout, rules, required = true, hasFeedback=true, disabled } = this.props;
        const key = _.keys(value)[0];
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
                        <InputNumber disabled={!editing} min={min} max={max} step={1} />
                    ) || (
                        <span className={styles.value}>{value[key]}</span>
                    )
                }
                { !!unit && <span className={styles.unit}>{unit}</span> }
            </FormItem>
        );
    }
}
