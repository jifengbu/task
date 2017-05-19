import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import result from '../../types/result';
import { clientInputType, clientType } from '../../types/client';
import { post, urls } from 'helpers/api';

export default {
    type: result('modifyClientType', clientType),
    args: {
        data: {
            type: clientInputType,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        return await post(urls.modifyClient, params.data, root) || { msg: '服务器错误' };
    },
};
