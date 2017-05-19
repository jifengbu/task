import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} from 'graphql';

export const clientType = new GraphQLObjectType({
    name: 'clientType',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        head: { type: GraphQLString },
        reservePhone: { type: new GraphQLList(GraphQLString) },
    },
});

export const clientInputType = new GraphQLInputObjectType({
    name: 'clientInputType',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        head: { type: GraphQLString },
        reservePhone: { type: new GraphQLList(GraphQLString) },
    },
});
