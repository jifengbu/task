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
    const expectStartTime = _.minBy(taskList, (o)=>o.expectStartTime).expectStartTime;
    const expectFinishTime = _.maxBy(taskList, (o)=>o.expectFinishTime).expectFinishTime;

    for (const item of taskList) {
        let taskId = await createTask({...item, publishTime});
        taskIdList.push(taskId);
    }
    const doc = new TaskGroupModel({
        publisherId: userId,
        examinerId,
        taskList: taskIdList,
        expectStartTime,
        expectFinishTime,
        publishTime: publishTime,
    });
    await doc.save();

    return { success: true };
};
