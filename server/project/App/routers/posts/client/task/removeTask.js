import { TaskModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const doc = await TaskModel.findByIdAndRemove(taskId);
    if (doc) {
        MediaModel._updateRef(
            ...doc.audioList.map((item) => ({ [item]: -1 })),
        );
        MediaModel._updateRef(
            ...doc.imageList.map((item) => ({ [item]: -1 })),
        );
    }
    return { success: true };
};
