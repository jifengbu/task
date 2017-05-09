var request = require('superagent');
var { apiRoot, port } = require('../../config');
var { host } = require('../config');

module.exports = (api, param) => {
    console.log('send', JSON.stringify(param, null, 2));
    return new Promise((resolve) => {
        const req = request
        .post('http://' + host + ':' + port + apiRoot + api)
        .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
        .send(param);

        req.end((error, res) => {
            if (error) {
                console.error('recv error:', error);
                resolve();
            } else {
                console.log('recv:', JSON.stringify(res.body, null, 2));
                resolve(res.body);
            }
        });
    });
};
