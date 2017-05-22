import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    scheduleId,
}) => {
    const doc = await ScheduleModel.findById(scheduleId);
    if (!doc) {
        return { success: false, msg: '没有该提醒' };
    }
    return { success: true, context: doc };
};
