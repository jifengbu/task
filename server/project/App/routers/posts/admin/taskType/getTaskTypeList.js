import { TaskTypeModel } from '../../../../models';

export default async ({ userId, pageNo, pageSize }) => {
    const count = pageNo===0 ? await TaskTypeModel.count(criteria) : undefined;
    const query = TaskTypeModel.find(criteria).sort({ key: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        key: 1,
        name: 1,
    });

    return { success: true, context: {
        count,
        taskTypeList: docs,
    } }
};
