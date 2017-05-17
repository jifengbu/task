import { PartmentModel } from '../../../../models';

export default async ({
    userId,
    partmentId,
}) => {
    const doc = await PartmentModel.findById(partmentId);
    if (!doc) {
        return { success: false, msg: '没有该部门' };
    }
    return { success: true, context: doc };
};
