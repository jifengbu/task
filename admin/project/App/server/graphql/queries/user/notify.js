import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { post, urls } from 'helpers/api';

const newsType = new GraphQLObjectType({
    name: 'newsType',
    fields: {
        title: { type: GraphQLString },
        time: { type: GraphQLString },
        source: { type: GraphQLString },
    },
});

const newsListType = new GraphQLObjectType({
    name: 'newsListType',
    fields: {
        count: { type: GraphQLInt },
        list: { type: new GraphQLList(newsType) },
    },
});

const notifyType = new GraphQLObjectType({
    name: 'notifyType',
    fields: {
        news: { type: newsListType },
        publicity: { type: newsListType },
        policy: { type: newsListType },
        notice: { type: newsListType },
    },
});

export default {
    type: notifyType,
    args: {
        type: {
            type: GraphQLString,
        },
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
        let ret = await post(urls.notify, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
