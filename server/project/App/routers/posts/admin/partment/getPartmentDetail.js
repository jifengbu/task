import { PartmentModel } from '../../../../models';

export default async ({
    userId,
    partmentId,
}) => {
    const doc = await PartmentModel.findById(partmentId)
    .populate({
        path: 'chargeMan',
        select: { name: 1, phone: 1, head: 1, email: 1, reservePhone: 1 },
    })
    .populate({
        path: 'superior',
        select: { name: 1, descript: 1, phoneList: 1, chargeMan: 1, members: 1, superior: 1, subors: 1 },
        populate: [{
            path: 'chargeMan',
            select: { head: 1, name: 1, phone: 1 },
        }],
    }).populate({
        path: 'members',
        select: { name: 1, phone: 1, head: 1, email: 1, reservePhone: 1 },
    }).populate({
        path: 'subors',
        select: { name: 1, descript: 1, phoneList: 1, chargeMan: 1, members: 1, superior: 1, subors: 1 },
        populate: [{
            path: 'chargeMan',
            select: { head: 1, name: 1, phone: 1 },
        }],
    });
    if (!doc) {
        return { success: false, msg: '没有该部门' };
    }
    const context = doc.toObject();
    context.subors = context.subors.map((item) => {
        item.membersNum = item.members.length;
        delete item.members;
        item.suborsNum = item.subors.length;
        delete item.subors;
        return item;
    });
    return { success: true, context };
};
