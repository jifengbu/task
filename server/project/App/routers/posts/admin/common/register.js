import { AdminModel } from '../../../../models';
import { registerUser } from '../../../../utils';

export default async ({ phone, password, email }) => {
    const user = new AdminModel({
        phone,
        email,
    });
    let error = await registerUser(AdminModel, user, password);
    if (!error) {
        return { success: true };
    } else if (error === 'UserExistsError') {
        return { success: false, msg: '该账号已经被占用' };
    } else {
        return { success: false, msg: '注册失败' };
    }
};
