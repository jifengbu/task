import mongoose from 'mongoose';
import { MediaModel } from '../../../../models';

export default async ({
    userId,
}) => {
    const docs = await MediaModel.find({ ref: 0 });
    docs.forEach((doc) => {
        mongoose.gfs.remove({ _id: doc.gridId });
        doc.remove();
    });
    return { success: true };
};
