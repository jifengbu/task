import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { partmentType } from '../../types/partment';
import { post, urls } from 'helpers/api';

const partmentsType = new GraphQLObjectType({
    name: 'partmentsType',
    fields: {
        count: { type: GraphQLInt },
        partmentList: { type: new GraphQLList(partmentType) },
    },
});

export default {
    type: partmentsType,
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
        let ret = await post(urls.partments, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
