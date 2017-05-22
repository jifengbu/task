import { TaskGroupModel } from '../../../../models';
import _ from 'lodash';
import createTask from './createTask';

export default async ({
    userId,
    executorId,
    examinerId,
    supervisorId,
    title,
    content,
    taskList,
}) => {
    const publishTime = Date.now();
    const taskIdList = [];
    const needStartTime = _.minBy(taskList, (o)=>o.needStartTime);
    const needEndTime = _.maxBy(taskList, (o)=>o.needEndTime);

    for (const item of taskList) {
        let taskId = await createTask({...item, publishTime});
        taskIdList.push(taskId);
    }
    const doc = new TaskGroupModel({
        publisherId: userId,
        supervisorId,
        taskList: taskIdList,
        needStartTime,
        needEndTime,
        publishTime: publishTime,
    });
    await doc.save();

    return { success: true };
};
