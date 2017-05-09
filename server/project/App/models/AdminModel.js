import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { getMediaPath } from '../utils';
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true }, // 注册电话
    email: { type: String }, // 注册邮箱，用来找回密码
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'phone' });

export default mongoose.model('Admin', adminSchema);
