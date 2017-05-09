var { until, post, upload, client: { userId, taskId } } = require('../../utils');
var files = {};

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
            taskId,
            title: '测试任务',
            content: '认真测试',
            audioList: [files['star']],
            imageList: [files['cargo']],
        };

        post('/client/modifyTask', param);
    }
);
