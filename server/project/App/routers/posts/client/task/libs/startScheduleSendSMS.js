import schedule from 'node-schedule';
import { TaskReadedModel, TaskModel } from '../../../../../models';
import { sendSMS } from '../../../../../utils';
export default (userId, taskId) => {
    //半小时之后检测
    schedule.scheduleJob(new Date(Date.now() + 30*60*100), async () => {
        const doc = await TaskReadedModel.findOne({userId, taskId});
        if (!doc) {
            const task = await TaskModel.findById(taskId).select({
                publisherId: 1,
                executorId: 1,
            }).populate({
                path: 'publisherId',
                select: {
                    phone: 1,
                    name: 1,
                },
            }).populate({
                path: 'executorId',
                select: {
                    phone: 1,
                    name: 1,
                },
            });
            if (task) {
                sendSMS(task.executor.phone, task.publisher.name);
            }
        }
    });
};
