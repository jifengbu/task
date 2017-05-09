import { ClientModel } from '../../../../models';
import { setPassword, registerUser } from '../../../../utils';

export default async ({ phone, password, email }) => {
    let user = await ClientModel.findOne({ phone });
    if (!user) {
        user = new ClientModel({
            phone,
            email,
        });
        let error = await registerUser(ClientModel, user, password);
        if (!error) {
            return { success: true };
        } else {
            return { success: false, msg: '注册失败' };
        }
    } else if (!user.email) {
        let error = await setPassword(user, password);
        if (error) {
            return { success: false, msg: '注册失败' };
        }
        user.email = email;
        await user.save();
        return { success: true };
    }
    return { success: false, msg: '该账号已经被占用' };
};
