import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    scheduleId,
}) => {
    await ScheduleModel.findByIdAndRemove(scheduleId);
    return { success: true };
};
