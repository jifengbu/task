import { TaskGroupModel } from '../../../../models';
import _ from 'lodash';
import createTask from './libs/createTask';
import updateTaskProgress from '../progress/updateTaskProgress';
import startScheduleRemind from './libs/startScheduleRemind';

export default async ({
    userId,
    examinerId,
    title,
    content,
    taskList,
}, { io }) => {
    const publishTime = Date.now();
    const taskIdList = [];
    const expectStartTime = _.minBy(taskList, (o) => o.expectStartTime).expectStartTime;
    const expectFinishTime = _.maxBy(taskList, (o) => o.expectFinishTime).expectFinishTime;

    const doc = new TaskGroupModel({
        publisherId: userId,
        examinerId,
        title,
        content,
        expectStartTime,
        expectFinishTime,
        publishTime: publishTime,
    });

    for (const item of taskList) {
        let task = await createTask({ ...item, groupId: doc.id, publishTime, publisherId: userId, examinerId });
        startScheduleRemind(io, task.id, task.remindList, task.expectStartTime, task.expectFinishTime);
        await updateTaskProgress(userId, task.id, '发布任务');
        taskIdList.push(task.id);
    }
    doc.taskList = taskIdList;
    await doc.save();
    io.emitTo(examinerId, 'NEW_PUBLISH_TASK_NF', doc);

    return { success: true ,context: {
        groupId: doc.id,
        taskIdList:taskIdList,
    }};
};
