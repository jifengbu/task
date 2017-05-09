import { ClientModel } from '../../../../models';

export default async ({ userId }) => {
    const doc = await ClientModel.findById(userId);
    if (!doc) {
        return { success: false, msg: '没有该用户' };
    }

    return { success: true, context: doc.toObject() };
};
