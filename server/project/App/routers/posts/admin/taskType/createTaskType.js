import { TaskTypeModel } from '../../../../models';

export default async ({
    userId,
    key,
    name,
}) => {
    const doc = new TaskTypeModel({
        key,
        name,
    });
    await doc.save();
    const context = await TaskTypeModel.findById(doc.id)
    .select({
        id: 1,
        key: 1,
        name: 1,
    });
    return { success: true, context };
};
