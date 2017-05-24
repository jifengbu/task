import { ProgressModel } from '../../../../models';

export default async ({ userId, taskId }) => {
    const query = ProgressModel.find({ taskId }).sort({ createTime: 'desc' });
    const docs = await query
    .select({
        clientId: 1,
        info: 1,
        type: 1,
        createTime: 1,
    }).populate({
        path: 'clientId',
        select: { name: 1, phone: 1 },
    });

    return { success: true, context: {
        ProgressList: docs,
    } };
};
