import { ProgressModel } from '../../../../models';

export default async ({
    userId,
    taskId,
}) => {
    const doc = new ProgressModel({
        clientId: userId,
        taskId,
        type: 1,
    });
    await doc.save();
    return { success: true };
};
