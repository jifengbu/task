import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({ userId, taskId }, { io }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, { state: 32, applyFinishTime: Date.now() });
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
    await updateTaskProgress(userId, taskId, '申请完成任务');
    io.emitTo(doc.publisherId, 'APPLY_FINISH_TASK_NF', doc);

    return { success: true };
};
