const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3008/?phone=18085192481');

ws.on('open', function() {
    console.log('connected');
    ws.send(JSON.stringify({
        type: 'PUBLISH_TASK_RQ',
        data: {
            "title": "高级任务",
            "description": "高级任务高级任务",
            "startTime": "2017-04-18 15:22:19",
            "endTime": "2017-04-18 15:22:19",
            "supervisor": "王经理",
            "executor": "王东来",
            "remind": "每天提醒1次"
        }
    }));
});

ws.on('message', function(data, flags) {
    console.log(data);
    process.exit(0);
});
