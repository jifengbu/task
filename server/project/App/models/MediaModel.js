import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import _ from 'lodash';

const mediaSchema = new Schema({
    ref: { type: Number, default: 0 }, // 文件引用次数，初次上传的时候，ref为1，当文件被使用一次，ref+1, 被弃用一次，ref-1，当ref为0的时候删除文件和记录
    type: { type: Number, default: 0 }, // 文件类型，0：图片，1，音频，2，视频
    gridId: { type: Schema.Types.ObjectId }, // 在gridfs中的id
});

mediaSchema.statics._updateRef = function (...params) {
    let obj = _.mergeWith(...params, (x, y) => (x || 0) + (y || 0));
    _.map(obj, (value, key) => {
        if (key !== 'undefined' && value !== 0) {
            this.findByIdAndUpdate(key, { $inc: { ref: value } }).exec();
        }
    });
};

export default mongoose.model('Media', mediaSchema);
