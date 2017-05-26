import { TaskGroupModel, TaskModel } from '../../../../models';
import _ from 'lodash';
import modifyTask from './libs/modifyTask';
import { omitNil } from '../../../../utils';
import { scheduleMgr } from '../../../../managers';
import updateTaskProgress from '../progress/updateTaskProgress';
import startScheduleRemind from './libs/startScheduleRemind';

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
    const oldTask = await modifyTask(omitNil({
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
    if (oldTask) {
        if (
            (expectStartTime || expectFinishTime) &&
            (moment(expectStartTime).isSame(oldTask.expectStartTime) ||
            moment(expectFinishTime).isSame(oldTask.expectFinishTime))
        ) {
            const startT = expectStartTime || oldTask.expectStartTime;
            const finishT = expectFinishTime || oldTask.expectFinishTime;
            scheduleMgr.removeSchedule(taskId);
            startScheduleRemind(taskId, remindList||oldTask.remindList, startT, finishT);
        }

        const group = await TaskGroupModel.findById(oldTask.groupId);
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
