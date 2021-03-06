import { ScheduleModel } from '../../../../models';

export default async ({ userId, time, pageNo, pageSize }) => {
    const criteria = { userId };
    const query = ScheduleModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        content: 1,
        state: 1,
    });

    return { success: true, context: {
        scheduleList: docs,
    } };
};
