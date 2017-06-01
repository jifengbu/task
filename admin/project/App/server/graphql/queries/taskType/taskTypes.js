import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authorize } from '../../authorize';
import { taskTypeType } from '../../types/taskType';
import { post, urls } from 'helpers/api';

const taskTypesType = new GraphQLObjectType({
    name: 'taskTypesType',
    fields: {
        taskTypeList: { type: new GraphQLList(taskTypeType) },
    },
});

export default {
    type: taskTypesType,
    async resolve (root, params, options) {
        authorize(root);
        let ret = await post(urls.taskTypes, params, root) || {};
        return ret.success ? ret.context : {};
    },
};
