var data = require('./data');

function until (test, iterator, callback) {
    if (!test()) {
        iterator((err) => {
            if (err) {
                return callback(err);
            }
            until(test, iterator, callback);
        });
    } else {
        callback();
    }
}

module.exports = Object.assign(data, {
    post: require('./post'),
    upload: require('./upload'),
    until,
});
