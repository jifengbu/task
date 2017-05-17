import {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
} from 'graphql';
import result from '../../types/result';
import { post, urls } from 'helpers/api';

const alarmLevelType = new GraphQLObjectType({
    name: 'alarmLevelType',
    fields: {
        alarmLevel: { type: GraphQLInt },
    },
});

export default {
    type: result('updateShopAlarmLevelType', alarmLevelType),
    args: {
        shopId: {
            type: GraphQLString,
        },
        alarmLevel: {
            type: GraphQLInt,
        },
    },
    async resolve (root, params, options) {
        return await post(urls.updateShopAlarmLevel, params, root) || { msg: '服务器错误' };
    },
};
