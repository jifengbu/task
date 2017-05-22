import { TaskGroupModel, TaskModel } from '../../../../../models';

export default async ({ userId, taskId }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, {state: 4});
    await TaskGroupModel.findByIdAndUpdate(doc.groupId, {state: 4});

    return { success: true };
};
