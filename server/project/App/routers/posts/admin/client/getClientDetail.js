import { ClientModel } from '../../../../models';

export default async ({
    userId,
    clientId,
}) => {
    const doc = await ClientModel.findById(clientId);
    if (!doc) {
        return { success: false, msg: '没有相关信息的人员' };
    }
    return { success: true, context: doc };
};
