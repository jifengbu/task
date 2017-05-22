import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    scheduleId,
    content,
}) => {
    const doc = await ScheduleModel.findByIdAndUpdate(scheduleId, { content });
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }
    return { success: true };
};
