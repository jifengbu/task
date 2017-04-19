'use strict';

function GET (url, success, error) {
    console.log('getSend:', url);
    app.showProgressHud();
    fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log('getRecv:', json);
        app.dismissProgressHud();
        success && success(json);
    })
    .catch((err) => {
        app.dismissProgressHud();
        if (!error || !error(err)) {
            Toast('网络出错');
        }
    });
}

module.exports = GET;
