import { TaskGroupModel } from '../../../../models';
import createTask from './libs/createTask';
import updateTaskProgress from '../progress/updateTaskProgress';

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
}) => {
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

    return { success: true };
};
