import { TaskTypeModel } from '../../../../models';

export default async ({ userId, pageNo, pageSize }) => {
    const count = pageNo===0 ? await TaskTypeModel.count() : undefined;
    const query = TaskTypeModel.find().sort({ key: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        type: 1,
        name: 1,
    });

    return { success: true, context: {
        count,
        taskTypeList: docs,
    } }
};
