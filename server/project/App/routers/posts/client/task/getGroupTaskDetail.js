import { TaskGroupModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const doc = await TaskGroupModel.findById(taskId)
    .select({
        title: 1,
        content: 1,
        taskList: 1,
    }).populate({
        path: 'taskList',
        select: {
            executorId: 1,
            supervisorId: 1,
            title: 1,
            content: 1,
            examineFinishTime: 1,
            applyFinishTime: 1,
            modifyTime: 1,
            startExecTime: 1,
            examineTime: 1,
            publishTime: 1,
            expectFinishTime: 1,
            expectStartTime: 1,
            state: 1,
            type: 1,
            imageList: 1,
            audioList: 1,
        },
        populate: [{
            path: 'executorId',
            select: {
                phone: 1,
                name: 1,
            },
        }, {
            path: 'supervisorId',
            select: {
                phone: 1,
                name: 1,
            },
        }],
    });
    if (!doc) {
        return { success: false, msg: '没有该任务' };
    }
    return { success: true, context: doc };
};
