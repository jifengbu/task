import {
    GraphQLID,
} from 'graphql';
import { authorize } from '../../authorize';
import { clientType } from '../../types/client';
import { post, urls } from 'helpers/api';

export default {
    type: clientType,
    args: {
        clientId: {
            type: GraphQLID,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.client, params, root) || {};
        return ret.success ? ret.context : undefined;
    },
};
