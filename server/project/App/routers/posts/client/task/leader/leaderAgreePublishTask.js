import { TaskGroupModel, TaskModel } from '../../../../../models';

export default async ({ userId, taskId }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, {state: 2});
    await TaskGroupModel.findByIdAndUpdate(doc.groupId, {state: 2});

    return { success: true };
};
