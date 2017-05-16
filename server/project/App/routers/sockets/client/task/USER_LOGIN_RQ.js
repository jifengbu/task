import { ClientModel } from '../../../../models';
import { getMediaId } from '../../../../utils';

export default async (app, socket, {
    username,
    password,
}) => {
    console.log("=======", username, password);
    socket.emit('USER_LOGIN_RS', { username, password });
};
