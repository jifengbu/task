import {
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import { shopType } from '../../types/shop';
import { post, urls } from 'helpers/api';

export default {
    type: shopType,
    args: {
        shopId: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.applyPublishCardShop, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
