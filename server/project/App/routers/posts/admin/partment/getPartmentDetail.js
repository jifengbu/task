import { PartmentModel } from '../../../../models';

export default async ({
    userId,
    partmentId,
}) => {
    const doc = await PartmentModel.findById(partmentId)
    .populate({
        path: 'chargeMan',
        select: { name: 1, phone: 1, head: 1 },
    }).populate({
        path: 'superior',
        select: { name: 1 },
    }).populate({
        path: 'members',
        select: { name: 1, phone: 1, head: 1 },
    }).populate({
        path: 'subors',
        select: { name: 1 },
    });
    if (!doc) {
        return { success: false, msg: '没有该部门' };
    }
    return { success: true, context: doc };
};
