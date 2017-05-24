import { TaskTypeModel } from '../../../../models';

export default async ({ userId }) => {
    const query = TaskTypeModel.find();
    const docs = await query
    .select({
        type: 1,
        name: 1,
    });

    return { success: true, context: {
        taskTypeList: docs,
    } };
};
