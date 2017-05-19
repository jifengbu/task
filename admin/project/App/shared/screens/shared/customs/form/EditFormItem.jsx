import React from 'react';
import { Form, Input } from 'ant-design';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import styles from './index.less';
const FormItem = Form.Item;

const defaultFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};

export default class FormInputItem extends React.Component {
    render () {
        const { label, value, children, onEdit, editing, formItemLayout = defaultFormItemLayout } = this.props;

        return (
            <FormItem
                {...formItemLayout}
                label={label}
                >
                <div className={styles.iconButtonContainer}>
                    {
                        editing &&
                        <FloatingActionButton className={styles.iconButton} onTouchTap={onEdit}>
                            <EditorModeEdit />
                        </FloatingActionButton>
                    }
                    {children}
                    { !!value && <span className={editing ? '' : styles.value}>{value}</span> }
                </div>
            </FormItem>
        );
    }
}
