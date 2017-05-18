import { Form } from 'ant-design';
export default (target) => {
    const Component = Form.create()(target);
    Component.fragments = target.fragments;
    return Component;
};
