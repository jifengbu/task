'use strict';

const FileTransfer = require('@remobile/react-native-file-transfer');

function UPLOAD (filePath, url, options, onprogress, success, failed, wait) {
    console.log(url, 'send:', options);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHud();
    }
    const fileTransfer = new FileTransfer();
    fileTransfer.onprogress = onprogress;
    fileTransfer.upload(filePath, app.route.ROUTE_UPDATE_FILE, (res) => {
        let json = {};
        try {
            json = JSON.parse(res.response);
        } catch (error) {
            if (!failed || !failed(error)) {
                Toast('数据解析错误');
                if (wait) {
                    app.dismissProgressHud();
                }
            }
        }
        console.log(url, 'recv:', json);
        app.dismissProgressHud();
        success(json);
    }, (err) => {
        if (!failed || !failed(err)) {
            Toast('上传失败');
            if (wait) {
                app.dismissProgressHud();
            }
        }
    }, options);
}

module.exports = UPLOAD;
