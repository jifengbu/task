import {
    GraphQLInputObjectType,
    GraphQLString,
} from 'graphql';
import { authorize } from '../../authorize';
import result from '../../types/result';
import { taskTypeInputType, taskTypeType } from '../../types/taskType';
import { post, urls } from 'helpers/api';

export default {
    type: result('createTaskTypeType', taskTypeType),
    args: {
        data: {
            type: taskTypeInputType,
        },
    },
    async resolve (root, params, options) {
        authorize(root);
        return await post(urls.createTaskType, params.data, root) || { msg: '服务器错误' };
    },
};
