const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3008/?phone=18085192481');

ws.on('open', function() {
    console.log('connected');
    ws.send(JSON.stringify({
        type: 'APPLY_TASK_RQ',
        data: {
            "title": "总任务",
            "description": "总任务总任务总任务",
            "startTime": "2015-09-29 10:10:10",
            "endTime": "2015-09-29 10:10:10",
            "supervisor": "嘎嘎嘎",
            "executor": "嘎嘎嘎",
            "remind": "不用设置",
            "taskList": [
                {   "id": 10001,
                    "title": "高级任务",
                    "description": "高级任务高级任务",
                    "startTime": "2015-09-29 10:10:10",
                    "endTime": "2015-09-29 10:10:10",
                    "supervisor": "嘎嘎嘎",
                    "executor": "嘎嘎嘎",
                    "remind": "不用设置"
                },
                {
                    "id": 10002,
                    "title": "高级任务",
                    "description": "高级任务高级任务",
                    "startTime": "2015-09-29 10:10:10",
                    "endTime": "2015-09-29 10:10:10",
                    "supervisor": "嘎嘎嘎",
                    "executor": "嘎嘎嘎",
                    "remind": "不用设置"
                }
            ]
        }
    }));
});

ws.on('message', function(data, flags) {
    console.log(data);
    process.exit(0);
});
