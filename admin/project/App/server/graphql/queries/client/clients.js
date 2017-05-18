import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { clientType } from '../../types/client';
import { post, urls } from 'helpers/api';

const clientsType = new GraphQLObjectType({
    name: 'clientsType',
    fields: {
        count: { type: GraphQLInt },
        clientList: { type: new GraphQLList(clientType) },
    },
});

export default {
    type: clientsType,
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
        let ret = await post(urls.clients, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
