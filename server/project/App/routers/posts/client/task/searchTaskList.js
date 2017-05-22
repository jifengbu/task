import { TaskModel } from '../../../../models';
import { getKeywordCriteriaForTask } from '../../../../utils';

export default async ({ userId, keyword, pageNo, pageSize }) => {
    const criteria = getKeywordCriteriaForTask(keyword);
    const query = TaskModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
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
