import { TaskGroupModel } from '../../../../models';
import createTask from './libs/createTask';
import updateTaskProgress from '../progress/updateTaskProgress';
import startScheduleSendSMS from './libs/startScheduleSendSMS';
import startScheduleRemind from './libs/startScheduleRemind';

export default async ({
    userId,
    executorId,
    supervisorId,
    title,
    content,
    audioList,
    imageList,
    remindList,
    type,
    expectStartTime,
    expectFinishTime,
}, { io }) => {
    const publishTime = Date.now();
    const doc = new TaskGroupModel({
        publisherId: userId,
        title,
        content,
        isSingleTask: true,
        state: 16,
        expectStartTime,
        expectFinishTime,
        publishTime,
    });

    const task = await createTask({
        groupId: doc.id,
        publisherId: userId,
        examinerId: userId,
        executorId,
        supervisorId,
        state: 16,
        title,
        content,
        audioList,
        imageList,
        remindList,
        type,
        expectStartTime,
        expectFinishTime,
        publishTime,
    });

    doc.taskList = [ task.id ];
    await doc.save();
    await updateTaskProgress(userId, task.id, '发布任务');
    io.emitTo([doc.executorId, doc.supervisorId], 'AGREE_PUBLISH_TASK_NF', task);
    startScheduleSendSMS(executorId, task.id); // 发执行者定时
    startScheduleRemind(io, task.id, remindList, expectStartTime, expectFinishTime);

    return { success: true ,context: {
        taskId: task.id,
    } };
};
