var { until, post, upload, client: { userId }, shipper: { shipperId, roadmapId } } = require('../../utils');
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
            receiverId: '18085192490',
            roadmapId,
            shipperId,
            embraceType: 0,
            cargoAddress: { latitude: 10, longitude: 10, name: '小河区长江路' },
            weight: 100,
            size: { length: 20, width: 3, height: 3 },
            descriptList : [{
                img: files['cargo'],
                text: '海鲜',
            }],
            worth: 10000,
            remark: '务必周五之前送到',

        };

        post('/client/placeOrder', param);
    }
);
