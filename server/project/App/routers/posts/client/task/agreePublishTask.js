import { TaskGroupModel, TaskModel } from '../../../../models';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({ userId, taskId }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, {state: 4, examineTime: Date.now()});
    const taskGroup = await TaskGroupModel.findById(doc.groupId)
    .select({
        taskList: 1,
    }).populate({
        path: 'taskList',
        select: {
            state:1,
        },
    });
    taskGroup.state = _.reduce(taskGroup.taskList.map(o=>o.state), (r, o)=>r|o);
    await taskGroup.save();
    await updateTaskProgress(userId, taskId, '同意发布任务');

    return { success: true };
};
