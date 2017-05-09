import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { formatTime, formatMedia } from '../utils';
const Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true }, // 注册电话
    email: { type: String }, // 注册邮箱，用来找回密码
    name: { type: String }, // 姓名
    sex: { type: Number, default: 0 }, // 性别 0:男   1:女
    age: { type: Number, default: 0 }, // 年龄
    head: { type: Schema.Types.ObjectId, ref: 'Media' }, // 用户头像
    birthday: { type: String }, // 生日
    reservePhone: [{ type: String }], // 预备电话
    registerTime: { type: Date, default: Date.now }, // 注册时间
});
clientSchema.plugin(passportLocalMongoose, { usernameField: 'phone' });

clientSchema.virtual('userId').get(function () {
    return this._id;
});

const transform = {
    virtuals: true,
    transform: function (doc, ret, options) {
        formatTime(ret, 'registerTime');
        formatMedia(ret, 'head');
        delete ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
};
clientSchema.options.toJSON = transform;
clientSchema.options.toObject = transform;

export default mongoose.model('Client', clientSchema);
