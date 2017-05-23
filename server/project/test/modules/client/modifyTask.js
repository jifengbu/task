var { until, post, upload, client: { userId } } = require('../../utils');
var files = {};
var args = process.argv.splice(2);

function uploadFile (type, filetype) {
    var defaultOptions = {
        url: '/uploadFile',
        files: { file: ['res/' + type + '.' + (filetype || 'jpg')] },
        params: {
            userId,
        },
    };

    upload(defaultOptions).then(function (data) {
        console.log(data);
        console.log('end');
        const obj = JSON.parse(data);
        files[type] = obj.context.url;
    }, function () {
        console.log('error', arguments);
    }, function (progress) {
        console.log('upload progress', progress);
    });
}

uploadFile('cargo');
uploadFile('star', 'mp3');

until(
    () => files['cargo'] && files['star'],
    (cb) => setTimeout(cb, 200),
    () => {
        var param = {
            userId,
            taskId: args[0],
            title: '测试任务1',
            content: '认真测试1',
            audioList: [{url: files['star'], duration: 100}],
            imageList: [files['cargo']],
            expectStartTime: '2017-03-15 03:00:00',
        };

        post('/client/modifyTask', param);
    }
);
