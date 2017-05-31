import { TaskTypeModel } from '../../../../models';
import { omitNil } from '../../../../utils';

export default async ({
    userId,
    taskTypeId,
    key,
    name,
}) => {
    const doc = await TaskTypeModel.findByIdAndUpdate(taskTypeId, omitNil({
        key,
        name,
    }), { new: true }).select({
        key: 1,
        name: 1,
    });
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }

    return { success: true, context: doc };
};
