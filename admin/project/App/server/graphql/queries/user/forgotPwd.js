import {
    GraphQLString,
} from 'graphql';
import { successType } from '../../types/result';
import { post, urls } from 'helpers/api';

export default {
    type: successType,
    args: {
        phone: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        return await post(urls.forgotPwd, params) || { msg: '服务器错误' };
    },
};
