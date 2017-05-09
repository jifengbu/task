import mongoose from 'mongoose';
import { MediaModel } from '../../../models';
import { getMediaPath } from '../../../utils/';

export default ({
    userId,
}, file) => {
    return new Promise(async (resolve) => {
        const gridId = file.grid._id;
        const media = new MediaModel({
            gridId,
        });
        const doc = await media.save();
        if (doc) {
            resolve({ success: true, context: { url: getMediaPath(doc._id) } });
        } else {
            mongoose.gfs.remove({ _id: gridId });
            resolve({ success: false, msg: '上传失败' });
        }
    });
};
