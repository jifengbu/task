import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    scheduleId,
    content,
}) => {
    const doc = await ScheduleModel.findByIdAndUpdate(scheduleId, { content, modifyTime: Date.now() });
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }
    return { success: true };
};
