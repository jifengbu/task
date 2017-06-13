import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import createTask from './libs/createTask';
import updateTaskProgress from '../progress/updateTaskProgress';
import startScheduleRemind from './libs/startScheduleRemind';

export default async ({
    userId,
    taskId,
}, { io }) => {
    const publishTime = Date.now();
    const task = await TaskModel.findByIdAndUpdate(taskId, {state: 1});
    if (!task) {
        return {success: false, msg: '提交失败'};
    }
    const taskIdList = [taskId];
    const expectStartTime = task.expectStartTime;
    const expectFinishTime = task.expectFinishTime;
    const title = task.title;
    const content = task.content;
    const examinerId = task.examinerId;

    let group = await TaskGroupModel.findOneAndUpdate({taskList: taskIdList}, {state: 1, publishTime});
    if (!group) {
        group = new TaskGroupModel({
            publisherId: userId,
            examinerId,
            title,
            content,
            taskList: taskIdList,
            expectStartTime,
            expectFinishTime,
            publishTime: publishTime,
        });
        await group.save();
    }
    await updateTaskProgress(userId, taskId, '重新发布任务');
    io.emitTo(examinerId, 'NEW_PUBLISH_TASK_NF', group);

    return { success: true };
};
