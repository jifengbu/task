import {
    GraphQLString,
} from 'graphql';
import { successType } from '../../types/result';
import { post, urls } from 'helpers/api';

export default {
    type: successType,
    args: {
        shopId: {
            type: GraphQLString,
        },
        reason: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        return await post(urls.refusePublishCardApply, params, root) || { msg: '服务器错误' };
    },
};
