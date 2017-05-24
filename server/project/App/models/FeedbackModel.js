import mongoose from 'mongoose';
import { formatTime } from '../utils';
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' }, // 客户Id
    content: { type: String, required: true }, // 反馈内容
    email: { type: String }, // 联系邮箱
    state: { type: Number, default: 0 }, // 申请发卡的状态， 0：未处理，1：处理中，2：已处理
    submitTime: { type: Date, default: Date.now }, // 反馈时间
    acceptTime: { type: Date, default: Date.now }, // 接收时间
    finishTime: { type: Date, default: Date.now }, //处理时间
});

feedbackSchema.virtual('feedbackId').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'submitTime', 'acceptTime', 'finishTime');
        ret.state >= 1 || (ret.acceptTime = undefined);
        ret.state === 2 || (ret.finishTime = undefined);
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
feedbackSchema.options.toJSON = transform;
feedbackSchema.options.toObject = transform;

export default mongoose.model('Feedback', feedbackSchema);
