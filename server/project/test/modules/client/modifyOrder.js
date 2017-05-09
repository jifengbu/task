var { until, post, upload, client: { userId, orderId } } = require('../../utils');
var files = {};

function uploadFile (type, filetype) {
    var defaultOptions = {
        url: '/uploadFile',
        files: { file: ['img/' + type + '.' + (filetype || 'jpg')] },
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

until(
    () => files['cargo'],
    (cb) => setTimeout(cb, 200),
    () => {
        var param = {
            userId,
            orderId,
            size: { length: 21, width: 3, height: 3 },
            descriptList: [{
                img: files['cargo'],
                text: '海鲜(包括一些石油)',
            }],
            embraceAddress: { latitude: 10, longitude: 10, name: '小河区黄河路' },
        };

        post('/client/modifyOrder', param);
    }
);
