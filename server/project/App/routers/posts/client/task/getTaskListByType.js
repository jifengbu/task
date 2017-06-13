import _ from 'lodash';
import { TaskModel, PartmentModel } from '../../../../models';
import { getKeywordCriteriaForTask } from '../../../../utils';

export default async ({ userId, type, keyword, pageNo, pageSize }) => {
    let users = [userId];
    const partment = await PartmentModel.findOne({ chargeMan: userId }).select({
        members: 1,
        subors: 1,
    }).populate({
        path: 'subors',
        select: { chargeMan: 1 },
    });
    if (partment) {
        users = _.uniqBy(users.concat(partment.members, partment.subors.map((o) => o.chargeMan)), (o) => o.toString());
    }

    const criteria = getKeywordCriteriaForTask(keyword, { type, state: {$gte: 4}, $or: [
        { publisherId: { $in: users } },
        { examinerId: { $in: users } },
        { executorId: { $in: users } },
        { supervisorId: { $in: users } },
    ] });

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
