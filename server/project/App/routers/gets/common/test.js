import mongoose from 'mongoose';
import _ from 'lodash';
import { MediaModel } from '../../../models';

export default (params, { io }) => {
    return new Promise(async (resolve) => {
            resolve(_.map(io.sockets.sockets, o=>o.userId));
    });
};
