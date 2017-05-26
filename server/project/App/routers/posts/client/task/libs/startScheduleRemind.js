import schedule from 'node-schedule';
import moment from 'moment';
import { TaskModel } from '../../../../../models';
import { scheduleMgr } from '../../../../../managers';

// 1：每天提醒1次（早上8:00）
// 2：每天提醒2次（早上8：00，下午13:00）
// 3：任务结束的最后10天提醒（每天提醒一次 早上9:00）
// 4：任务结束的最后5天提醒（每天提醒一次 早上9:00）
// 5：任务结束的最后3天提醒（每天提醒一次 早上9:00）
// 6：任务结束的最后1天提醒（每天提醒2次早上8：00，下午13:00）
// 7：任务执行的中间时期  提醒2天（早上8：00，下午13:00)

async function remind (io, taskId, sch) {
    const task = await TaskModel.findById(taskId);
    if (task.state === 128) {
        sch.cancel();
    }
    io.emitTo([task.publisherId, task.examinerId, task.state >= 32 && task.executorId, task.state >= 32 && task.supervisorId], 'REMIND_TASK_NF', task);
}

export default async (io, taskId, remindList, startTime, EndTime) => {
    for (const index of remindList) {
        startTime = moment(startTime);
        EndTime = moment(EndTime);
        if (index == 1) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = 8;
            rule.minute = 0;
            const sch = schedule.scheduleJob(rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 2) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [8, 13];
            rule.minute = 0;
            const sch = schedule.scheduleJob(rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 3) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [9];
            rule.minute = 0;
            const start = EndTime.subtract(9, 'd').toDate();
            const end = EndTime.toDate();
            const sch = schedule.scheduleJob(start, end, rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 4) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [9];
            rule.minute = 0;
            const start = EndTime.subtract(5, 'd').toDate();
            const end = EndTime.toDate();
            const sch = schedule.scheduleJob(start, end, rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 5) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [9];
            rule.minute = 0;
            const start = EndTime.subtract(3, 'd').toDate();
            const end = EndTime.toDate();
            const sch = schedule.scheduleJob(start, end, rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 6) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [8, 13];
            rule.minute = 0;
            const start = EndTime.subtract(1, 'd').toDate();
            const end = EndTime.toDate();
            const sch = schedule.scheduleJob(start, end, rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        } else if (index == 7) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = [8, 13];
            rule.minute = 0;
            const diffDay = Math.floor(EndTime.diff(startTime) / 86400000 / 2);
            const start = startTime.add(diffDay - 1, 'd').toDate();
            const end = EndTime.subtract(diffDay + 1, 'd').toDate();
            const sch = schedule.scheduleJob(start, end, rule, () => {
                remind(taskId, sch);
            });
            scheduleMgr.addSchedule(taskId, sch);
        }
    }
};
