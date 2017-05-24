import { ClientModel, MediaModel } from '../../../../models';
import { getMediaId, omitNil } from '../../../../utils';

export default async ({
    userId,
    clientId,
    name,
    phone,
    partment,
    authority,
}) => {
    const doc = await ClientModel.findByIdAndUpdate(clientId, omitNil({
        name,
        phone,
        partment,
        authority,
    }), { new: true }).select({
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
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }

    return { success: true, context: doc };
};
