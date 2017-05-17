import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import { successType } from '../../types/result';
import { post, urls } from 'helpers/api';

export default {
    type: successType,
    args: {
        content: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        return await post(urls.feedback, params, root) || { msg: '服务器错误' };
    },
};
