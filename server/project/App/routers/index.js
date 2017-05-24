import { Router } from 'express';
import posts from './posts';
import gets from './gets';
import sockets from './sockets';
import socket_io from 'socket.io';
import _ from 'lodash';
import { timeout, apiRoot } from '../../config';

const router = new Router();
const LOG_FILTERS = [];

async function DEBUG (func, ...params) {
    try {
        return await func(...params);
    } catch (e) {
        console.log(e);
    }
}

function registerPostRouter (root, posts, socket) {
    _.map(posts, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerPostRouter(url, func, socket);
        } else {
            // console.log('register:', url);
            router.post(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await func(req.body, {file: req.file, socket});
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result);
                    if (typeof result === 'number') {
                        res.sendStatus(result);
                    } else {
                        res.send(result);
                    }
                } else {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await DEBUG(func, req.body, {file: req.file, socket});
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result);
                    setTimeout(() => {
                        if (typeof result === 'number') {
                            res.sendStatus(result);
                        } else {
                            res.send(result);
                        }
                    }, timeout);
                }
            });
        }
    });
}

function registerGetRouter (root, gets, socket) {
    _.map(gets, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerGetRouter(url, func, socket);
        } else {
            // console.log('register:', url);
            router.get(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.query);
                    let result = await func(req.query, { socket });
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result.readable ? 'image' : result);
                    if (result.readable) {
                        result.pipe(res);
                    } else if (typeof result === 'number') {
                        res.sendStatus(result);
                    } else {
                        res.send(result);
                    }
                } else {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.query);
                    let result = await DEBUG(func, req.query, { socket });
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result.readable ? 'image' : result);
                    setTimeout(() => {
                        if (result.readable) {
                            result.pipe(res);
                        } else if (typeof result === 'number') {
                            res.sendStatus(result);
                        } else {
                            res.send(result);
                        }
                    }, timeout);
                }
            });
        }
    });
}

function registerSocketRouter (server, root, sockets) {
    const io = socket_io(server);
    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('disconnect', () => {
            console.log('socket disconnect');
        });
        _.map(sockets, (func, api) => {
            socket.on(api, (data) => {
                func(io, socket, data);
            });
        });
    });
    return io;
}

export default function(server) {
    const io = registerSocketRouter(server, apiRoot, sockets);
    registerPostRouter(apiRoot, posts, io);
    registerGetRouter(apiRoot, gets, io);
    return router;
}
