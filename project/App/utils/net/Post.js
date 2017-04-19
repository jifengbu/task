'use strict';

module.exports = (url, parameter, success, failed, wait) => {
    console.log(url, 'send:', parameter);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHud();
    }
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(url, 'recv:', data);
        if (wait) {
            app.dismissProgressHud();
        }
        success(data);
    })
    .catch((error) => {
        if (!failed || !failed(error)) {
            Toast('网络错误');
            console.log(url + ':网络错误', error);
            if (wait) {
                app.dismissProgressHud();
            }
        }
    });
};
