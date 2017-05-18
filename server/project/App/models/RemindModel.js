import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import _ from 'lodash';

const remindSchema = new Schema({
    defaultRemindRule: { type: String}, // 默认提醒规则
    customRemindTime: { type: Date, default: Date.now }, // 自定义提醒时间
});

remindSchema.virtual('id').get(function () {
    return this._id;
});

export default mongoose.model('Remind', remindSchema);
