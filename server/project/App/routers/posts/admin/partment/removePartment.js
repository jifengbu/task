import { PartmentModel, MediaModel } from '../../../../models';

export default async ({
    userId,
    partmentId,
}) => {
    const doc = await PartmentModel.findByIdAndRemove(partmentId);
    if (doc) {
        MediaModel._updateRef(
            ...doc.audioList.map((item) => ({ [item]: -1 })),
        );
        MediaModel._updateRef(
            ...doc.imageList.map((item) => ({ [item]: -1 })),
        );
    }
    return { success: true };
};
