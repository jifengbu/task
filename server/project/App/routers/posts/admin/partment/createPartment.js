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
    return { success: true, context: doc };
};
