var { until, post, upload, client: { userId }, shipper: { shipperId } } = require('../../utils');
var files = {};

function uploadFile (type) {
    var defaultOptions = {
        url: '/uploadFile',
        files: { file: ['img/' + type + '.png'] },
        params: {
            userId: shipperId,
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

uploadFile('proofImg0');
uploadFile('proofImg1');

until(
    () => files['proofImg0'] && files['proofImg1'],
    (cb) => setTimeout(cb, 200),
    () => {
        var param = {
            userId,
            shipperId,
            advise: '建议关门整顿',
            proofs: [ // 证据
                { file: files['proofImg0'], description: '这是第一条评论' },
                { file: files['proofImg1'], description: '这是第二条评论' },
            ],
        };

        post('/client/reportShipper', param);
    }
);
