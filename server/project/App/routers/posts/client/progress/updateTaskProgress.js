import { ProgressModel } from '../../../../models';

export default async ({
    userId,
    taskId,
    content,
}) => {
    const doc = new ProgressModel({
        clientId: userId,
        taskId,
        info: content,
        type: 0,
    });
    await doc.save();
    return { success: true };
};
