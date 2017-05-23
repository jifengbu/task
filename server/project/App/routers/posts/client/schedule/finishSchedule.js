import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    scheduleId,
}) => {
    await ScheduleModel.findByIdAndUpdate(scheduleId, { state: 1 });
    return { success: true };
};
