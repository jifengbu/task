import {
    GraphQLID,
} from 'graphql';
import { authorize } from '../../authorize';
import { successType } from '../../types/result';
import { post, urls } from 'helpers/api';

export default {
    type: successType,
    args: {
        taskTypeId: {
            type: GraphQLID,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        return await post(urls.removeTaskType, params, root) || { msg: '服务器错误' };
    },
};
