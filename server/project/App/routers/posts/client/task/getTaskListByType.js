import { TaskGroupModel } from '../../../../models';

export default async ({ userId, type, pageNo, pageSize }) => {
    const criteria = {type}
    const query = TaskGroupModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        title: 1,
        content: 1,
        modifyTime: 1,
        expectFinishTime: 1,
    });

    return { success: true, context: {
        count,
        taskList: docs,
    } };
};
