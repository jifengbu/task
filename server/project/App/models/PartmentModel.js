import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { formatTime } from '../utils';

const partmentSchema = new Schema({
    name: { type: String}, // 部门名称
    descript: { type: String}, // 部门描述
    phoneList: [ { type: String} ], // 联系电话
    chargeMan: { type: Schema.Types.ObjectId, ref: 'Client' }, // 负责人
    members: [ { type: Schema.Types.ObjectId, ref: 'Client' } ], // 部门成员

    superior: { type: Schema.Types.ObjectId, ref: 'Partment' }, // 上级部门
    subors: [{ type: Schema.Types.ObjectId, ref: 'Partment' }], // 下属部门

    createTime: { type: Date, default: Date.now }, // 创建时间
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'createTime');
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
partmentSchema.options.toJSON = transform;
partmentSchema.options.toObject = transform;

export default mongoose.model('Partment', partmentSchema);
