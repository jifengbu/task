var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fs = require('fs');

var deskey = "SV#Y!jAz";
var app = express();
var server = http.Server(app);

app.TIMEOUT = 100;
var modules = [
    'websocket',
];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.send = function(req, res, str) {
    console.log(req.headers);
    // console.log("recv:", req.body);
    setTimeout(function() {
        // console.log("send:", str);
        res.send(str);
    }, app.TIMEOUT);
};

app.sendFile = function(req, res, filename) {
    app.send(req, res, fs.readFileSync(filename, 'utf8'));
};

app.sendObj = function(req, res, obj) {
    app.send(req, res, JSON.stringify(obj));
};

app.subPost = function(url, callback) {
    app.post('/app/api'+url, function(req, res) {
        callback(req, res, JSON.parse(req.body));
    });
};

for (var i in modules) {
    require('./modules/'+modules[i]).register(app, server);
}

server.listen(3008, function() {
    console.log("server listen on: http://localhost:3008");
});
