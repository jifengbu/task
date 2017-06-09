import { ClientModel, PartmentModel, MediaModel } from '../../../../models';
import { getMediaId, testPhone,registerUser } from '../../../../utils';

export default async ({
    userId,
    name,
    phone,
    partment,
    authority,
}) => {
    const client = await ClientModel.findOne({phone});
    if (client) {
        return {msg: '该电话号码已经被人使用!'}
    }
    const password = phone.substr(phone.length-6,phone.length);
    const doc = new ClientModel({
        name,
        phone,
        partment,
        authority,
    });
    let error = await registerUser(ClientModel, doc, password);
    if (!error) {
        let context = await ClientModel.findById(doc.id)
        .select({
            phone: 1,
            email: 1,
            name: 1,
            head: 1,
            post: 1,
            partment: 1,
            authority: 1,
            reservePhone: 1,
        }).populate({
            path: 'partment',
            select: { name: 1 },
        });
        return { success: true, context: doc };
    } else {
        return { success: false, msg: '注册失败' };
    }

};
