import { PartmentModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    partmentId,
}) => {
    const doc = await PartmentModel.findByIdAndRemove(partmentId);
    return { success: true };
};
