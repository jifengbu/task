import { TaskGroupModel } from '../../../../models';
import createTask from './createTask';

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
    needStartTime,
    needEndTime,
}) => {
    const publishTime = Date.now();
    const taskId = await createTask({
        publisherId: userId,
        executorId,
        supervisorId,
        title,
        content,
        audioList,
        imageList,
        remindList,
        type,
        needStartTime,
        needEndTime,
        publishTime,
    });
    const doc = new TaskGroupModel({
        publisherId: userId,
        supervisorId,
        taskList: [ taskId ],
        needStartTime,
        needEndTime,
        publishTime,
    });
    await doc.save();

    return { success: true };
};
