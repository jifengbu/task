import mongoose from 'mongoose';
import { MediaModel } from '../../../models';

export default ({
    id,
}) => {
    return new Promise(async (resolve) => {
        const { gfs } = mongoose;
        let doc = await MediaModel.findById(id);
        if (!doc) {
            resolve(404);
        } else {
            resolve(gfs.createReadStream({ _id: doc.gridId }));
        }
    });
};
