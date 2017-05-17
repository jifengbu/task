import { PartmentModel } from '../../../../models';
import { getKeywordCriteriaForPartment } from '../../../../utils';

export default async ({ userId, keyword, pageNo, pageSize }) => {
    const criteria = getKeywordCriteriaForPartment(keyword);
    const count = pageNo===0 ? await PartmentModel.count(criteria) : undefined;
    const query = PartmentModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        name: 1,
        descript: 1,
        phoneList: 1,
        chargeMan: 1,
        members: 1,
        superior: 1,
        subors: 1,
    });

    return { success: true, context: {
        count,
        partmentList: docs,
    } };
};
