import mongoose from 'mongoose';
import moment from 'moment';
import _ from 'lodash';
import { TaskModel } from '../../../../models';


export default async ({
    userId,
    typeList,
}) => {
    // 计算个人任务完成情况
    const mywork = await TaskModel.aggregate()
    .match({ executorId: new mongoose.Types.ObjectId(userId) })
    .group({
        _id: null,
        finish: { $sum: { $cond: { if: { $eq: ['$state', 128] }, then: 1, else: 0 } } },
        unfinish: { $sum: { $cond: { if: { $or:[ {$eq: ['$state', 16]}, {$eq: ['$state', 32]}, {$eq: ['$state', 64]} ] }, then: 1, else: 0 } } },
    });
    const { finish = 0, unfinish = 0 } = mywork[0] || {};

    const startMonth = moment().startOf('month').toDate();
    const startQuarter = moment().startOf('month').subtract(moment().month()%3, 'M').toDate();
    const startYear = moment().startOf('year').toDate();
    const length = typeList.length;

    //计算月，季度，年的任务比例
    let criteria = {};
    typeList.forEach((t, k)=>{
        criteria = {
            ...criteria,
            [3*k]: { $sum: { $cond: { if: { $and: [{ $gte: ['$publishTime', startMonth] }, { $eq: ['$type', t] }] }, then: 1, else: 0 } } },
            [3*k+1]: { $sum: { $cond: { if: { $and: [{ $gte: ['$publishTime', startQuarter] }, { $eq: ['$type', t] }] }, then: 1, else: 0 } } },
            [3*k+2]: { $sum: { $cond: { if: { $and: [{ $gte: ['$publishTime', startYear] }, { $eq: ['$type', t] }] }, then: 1, else: 0 } } },
        };
    })

    const publishTask = await TaskModel.aggregate()
    .group({
        _id: null,
        ...criteria,
    });

    const publishTaskInfo = _.values(_.omit(publishTask[0] || {}, '_id'));


    //计算月，季度，年的完成任务比例
    const finishTask = await TaskModel.aggregate()
    .match({ state: 128 })
    .group({
        _id: null,
        mf: { $sum: { $cond: { if: { $and: [{$eq: ['$publishTime', startMonth]}, { $gte: ['$examineFinishTime', startMonth] }, { $eq: ['$state', 128] }] }, then: 1, else: 0 } } },
        muf: { $sum: { $cond: { if: {$and: [{$eq: ['$publishTime', startMonth]}, { $ne: ['$state', 128] }]}, then: 1, else: 0 } } },
        qf: { $sum: { $cond: { if: { $and: [{$eq: ['$publishTime', startQuarter]}, { $gte: ['$examineFinishTime', startQuarter] }, { $eq: ['$state', 128] }] }, then: 1, else: 0 } } },
        quf: { $sum: { $cond: { if: {$and: [{$eq: ['$publishTime', startQuarter]}, { $ne: ['$state', 128] }]}, then: 1, else: 0 } } },
        yf: { $sum: { $cond: { if: { $and: [{$eq: ['$publishTime', startYear]}, { $gte: ['$examineFinishTime', startYear] }, { $eq: ['$state', 128] }] }, then: 1, else: 0 } } },
        yuf: { $sum: { $cond: { if: {$and: [{$eq: ['$publishTime', startYear]}, { $ne: ['$state', 128] }]}, then: 1, else: 0 } } },
    });

    const finishTaskInfo = finishTask[0] || {};

    //计算各个人的统计信息
    const finishDetail = await TaskModel.aggregate()
    .lookup({
        from: 'clients',
        localField: 'executorId',
        foreignField: '_id',
        as: 'executor',
    })
    .project({ executor: { $arrayElemAt: ['$executor.name', 0] }, state: 1 })
    .group({
        _id: '$executor',
        finish: { $sum: { $cond: { if: {$eq: ['$state', 128]}, then: 1, else: 0 } } },
        unfinish: { $sum: { $cond: { if: {$ne: ['$state', 128]}, then: 1, else: 0 } } },
    })

    return { success: true, context: {
        mywork: {finish, unfinish},
        publishTask: {
            month: publishTaskInfo.slice(0, length),
            quarter:  publishTaskInfo.slice(length, length*2),
            year:  publishTaskInfo.slice(length*2, length*3),
        },
        finishTask: {
            month: {finish: finishTaskInfo.mf, unfinish: finishTaskInfo.muf},
            quarter:  {finish: finishTaskInfo.qf, unfinish: finishTaskInfo.quf},
            year:  {finish: finishTaskInfo.yf, unfinish: finishTaskInfo.yuf},
        },
        finishDetail: finishDetail.map(o=>{o.name=o._id;delete o._id; return o})
    } };
    return {a: 1};
};
