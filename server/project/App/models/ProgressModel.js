import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import _ from 'lodash';

const progressSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' }, //任务ID
    content: { type: String}, // 具体内容
    time: { type: Date, default: Date.now }, // 提醒时间
});

scheduleSchema.virtual('id').get(function () {
    return this._id;
});

export default mongoose.model('Progress', mediaSchema);
