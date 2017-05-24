import { ClientModel, PartmentModel, MediaModel } from '../../../../models';
import { getMediaId, testPhone } from '../../../../utils';

export default async ({
    userId,
    name,
    phone,
    partment,
}) => {
    const doc = new ClientModel({
        name,
        phone,
        partment,
    });
    await doc.save();
    let context = await ClientModel.findById(doc.id)
    .select({
        phone: 1,
        email: 1,
        name: 1,
        head: 1,
        post: 1,
        partment: 1,
        reservePhone: 1,
    }).populate({
        path: 'partment',
        select: { name: 1 },
    });

    return { success: true, context: doc };
};
