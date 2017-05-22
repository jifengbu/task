import mongoose from 'mongoose';
import { formatTime, getMediaPath } from '../utils';
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    publisherId: { type: Schema.Types.ObjectId, ref: 'Client' }, //发布人 Id
    examinerId: { type: Schema.Types.ObjectId, ref: 'Client' }, //审批人 Id
    executorId: { type: Schema.Types.ObjectId, ref: 'Client' }, //执行人 Id
    supervisorId: { type: Schema.Types.ObjectId, ref: 'Client' }, //监督人 Id

    title: { type: String }, // 标题
    content: { type: String }, // 内容
    audioList: [{media: { type: Schema.Types.ObjectId, ref: 'Media' }, timelong: { type: Number }}], // 音频列表
    imageList: [{ type: Schema.Types.ObjectId, ref: 'Media' }], // 图片列表

    type:  { type: Number, default: 0 }, // 任务类型，0：一般任务， 1：紧急任务，2：加急任务
    state: { type: Number, default: 1 }, // 任务状态，2^0：待审批，2^1：驳回审批，2^2：待重新审批，2^3：待执行， 2^4：进行中，2^5：待完成审核，2^6：驳回完成审核，2^7：待重新完成审核，2^8：完成

    needStartTime: { type: Date, default: Date.now }, // 需要开始时间
    needEndTime: { type: Date, default: Date.now }, // 需要结束时间

    publishTime: { type: Date, default: Date.now }, // 任务发布时间（包括重新提交审核）
    examineTime: { type: Date, default: Date.now }, // 审核时间（包括驳回审批）
    startExecTime: { type: Date, default: Date.now }, // 开始执行时间
    modifyTime: { type: Date, default: Date.now }, // 修改时间

    applyFinishTime: { type: Date, default: Date.now }, // 申请结束的时间（包括重新申请结束）
    examineFinishTime: { type: Date, default: Date.now }, // 任务结束时间（包括驳回完成审核）
});

taskSchema.virtual('id').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'needStartTime', 'needEndTime', 'publishTime', 'examineTime', 'startExecTime', 'modifyTime', 'applyFinishTime', 'examineFinishTime');
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
