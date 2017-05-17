import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { shopType } from '../../types/shop';
import { post, urls } from 'helpers/api';

const reportedShopsType = new GraphQLObjectType({
    name: 'reportedShopsType',
    fields: {
        count: { type: GraphQLInt },
        shopList: { type: new GraphQLList(shopType) },
    },
});

export default {
    type: reportedShopsType,
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
        let ret = await post(urls.reportedShops, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
