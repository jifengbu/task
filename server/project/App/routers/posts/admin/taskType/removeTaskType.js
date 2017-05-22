import { TaskTypeModel } from '../../../../models';

export default async ({
    userId,
    taskTypeId,
}) => {
    const doc = await TaskTypeModel.findByIdAndRemove(taskTypeId);
    return { success: true };
};
