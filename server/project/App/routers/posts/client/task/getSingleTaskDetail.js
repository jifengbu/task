import { TaskModel } from '../../../../models';
import readTask from './libs/readTask';

export default async ({
    userId,
    taskId,
}) => {
    const doc = await TaskModel.findById(taskId)
    .populate({
        path: 'executorId',
        select: {
            phone: 1,
            name: 1,
        },
    }).populate({
        path: 'supervisorId',
        select: {
            phone: 1,
            name: 1,
        },
    });
    if (!doc) {
        return { success: false, msg: '没有该任务' };
    }
    await readTask(userId, taskId);
    return { success: true, context: doc };
};
