var { apiRoot, port } = require('../../config');
var { host } = require('../config');

var fs = require('fs');
var path = require('path');
var http = require('http');
var UrlParse = require('url').parse;

function uploadForm (req, forms, i, endFlag) {
    const form = forms[i];
    if (form) {
        const { content, fileSize, filePath } = form;
        let chunk = 0;

        req.write(content);
        if (fileSize) {
            fs.createReadStream(filePath, { bufferSize: 4 * 1024 }).on('error', (e) => {
                console.log(filePath + ': error on filestream', e);
            }).on('end', () => {
                console.log(filePath + ': upload end');
                uploadForm(req, forms, i + 1, endFlag);
            }).on('data', (data) => {
                chunk += data.length;
                let percentage = 0;
                if (fileSize !== 0) {
                    percentage = Math.floor((100 * chunk) / fileSize);
                }
                console.log(filePath + ': upload progress', percentage, '%', 'uploaded:', chunk, 'fileSize:', fileSize);
            }).pipe(req, { end: false });
        } else if (content) {
            uploadForm(req, forms, i + 1, endFlag);
        }
    } else {
        req.end(endFlag);
    }
}

function upload (options) {
    return new Promise((resolve, reject) => {
        let { url, files, params } = options;
        let boundaryKey = Math.random().toString(16);
        let separateFlag = '\r\n--' + boundaryKey + '\r\n';
        let endFlag = '\r\n--' + boundaryKey + '--';

        let req = http.request(Object.assign({ method: 'POST' }, UrlParse('http://' + host + ':' + port + apiRoot + url)), (res) => {
            var data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', () => {
                console.log('recv:', data);
                resolve(data);
            });
        });

        let totalFileSize = 0;
        let forms = [];
        let content = '';
        let totalContent = '';

        for (let name in params) {
            content = separateFlag;
            content += 'Content-Disposition: form-data; name="' + name + '" \r\n\r\n' + params[name];
            totalContent += content;
            forms.push({ content });
        }

        for (let field in files) {
            files[field].forEach((file) => {
                var filePath = path.normalize(file);
                var fileName = path.basename(filePath);
                var fileSize = fs.statSync(filePath).size;

                content = separateFlag;
                content += 'Content-Type: application/octet-stream\r\n';
                content += 'Content-Disposition: form-data; name="' + field + '"; filename="' + fileName + '"\r\n' + 'Content-Transfer-Encoding: binary\r\n\r\n';

                totalFileSize += fileSize;
                totalContent += content;

                forms.push({ content, filePath, fileSize });
            });
        }

        req.setHeader('Content-Type', 'multipart/form-data; boundary="' + boundaryKey + '"');
        req.setHeader('Content-Length', totalFileSize + Buffer.byteLength(totalContent) + Buffer.byteLength(endFlag));

        uploadForm(req, forms, 0, endFlag);
    });
}

// API
module.exports = upload;
