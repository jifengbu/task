import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import http from 'http';
import path from 'path';
import fs from 'fs';

import config from '../config';
import routers from './routers';

const storage = {
    _handleFile (req, file, cb) {
        const { originalname, stream } = file;
        const writestream = mongoose.gfs.createWriteStream({
            filename: originalname,
        }).on('close', (grid) => {
            cb(null, { grid });
        }).on('error', cb);

        stream.pipe(writestream);
    },
    _removeFile (req, file, cb) {
        if (file.grid) {
            mongoose.gfs.remove({ _id: file.grid._id }, cb);
        } else {
            cb(null);
        }
    },
};

const app = express();
// Multer
app.use(multer({
    storage,
    limits: {
        fileSize: 100000000,
    },
    onFileSizeLimit: function (file) {
        mongoose.gfs.remove({ _id: file.id });
    },
}).single('file'));

// Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 100000000 }));

// Static files
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('download')));

// Routers
const server = http.Server(app);
app.use(routers(server));


export default server;
