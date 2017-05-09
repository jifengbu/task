import mongoose from 'mongoose';
import { formatTime, getMediaPath } from '../utils';
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    publisherId: { type: Schema.Types.ObjectId, ref: 'Client' }, //发布人 Id
    executorId: { type: Schema.Types.ObjectId, ref: 'Client' }, //执行人 Id

    title: { type: String }, // 标题
    content: { type: String }, // 内容
    audioList: [{ type: Schema.Types.ObjectId, ref: 'Media' }], // 音频列表
    imageList: [{ type: Schema.Types.ObjectId, ref: 'Media' }], // 图片列表

    type:  { type: Number, default: 0 }, // 任务类型，0：一般任务， 1：紧急任务，2：加急任务
    state: { type: Number, default: 0 }, // 任务状态，0：正常， 1：完成

    startTime: { type: Date, default: Date.now }, // 任务开始时间
    endTime: { type: Date, default: Date.now }, // 任务结束时间
    publishTime: { type: Date, default: Date.now }, // 任务发布时间
});

taskSchema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'startTime', 'endTime', 'publishTime');
        ret.audioList  && (ret.audioList = ret.audioList.map((o) => getMediaPath(o)));
        ret.imageList  && (ret.imageList = ret.imageList.map((o) => getMediaPath(o)));
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
taskSchema.options.toJSON = transform;
taskSchema.options.toObject = transform;

export default mongoose.model('Task', taskSchema);
