import { ClientModel } from '../../../../models';
import { getMediaId } from '../../../../utils';

export default async (app, socket, {
    username,
    password,
}) => {
    console.log('=======', username, password);
    socket.emit('TEST_RS', { username, password });
};
