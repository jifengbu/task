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
        userId: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        head: { type: GraphQLString },
        reservePhone: { type: new GraphQLList(GraphQLString) },
    },
});
