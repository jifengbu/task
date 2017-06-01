import { TaskTypeModel } from '../../../../models';
import { omitNil } from '../../../../utils';

export default ({
    userId,
    taskTypeId,
    key,
    name,
}) => {
    return new Promise(async (resolve) => {
        const doc = await TaskTypeModel.findByIdAndUpdate(taskTypeId, omitNil({
            key,
            name,
        }), { new: true }).select({
            key: 1,
            name: 1,
        }).catch((err)=>{
            resolve({success: false, msg: 'key值重复'});
        });
        if (!doc) {
            resolve({ success: false, msg: '修改失败' });
        }

        resolve({ success: true, context: doc });
    });
};
