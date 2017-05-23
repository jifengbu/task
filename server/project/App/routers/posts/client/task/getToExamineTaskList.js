import { TaskGroupModel } from '../../../../models';

export default async ({ userId, pageNo, pageSize }) => {
    const criteria = {examinerId: userId, state: 1}
    const query = TaskGroupModel.find(criteria).sort({ publishTime: 'desc' }).skip(pageNo * pageSize).limit(pageSize);
    const docs = await query
    .select({
        title: 1,
        content: 1,
        modifyTime: 1,
        expectStartTime: 1,
        expectFinishTime: 1,
        isSingleTask: 1,
        taskList: 1,
    });

    const taskList = docs.map((item)=>{
        item = item.toObject();
        if (item.isSingleTask) {
            item.id = item.taskList[0];
        } else {
            item.taskNumbers = item.taskList.length;
        }
        delete item.taskList;
        return item;
    })

    return { success: true, context: {
        taskList,
    } };
};
