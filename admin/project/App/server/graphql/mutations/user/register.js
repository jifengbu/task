import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import { successType } from '../../types/result';
import { post, urls } from 'helpers/api';

export const userRegisterType = new GraphQLInputObjectType({
    name: 'userRegisterType',
    fields: {
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

export default {
    type: successType,
    args: {
        data: {
            type: userRegisterType,
        },
    },
    async resolve (root, params, options) {
        return await post(urls.register, params.data) || { msg: '服务器错误' };
    },
};
