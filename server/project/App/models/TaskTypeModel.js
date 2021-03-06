import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    key: { type: Number, unique: true }, // key
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

export default mongoose.model('TaskType', schema);
