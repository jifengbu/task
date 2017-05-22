import { TaskGroupModel } from '../../../../../models';
import _ from 'lodash';
import createTask from '../libs/createTask';

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
        let taskId = await createTask({...item, groupdId: doc.id, publishTime, publisherId: userId, examinerId});
        taskIdList.push(taskId);
    }
    doc.taskList = taskIdList;
    await doc.save();

    return { success: true };
};
