import { TaskGroupModel } from '../../../../models';
import _ from 'lodash';
import createTask from './createTask';

export default async ({
    userId,
    examinerId,
    title,
    content,
    taskList,
}) => {
    const publishTime = Date.now();
    const taskIdList = [];
    const needStartTime = _.minBy(taskList, (o)=>o.needStartTime).needStartTime;
    const needEndTime = _.maxBy(taskList, (o)=>o.needEndTime).needEndTime;

    for (const item of taskList) {
        let taskId = await createTask({...item, publishTime});
        taskIdList.push(taskId);
    }
    const doc = new TaskGroupModel({
        publisherId: userId,
        examinerId,
        taskList: taskIdList,
        needStartTime,
        needEndTime,
        publishTime: publishTime,
    });
    await doc.save();

    return { success: true };
};
