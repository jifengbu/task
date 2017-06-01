import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} from 'graphql';

export const taskTypeType = new GraphQLObjectType({
    name: 'taskTypeType',
    fields: {
        id: { type: GraphQLID },
        key:  { type: GraphQLInt },
        name:  { type: GraphQLString },
    },
});

export const taskTypeInputType = new GraphQLInputObjectType({
    name: 'taskTypeInputType',
    fields: {
        taskTypeId: { type: GraphQLID },
        key:  { type: GraphQLInt },
        name:  { type: GraphQLString },
    },
});
