import { TaskTypeModel } from '../../../../models';

export default async ({
    userId,
    type,
    name,
}) => {
    const doc = new TaskTypeModel({
        type,
        name,
    });
    await doc.save();
    const context = await TaskTypeModel.findById(doc.id)
    .select({
        id: 1,
        type: 1,
        name: 1,
    });
    return { success: true, context };
};
