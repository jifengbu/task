import { ClientModel } from '../../../../models';
import _ from 'lodash';

export default async (io, socket, {
    userId
}) => {
    for (var s in io.sockets.sockets) {
        if (io.sockets.sockets.hasOwnProperty(s)) {
            console.log('...',s,io.sockets.sockets[s].userId);
            if (io.sockets.sockets[s].userId == userId) {
                io.sockets.sockets[s].userId = null;
            }
        }
    }
    const oldSocket = _.find(io.sockets.sockets, (s) => s.userId == userId);
    if (oldSocket==undefined) {
        socket.emit('LOGOUT_RS', { success: true, userId});
    } else {
        socket.emit('LOGOUT_RS', { success: false, msg: '退出登录失败'})
    }
};
