import React from 'react';
import { Form, Input } from 'ant-design';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './index.less';
const FormItem = Form.Item;

const defaultFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
};

export default class FormInputItem extends React.Component {
    render () {
        const { label, children, onAdd, editing, formItemLayout = defaultFormItemLayout } = this.props;

        return (
            <FormItem
                {...formItemLayout}
                label={label}
                >
                <div className={styles.tableContainer}>
                    {
                        editing &&
                        <div style={{width: 60, height: 60}}>
                            <FloatingActionButton className={styles.iconButton} onTouchTap={onAdd}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                    }
                    { children }
                </div>
            </FormItem>
        );
    }
}
