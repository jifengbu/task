import { TaskModel, TaskGroupModel, MediaModel } from '../../../../models';
import { scheduleMgr } from '../../../../managers';

export default async ({
    userId,
    taskId,
}) => {
    const group = await TaskGroupModel.findById(taskId);
    if (group) {
        for (const task of group.taskList) {
            scheduleMgr.removeSchedule(task);
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
