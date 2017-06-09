import { ClientModel } from '../../../../models';
import _ from 'lodash';

function authenticatePassword (user, password) {
    return new Promise((resolve) => {
        user.authenticate(password, (err, thisModel, error) => {
            if (error) {
                resolve(error);
            }
            resolve();
        });
    });
}

export default async (io, socket, {
    phone,password
}) => {
    console.log("========", phone, password);
    var user = await ClientModel.findOne({ phone });
    if (!user) {
        socket && socket.emit('LOGIN_RS', { success: false, msg: '该电话号码没有注册'});
    } else {
        if (password!=null) {
            let error = await authenticatePassword(user, password);
            if (error) {
                socket.emit('LOGIN_RS', { success: false, msg: '密码错误' });
                return;
            }
        }
        const userId = user.id.toString();
        const oldSocket = _.find(io.sockets.sockets, (s) => s.userId === userId);
        // console.log("oldSocket",oldSocket,io.sockets.sockets);
        console.log('phone',phone);
        if (!oldSocket) {
            socket.userId = userId;
            console.log('connection', socket.userId);
            socket.emit('LOGIN_RS', { success: true, userId});
        } else {
            socket.emit('LOGIN_RS', { success: false, msg: '该账户已经在别的地方登录'})
        }
    }
};
