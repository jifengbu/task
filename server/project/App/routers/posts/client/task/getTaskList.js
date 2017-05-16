import { TaskModel } from '../../../../models';
import { getKeywordCriteriaForOrder } from '../../../../utils';

export default async ({ userId, type, pageNo, pageSize }) => {
    const criteria = {publisherId: userId};
    if (type === undefined) {
        criteria.type = type;
    }
    const count = pageNo===0 ? await TaskModel.count(criteria) : undefined;
    const query = TaskModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        executorId: 1,
        title: 1,
        content: 1,
        audioList: 1,
        imageList: 1,
        type: 1,
        state: 1,
        startTime: 1,
        endTime: 1,
    }).populate({
        path: 'executorId',
        select: { name: 1, phone: 1 },
    });

    return { success: true, context: {
        count,
        taskList: docs,
    } };
};
