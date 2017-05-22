import { Schema, model } from 'mongoose';
import { formatTime, getMediaPath } from '../utils';

const schema = new Schema({
    key: { type: String }, // key
    name: { type: String }, // 标题
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

export default model('TaskGroup', schema);
