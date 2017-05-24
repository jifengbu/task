import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { formatTime, formatMedia } from '../utils';

const scheduleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Client' }, // 用户ID
    state: { type: Number, default: 0 }, // state，0：未完成，1，完成
    content: { type: String }, // 具体内容
    createTime: { type: Date, default: Date.now }, // 创建时间
    modifyTime: { type: Date, default: Date.now }, // 创建时间
    remaindTime: { type: Date, default: Date.now }, // 提醒时间
});

scheduleSchema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'createTime, modifyTime, remaindTime');
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
scheduleSchema.options.toJSON = transform;
scheduleSchema.options.toObject = transform;

export default mongoose.model('Schedule', scheduleSchema);
