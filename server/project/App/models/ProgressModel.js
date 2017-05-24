import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { formatTime } from '../utils';

const progressSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' }, // 人员ID
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' }, // 任务ID
    info: { type: String }, // 具体内容
    type: { type: Number, default: 0 }, // 类型，0：任务更新，1：任务提醒
    createTime: { type: Date, default: Date.now }, // 创建时间
});

progressSchema.virtual('userName').get(function () {
    return (this.clientId || {}).name || (this.clientId || {}).phone;
});
progressSchema.virtual('content').get(function () {
    if (this.type === 0) {
        return this.info;
    }
    return '提醒一次任务';
});
progressSchema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'createTime');
        delete ret._id;
        delete ret.__v;
        delete ret.clientId;
        delete ret.type;
        delete ret.info;
        return ret;
    },
};
progressSchema.options.toJSON = transform;
progressSchema.options.toObject = transform;

export default mongoose.model('Progress', progressSchema);
