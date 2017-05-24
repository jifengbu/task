import { TaskModel, TaskReadedModel } from '../../../../models';
export default async ({ userId, count = 10 }) => {
    const list = await TaskReadedModel.find({userId}).sort({ readTimes: 'desc' }).limit(count);
    let docs = [];
    if (list) {
        const taskIds = list.map(o=>o.taskId);
        docs = await TaskModel.find({_id: {$in: taskIds}})
        .select({
            title: 1,
            content: 1,
            modifyTime: 1,
            expectStartTime: 1,
            expectFinishTime: 1,
            rejectPublishReason: 1,
            rejectFinishReason: 1,
            type: 1,
            state: 1,
        });
    }

    return { success: true, context: {
        taskList: docs,
    } };
};
