import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import { clientType } from './client';

export const partmentType = new GraphQLObjectType({
    name: 'partmentType',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
        descript: { type: GraphQLString },
        phoneList: { type: GraphQLString },
        chargeMan: { type: clientType },
        members: { type: new GraphQLList(clientType) },
        membersNum: { type: GraphQLInt },
        superior: { type: partmentType },
        subors: { type: new GraphQLList(partmentType) },
        suborsNum: { type: GraphQLInt },
    },
});
