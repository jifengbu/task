import React from 'react';
import { Form, Select } from 'ant-design';
import styles from './index.less';
import _ from 'lodash';
const FormItem = Form.Item;
const Option = Select.Option;

const defaultFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};
const defaultRules = (label, required) => [{ required, message: `请填写${label}` }];

export default class FormInputItem extends React.Component {
    render () {
        const { form, label, value, options, unit, editing, formItemLayout = defaultFormItemLayout, rules, required = true, hasFeedback=true, disabled } = this.props;
        const key = _.keys(value)[0];
        return (
            <FormItem
                {...formItemLayout}
                label={label}
                hasFeedback={hasFeedback}
                >
                {
                    !disabled && editing && form.getFieldDecorator(key, {
                        initialValue: options[value[key]],
                        rules: rules || defaultRules(label, required),
                    })(
                        <Select placeholder={`请选择${label}`}>
                            { _.values(_.mapValues(options, (v, k) => <Option key={k} value={k}>{v}</Option>))}
                        </Select>
                    ) || (
                        <span className={styles.value}>{options[value[key]]}</span>
                    )
                }
                { !!unit && <span className={styles.unit}>{unit}</span> }
            </FormItem>
        );
    }
}
