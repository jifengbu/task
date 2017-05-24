import socket_io from 'socket.io';
import _ from 'lodash';
import * as client from './client';

const routes = {
    ...client,
};

export function registerSocket (server) {
    const io = socket_io(server);
    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('disconnect', () => {
            console.log('socket disconnect');
        });
        _.map(routes, (func, api) => {
            socket.on(api, (data) => {
                func(io, socket, data);
            });
        });
    });
}
