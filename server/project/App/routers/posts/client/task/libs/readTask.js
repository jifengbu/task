import { TaskReadedModel } from '../../../../../models';

export default async (userId, taskId) => {
    await TaskReadedModel.findOneAndUpdate({ userId, taskId }, { $inc: { readTimes: 1 } }, { upsert: 1 });
};
