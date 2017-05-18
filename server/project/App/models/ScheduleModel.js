import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import _ from 'lodash';

const scheduleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Client' }, //用户ID
    state: { type: Number, default: 0 }, // state，0：未完成，1，完成
    content: { type: String}, // 具体内容
    time: { type: Date, default: Date.now }, // 提醒时间
});

scheduleSchema.virtual('id').get(function () {
    return this._id;
});

export default mongoose.model('Schedule', scheduleSchema);
