var { until, post, upload, client: { userId } } = require('../../utils');
var files = {};

function uploadFile (type) {
    var defaultOptions = {
        url: '/uploadFile',
        files: { file: ['res/' + type + '.jpg'] },
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

uploadFile('userHead');

until(
    () => files['userHead'],
    (cb) => setTimeout(cb, 200),
    () => {
        var param = {
            userId,
            userName: '方运江',
            sex: 0,
            userHead: files['userHead'],
            birthday: '1982-02-25',
        };

        post('/client/modifyPersonalInfo', param);
    }
);
