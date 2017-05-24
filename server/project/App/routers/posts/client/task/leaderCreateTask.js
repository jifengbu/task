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

    const taskId = await createTask({
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

    doc.taskList = [ taskId ];
    await doc.save();
    await updateTaskProgress(userId, taskId, '发布任务');

    return { success: true };
};