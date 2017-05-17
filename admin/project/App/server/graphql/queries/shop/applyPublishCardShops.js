import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { shopsType } from '../../types/shop';
import { post, urls } from 'helpers/api';

export default {
    type: shopsType,
    args: {
        keyword: {
            type: GraphQLString,
        },
        pageNo: {
            type: GraphQLInt,
        },
        pageSize: {
            type: GraphQLInt,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.applyPublishCardShops, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
