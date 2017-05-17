import {
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import { reportedShopType } from '../../types/shop';
import { post, urls } from 'helpers/api';

export default {
    type: reportedShopType,
    args: {
        shopId: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.reportedShop, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
