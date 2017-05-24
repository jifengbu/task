import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Client' }, // 用户Id
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' }, // 任务Id
    readTimes: { type: Number, default: 1 }, // 阅读次数
});

schema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
schema.options.toJSON = transform;
schema.options.toObject = transform;

export default mongoose.model('TaskReaded', schema);
