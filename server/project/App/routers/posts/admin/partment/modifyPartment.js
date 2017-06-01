import _ from 'lodash';
import { PartmentModel, ClientModel, MediaModel } from '../../../../models';
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
    })).select({
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
    if (members) {
        const add = _.differenceBy(members, doc.members, o=>o.toString());
        const sub = _.differenceBy(doc.members, members, o=>o.toString());
        for (const id of sub) {
            await ClientModel.findByIdAndUpdate(id, {partment: undefined});
        }
        for (const id of add) {
            await ClientModel.findByIdAndUpdate(id, {partment: doc.id});
        }
    }
    if (chargeMan && doc.chargeMan && doc.chargeMan.id !== chargeMan) {
        await ClientModel.findByIdAndUpdate(chargeMan, {partment: doc.id});
        await ClientModel.findByIdAndUpdate(doc.chargeMan.id, {partment: undefined});
    }


    const context = doc.toObject();
    Object.assign(context, omitNil({
        name,
        descript,
        phoneList,
        chargeMan,
        members,
        superior,
        subors,
    }));

    context.membersNum = context.members.length;
    delete context.members;
    context.suborsNum = context.subors.length;
    delete context.subors;

    return { success: true, context };
};
