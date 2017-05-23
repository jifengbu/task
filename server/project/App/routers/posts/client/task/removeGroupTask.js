import { TaskModel, TaskGroupModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const group = await TaskGroupModel.findById(taskId);
    if (group) {
        for (const task of group.taskList) {
            const doc = await TaskModel.findByIdAndRemove(task);
            if (doc) {
                MediaModel._updateRef(
                    ...doc.audioList.map((item) => ({ [item.url]: -1 })),
                );
                MediaModel._updateRef(
                    ...doc.imageList.map((item) => ({ [item]: -1 })),
                );
            }
        }
        await group.remove();
    }

    return { success: true };
};
