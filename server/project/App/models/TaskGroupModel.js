import mongoose from 'mongoose';
import { formatTime, getMediaPath } from '../utils';
const Schema = mongoose.Schema;

const taskGroupSchema = new mongoose.Schema({
    publisherId: { type: Schema.Types.ObjectId, ref: 'Client' }, //发布人 Id（和各个子任务必须相同）
    examinerId: { type: Schema.Types.ObjectId, ref: 'Client' }, //审批人 Id（和各个子任务必须相同）
    taskList: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // 子任务列表

    title: { type: String }, // 标题
    content: { type: String }, // 内容

    state: { type: Number, default: 1 }, // 任务状态，是子任务的状态组合

    needStartTime: { type: Date, default: Date.now }, // 需要任务开始时间（子任务的最小开始时间）
    needEndTime: { type: Date, default: Date.now }, // 需要任务结束时间（子任务的最大结束时间）
    publishTime: { type: Date, default: Date.now }, // 任务发布时间
});

taskGroupSchema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'needStartTime', 'needEndTime', 'publishTime');
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
taskGroupSchema.options.toJSON = transform;
taskGroupSchema.options.toObject = transform;

export default mongoose.model('TaskGroup', taskGroupSchema);
