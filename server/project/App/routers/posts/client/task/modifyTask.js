import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import modifyTask from './libs/modifyTask';
import { omitNil } from '../../../../utils';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({
    userId,
    taskId,
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
    const modifyTime = Date.now();
    const groupId = await modifyTask(omitNil({
        taskId,
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
        modifyTime,
    }));

    if (groupId) {
        const group = await TaskGroupModel.findById(groupId);
        if (group.isSingleTask) {
            await group.update(omitNil({
                title,
                content,
                expectStartTime,
                expectFinishTime,
                modifyTime,
            }));
        } else {
            let _expectStartTime = expectStartTime;
            let _expectFinishTime = expectFinishTime;
            if (expectStartTime || expectFinishTime) {
                for (const id of group.taskList) {
                    let task = await TaskModel.findById(id);
                    task = task.toObject();
                    if (expectStartTime) {
                        _expectStartTime = _.min([_expectStartTime, task.expectStartTime]);
                    }
                    if (expectStartTime) {
                        _expectFinishTime = _.max([_expectFinishTime, task.expectFinishTime]);
                    }
                }
            }
            await group.update(omitNil({
                title,
                content,
                expectStartTime: _expectStartTime,
                expectFinishTime: _expectFinishTime,
                modifyTime,
            }));
        }
    }
    await updateTaskProgress(userId, taskId, '修改了任务');

    return { success: true };
};
