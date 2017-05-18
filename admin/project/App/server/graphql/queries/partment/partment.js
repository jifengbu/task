import {
    GraphQLID,
} from 'graphql';
import { authorize } from '../../authorize';
import { partmentType } from '../../types/partment';
import { post, urls } from 'helpers/api';

export default {
    type: partmentType,
    args: {
        partmentId: {
            type: GraphQLID,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.partment, params, root) || {};
        return ret.success ? ret.context : undefined;
    },
};
