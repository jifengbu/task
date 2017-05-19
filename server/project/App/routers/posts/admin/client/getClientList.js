import { ClientModel } from '../../../../models';
import { getKeywordCriteriaForClient } from '../../../../utils';

export default async ({ userId, keyword, pageNo, pageSize }) => {
    const criteria = getKeywordCriteriaForClient(keyword);
    const count = pageNo===0 ? await ClientModel.count(criteria) : undefined;
    const query = ClientModel.find(criteria).sort({ registerTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        phone: 1,
        email: 1,
        name: 1,
        head: 1,
        post: 1,
        partment: 1,
        reservePhone: 1,
        partment: 1,
    }).populate({
        path: 'partment',
        select: { name: 1 },
    });

    return { success: true, context: {
        count,
        clientList: docs,
    } };
};
