import { TaskGroupModel } from '../../../../models';
import { omitNil } from '../../../../utils';

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
