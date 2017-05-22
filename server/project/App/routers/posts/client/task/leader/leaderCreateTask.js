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
    const doc = new TaskGroupModel({
        publisherId: userId,
        title,
        content,
        isSingleTask: true,
        state: 8,
        expectStartTime,
        expectFinishTime,
        publishTime,
    });
    const taskId = await createTask({
        groupId: doc.id;
        publisherId: userId,
        examinerId: userId,
        executorId,
        supervisorId,
        state: 8,
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

    return { success: true };
};
