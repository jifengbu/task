import { TaskModel, TaskGroupModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const task = await TaskModel.findById(taskId);
    if (task) {
        const group = await TaskGroupModel.findById(task.groupId);
        if (group.taskList.length === 1) {
            await group.remove();
        } else {
            group.taskList.pull(task.id);
            await group.save();
        }
        MediaModel._updateRef(
            ...task.audioList.map((item) => ({ [item.url]: -1 })),
        );
        MediaModel._updateRef(
            ...task.imageList.map((item) => ({ [item]: -1 })),
        );
        await task.remove();
    }
    return { success: true };
};
