import { Form } from 'ant-design';
export default (target) => {
    var Component = Form.create()(target);
    Component.fragments = target.fragments;
    return Component;
};
