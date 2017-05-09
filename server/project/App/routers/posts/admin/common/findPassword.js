import { AdminModel } from '../../../../models';
import { setPassword, genRandomPassword } from '../../../../utils';

export default async ({ phone, email }) => {
    const user = await AdminModel.findOne({ phone });
    if (!user) {
        return { success: false, msg: '该电话号码没有注册' };
    }
    if (user.email !== email) {
        return { success: false, msg: '邮箱和注册的时候的邮箱不一致' };
    }

    let newPassword = genRandomPassword();
    console.log('========newPassword', newPassword);
    let error = await setPassword(user, newPassword);
    if (error) {
        return { success: false, msg: '服务器错误' };
    }
    await user.save();
    // 使用 email 将新的密码发送到 邮箱
    return { success: true, msg: '新的密码已经发送到你的邮箱' };
};
