import { PartmentModel, MediaModel } from '../../../../models';
import { getMediaId, omitNil } from '../../../../utils';

export default async ({
    userId,
    partmentId,
    name,
    descript,
    phoneList,
    chargeMan,
    members,
    superior,
    subors,
}) => {
    const doc = await PartmentModel.findByIdAndUpdate(partmentId, omitNil({
        name,
        descript,
        phoneList,
        chargeMan,
        members,
        superior,
        subors,
    }), { new: true }).select({
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
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }

    const context = doc.toObject();
    context.membersNum = context.members.length;
    delete context.members;
    context.suborsNum = context.subors.length;
    delete context.subors;

    return { success: true, context  };
};
