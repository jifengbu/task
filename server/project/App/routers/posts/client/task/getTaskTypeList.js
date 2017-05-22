import { TaskTypeModel } from '../../../../models';

export default async ({ userId, pageNo, pageSize }) => {
    const query = TaskTypeModel.find(criteria).sort({ key: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        key: 1,
        name: 1,
    });

    return { success: true, context: {
        taskTypeList: docs,
    } }
};
