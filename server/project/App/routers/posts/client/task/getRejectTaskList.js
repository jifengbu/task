import { TaskModel } from '../../../../models';

export default async ({ userId, role, pageNo, pageSize }) => { //role = ['leader', 'secretary', 'executor']
    let criteria = {};
    if (role === 'leader') {
        criteria = {$or: [{ state: 2,  examinerId: userId }, { state: 64,  publisherId: userId }] };
    } else if (role === 'secretary') {
        criteria = {$or: [{ state: 2,  publisherId: userId }, { state: 64,  publisherId: userId }] };
    } else {
        criteria = { state: 64,  executorId: userId };
    }

    const query = TaskModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        title: 1,
        content: 1,
        state: 1,
        modifyTime: 1,
        expectFinishTime: 1,
        rejectPublishReason: 1,
        rejectFinishReason: 1,
    });

    return { success: true, context: {
        taskList: docs,
    } };
};
