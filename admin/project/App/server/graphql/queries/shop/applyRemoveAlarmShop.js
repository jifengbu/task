import {
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import { applyRemoveAlarmShopType } from '../../types/shop';
import { post, urls } from 'helpers/api';

export default {
    type: applyRemoveAlarmShopType,
    args: {
        shopId: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.applyRemoveAlarmShop, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
