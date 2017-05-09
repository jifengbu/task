import { AdminModel } from '../../../../models';
import { setPassword, authenticatePassword } from '../../../../utils';

export default async ({ userId, oldPassword, newPassword }) => {
    const user = await AdminModel.findById(userId);
    if (!user) {
        return { success: false, msg: '该电话号码没有注册' };
    }
    let error = await authenticatePassword(user, oldPassword);
    if (error) {
        return { success: false, msg: '密码错误' };
    }
    error = await setPassword(user, newPassword);
    if (error) {
        return { success: false, msg: '设置密码失败' };
    }
    await user.save();
    return { success: true };
};
