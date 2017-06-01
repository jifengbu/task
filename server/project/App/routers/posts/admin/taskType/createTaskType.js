import { TaskTypeModel } from '../../../../models';

export default ({
    userId,
    key,
    name,
}) => {
    return new Promise(async (resolve) => {
        const doc = new TaskTypeModel({
            key,
            name,
        });
        await doc.save().catch((err)=>{
            resolve({success: false, msg: 'key值重复'});
        });
        resolve({ success: true, context: doc });
    });
};
