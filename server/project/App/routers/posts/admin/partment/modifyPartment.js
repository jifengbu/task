import { PartmentModel, MediaModel } from '../../../../models';
import { getMediaId, omitNil } from '../../../../utils';

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
    const doc = await PartmentModel.findByIdAndUpdate(partmentId, omitNil({
        userId,
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
    });
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }
    return { success: true, context: doc  };
};
