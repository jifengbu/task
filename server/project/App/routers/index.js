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

function registerPostRouter (root, posts, io) {
    _.map(posts, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerPostRouter(url, func, io);
        } else {
            // console.log('register:', url);
            router.post(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await func(req.body, {file: req.file, io});
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result);
                    if (typeof result === 'number') {
                        res.sendStatus(result);
                    } else {
                        res.send(result);
                    }
                } else {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await DEBUG(func, req.body, {file: req.file, io});
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

function registerGetRouter (root, gets, io) {
    _.map(gets, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerGetRouter(url, func, io);
        } else {
            // console.log('register:', url);
            router.get(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.query);
                    let result = await func(req.query, { io });
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
                    let result = await DEBUG(func, req.query, { io });
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
    const io = socket_io(server, {path: root+'/socket'});
    io.emitTo = (users, msg, data) => {
        console.log('io.emitTo:', users, msg, data);
        if (users) {
            users = _.isArray(users) ? users: [users];
            _.uniqBy(_.filter(users), (o)=>o.toString()).forEach((userId)=>{
                const socket = _.find(io.sockets.sockets, (s)=>s.userId==userId);
                socket && socket.emit(msg, data);
            });
        } else {
            io.emit(msg, data);
        }
    };
    io.on('connection', (socket) => {
        socket.userId = socket.handshake.query.userId;
        console.log('connection', socket.userId);
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
