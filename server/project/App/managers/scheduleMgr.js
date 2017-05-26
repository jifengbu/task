
class Manager {
    constructor () {
        this.list = {};
    }
    addSchedule(taskId, sch) {
        if (!this.list[taskId]) {
            this.list[taskId] = [];
        }
        this.list[taskId].push(sch);
    }
    removeSchedule(taskId) {
        _.forEach(this.list[taskId], (sch)=>{
            sch.cancel();
        });
        delete this.list[taskId];
    }
}

module.exports = new Manager();
