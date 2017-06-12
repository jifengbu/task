import { ClientModel } from '../../../../models';

export default async ({ userId, authority }) => {
    const query = ClientModel.find({authority: { $bitsAnySet: authority }});
    const docs = await query
    .select({
        phone: 1,
        email: 1,
        name: 1,
        head: 1,
        post: 1,
    });

    return { success: true, context: {
        clientList: docs,
    } };
};
