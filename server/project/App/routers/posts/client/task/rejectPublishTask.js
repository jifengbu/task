import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({ userId, taskId, reason }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, { state: 2, rejectPublishReason: reason, examineTime: Date.now() });
    const taskGroup = await TaskGroupModel.findById(doc.groupId)
    .select({
        taskList: 1,
    }).populate({
        path: 'taskList',
        select: {
            state: 1,
        },
    });
    taskGroup.state = _.reduce(taskGroup.taskList.map(o => o.state), (r, o) => r | o);
    await taskGroup.save();
    await updateTaskProgress(userId, taskId, '拒绝了任务的发布');

    return { success: true };
};
