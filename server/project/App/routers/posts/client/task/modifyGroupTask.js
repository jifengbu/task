import { TaskGroupModel } from '../../../../models';
import { omitNil } from '../../../../utils';
import updateTaskProgress from '../progress/updateTaskProgress';

export default async ({
    userId,
    taskId,
    examinerId,
    title,
    content,
}) => {
    const modifyTime = Date.now();
    await TaskGroupModel.findByIdAndUpdate(taskId, omitNil({
        examinerId,
        title,
        content,
        modifyTime,
    }));

    return { success: true };
};
