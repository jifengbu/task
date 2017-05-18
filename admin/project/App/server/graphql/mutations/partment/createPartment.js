import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import result from '../../types/result';
import { partmentInputType, partmentType } from '../../types/partment';
import { post, urls } from 'helpers/api';

export default {
    type: result('createPartmentType', partmentType),
    args: {
        data: {
            type: partmentInputType,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        return await post(urls.createPartment, params.data, root) || { msg: '服务器错误' };
    },
};
