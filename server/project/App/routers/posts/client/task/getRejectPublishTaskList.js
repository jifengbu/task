import { TaskModel } from '../../../../models';

export default async ({ userId, isLeader, pageNo, pageSize }) => {
    const criteria = {state: 2};
    if (isLeader) {
        criteria.examinerId = userId;
    } else {
        criteria.publisherId = userId;
    }
    const query = TaskModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        title: 1,
        content: 1,
        modifyTime: 1,
        expectFinishTime: 1,
        rejectPublishReason: 1,
    });

    return { success: true, context: {
        taskList: docs,
    } };
};
