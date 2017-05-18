import request from 'superagent';

export default function doRequest (url, data, root) {
    return new Promise((resolve) => {
        if (root && root.user) {
            Object.assign(data, { userId: root.user.userId });
        }
        const req = request
        .post(url)
        .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
        .send(data);

        req.end((error, res) => {
            if (error) {
                console.error('recv error[' + url + ']:', error);
                resolve();
            } else {
                console.log('recv[' + url + ']:', res.body);
                resolve(res.body);
            }
        });
    });
}
