import { ScheduleModel } from '../../../../models';

export default async ({
    userId,
    content,
}) => {
    const doc = new ScheduleModel({
        userId,
        content,
    });
    await doc.save();
    return { success: true };
};
