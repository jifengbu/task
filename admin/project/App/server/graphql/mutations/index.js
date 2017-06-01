import * as user from './user';
import * as partment from './partment';
import * as client from './client';
import * as taskType from './taskType';

export default {
    ...user,
    ...partment,
    ...client,
    ...taskType,
};
