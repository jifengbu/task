import { PartmentModel, ClientModel, MediaModel } from '../../../../models';
import { getMediaId, testPhone } from '../../../../utils';

export default async ({
    userId,
    name,
    descript,
    phoneList,
    chargeMan,
    members,
    superior,
    subors,
}) => {
    const doc = new PartmentModel({
        name,
        descript,
        phoneList,
        chargeMan,
        members,
        superior,
        subors,
    });
    await doc.save();
    const context = await PartmentModel.findById(doc.id)
    .select({
        id: 1,
        name: 1,
        descript: 1,
        phoneList: 1,
        chargeMan: 1,
        members: 1,
        superior: 1,
        subors: 1,
    }).populate({
        path: 'chargeMan',
        select: { name: 1, phone: 1 },
    }).populate({
        path: 'superior',
        select: { name: 1 },
    });
    return { success: true, context };
};
