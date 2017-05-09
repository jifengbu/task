var fs = require('fs');
var path = require('path');

var clientPath = path.join(__dirname, 'client.json');
var adminPath = path.join(__dirname, 'admin.json');

var client = {};
var admin = {};

if (fs.existsSync(clientPath)) {
    client = require(clientPath);
}

if (fs.existsSync(adminPath)) {
    admin = require(adminPath);
}

module.exports = {
    client,
    admin,
    saveClient (obj) {
        fs.writeFileSync(clientPath, JSON.stringify(obj));
    },
    saveAdmin (obj) {
        fs.writeFileSync(adminPath, JSON.stringify(obj));
    },
};
