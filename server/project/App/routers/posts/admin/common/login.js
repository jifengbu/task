import { AdminModel } from '../../../../models';

function authenticatePassword (user, password) {
    return new Promise((resolve) => {
        user.authenticate(password, (err, thisModel, error) => {
            if (error) {
                resolve(error);
            }
            resolve();
        });
    });
}

export default async ({ phone, password }) => {
    const user = await AdminModel.findOne({ phone });
    if (!user) {
        return { success: false, msg: '该电话号码没有注册' };
    }
    let error = await authenticatePassword(user, password);
    if (error) {
        return { success: false, msg: '密码错误' };
    } else {
        return { success: true, context: { userId: user._id } };
    }
};
