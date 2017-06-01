import * as user from './user';
import * as client from './client';
import * as partment from './partment';
import * as taskType from './taskType';

export default {
    ...user,
    ...client,
    ...partment,
    ...taskType,
};
