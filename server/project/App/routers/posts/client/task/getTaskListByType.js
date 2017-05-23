import { TaskModel } from '../../../../models';
import { getKeywordCriteriaForTask } from '../../../../utils';

export default async ({ userId, type, keyword, pageNo, pageSize }) => {
    const criteria = getKeywordCriteriaForTask(keyword, {type});
    const query = TaskModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        title: 1,
        content: 1,
        type: 1,
        modifyTime: 1,
        expectFinishTime: 1,
    });

    return { success: true, context: {
        taskList: docs,
    } };
};
