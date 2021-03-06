import { TaskTypeModel } from '../../../../models';

export default async ({ userId }) => {
    const query = TaskTypeModel.find().sort({ key: 'asc' });
    const docs = await query
    .select({
        key: 1,
        name: 1,
    });

    return { success: true, context: {
        taskTypeList: docs,
    } };
};
