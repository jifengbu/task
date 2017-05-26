import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import mongoose from 'mongoose';
import moment from 'moment';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({ userId, taskId }, { io }) => {
    const doc = await TaskModel.findByIdAndUpdate(taskId, { state: 128, examineFinishTime: Date.now() });
    console.log(moment('2017-03-15 03:00:00').isSame(doc.expectStartTime));
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
    await updateTaskProgress(userId, taskId, '同意完成任务');

    io.emitTo(doc.executorId, 'AGREE_FINISH_TASK_NF', doc);

    return { success: true };
};
