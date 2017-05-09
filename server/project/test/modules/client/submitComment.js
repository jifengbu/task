var { until, post, upload, client: { userId }, shipper: { roadmapId } } = require('../../utils');
var files = {};

function uploadFile (type) {
    var defaultOptions = {
        url: '/uploadFile',
        files: { file: ['img/' + type + '.png'] },
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

uploadFile('commentImg0');
uploadFile('commentImg1');

until(
    () => files['commentImg0'] && files['commentImg1'],
    (cb) => setTimeout(cb, 200),
    () => {
        var param = {
            userId,
            roadmapId,
            content: '这是一个测试',
            imgList: [files['commentImg0'], files['commentImg1']],
        };

        post('/client/submitComment', param);
    }
);
