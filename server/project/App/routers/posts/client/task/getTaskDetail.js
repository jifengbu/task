import { TaskModel } from '../../../../models';

export default async ({
    userId,
    TaskId,
}) => {
    const doc = await TaskModel.findById(TaskId).populate({
        path: 'senderId',
        select: { name: 1, phone: 1 },
    });
    if (!doc) {
        return { success: false, msg: '没有该任务' };
    }
    return { success: true, context: doc };
};
