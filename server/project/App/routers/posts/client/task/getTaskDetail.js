import { TaskModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const doc = await TaskModel.findById(taskId).populate({
        path: 'senderId',
        select: { name: 1, phone: 1 },
    });
    if (!doc) {
        return { success: false, msg: '没有该任务' };
    }
    return { success: true, context: doc };
};
