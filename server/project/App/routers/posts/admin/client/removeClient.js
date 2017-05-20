import { ClientModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    clientId,
}) => {
    const doc = await ClientModel.findByIdAndRemove(clientId);
    return { success: true };
};
