import { TaskGroupModel } from '../../../../../models';
import createTask from '../libs/createTask';

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
    const taskId = await createTask({
        publisherId: userId,
        examinerId: userId,
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
        publishTime,
    });
    const doc = new TaskGroupModel({
        publisherId: userId,
        taskList: [ taskId ],
        expectStartTime,
        expectFinishTime,
        publishTime,
    });
    await doc.save();

    return { success: true };
};
