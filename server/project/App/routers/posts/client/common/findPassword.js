import { ClientModel } from '../../../../models';
import { setPassword, genRandomPassword, sendFindPasswordMail } from '../../../../utils';

export default async ({ phone, email }) => {
    const user = await ClientModel.findOne({ phone });
    if (!user) {
        return { success: false, msg: '该电话号码没有注册' };
    }
    if (user.email !== email) {
        return { success: false, msg: '邮箱和注册的时候的邮箱不一致' };
    }

    let newPassword = genRandomPassword();
    let error = await setPassword(user, newPassword);
    if (error) {
        return { success: false, msg: '服务器错误' };
    }
    await user.save();
    let ret = await sendFindPasswordMail(email, newPassword);
    if (!ret) {
        return { success: false, msg: '发送邮件失败' };
    }
    return { success: true };
};
