const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3008/?phone=18085192480');

ws.on('open', function() {
    console.log('connected');
    ws.send(JSON.stringify({
        type: 'GET_TASK_LIST_RQ',
    }));
});

ws.on('message', function(data, flags) {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
    process.exit(0);
});
