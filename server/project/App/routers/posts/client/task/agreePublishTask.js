import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({ userId, taskId }, { io }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, { state: 16, examineTime: Date.now() });
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
    await updateTaskProgress(userId, taskId, '同意发布任务');

    io.emitTo([doc.executorId, doc.supervisorId, doc.publisherId], 'AGREE_PUBLISH_TASK_NF', doc);

    return { success: true };
};
