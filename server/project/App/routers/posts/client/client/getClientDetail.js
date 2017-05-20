import { ClientModel } from '../../../../models';

export default async ({
    userId,
    clientId,
}) => {
    const doc = await ClientModel.findById(clientId)
    .populate({
        path: 'partment',
        select: { name: 1, descript: 1, phoneList: 1, chargeMan: 1, members: 1, superior: 1, subors: 1 },
        populate: [{
            path: 'chargeMan',
            select: { head: 1, name: 1, phone: 1 },
        }, {
            path: 'superior',
            select: { name: 1 },
        }],
    });
    if (!doc) {
        return { success: false, msg: '没有该人员' };
    }
    const context = doc.toObject();
    const { partment } = context;
    if (partment) {
        partment.membersNum = partment.members.length;
        delete partment.members;
        partment.suborsNum = partment.subors.length;
        delete partment.subors;
    }
    return { success: true, context };
};
