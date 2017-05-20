import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} from 'graphql';

const simpleClientType = new GraphQLObjectType({
    name: 'simpleClientType',
    fields: {
        id: { type: GraphQLID },
        phone: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        head: { type: GraphQLString },
    },
});

const simplePartmentType = new GraphQLObjectType({
    name: 'simplePartmentTypeForClient',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
    },
});

const partmentType = new GraphQLObjectType({
    name: 'partmentTypeForClient',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
        descript: { type: GraphQLString },
        phoneList: { type: new GraphQLList(GraphQLString) },
        chargeMan: { type: simpleClientType },
        membersNum: { type: GraphQLInt },
        superior: { type: simplePartmentType },
        suborsNum: { type: GraphQLInt },
    },
});

export const clientType = new GraphQLObjectType({
    name: 'clientType',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        head: { type: GraphQLString },
        age: { type: GraphQLInt },
        sex: { type: GraphQLInt },
        birthday: { type: GraphQLString },
        reservePhone: { type: new GraphQLList(GraphQLString) },
        partment: { type: partmentType},
    },
});

export const clientInputType = new GraphQLInputObjectType({
    name: 'clientInputType',
    fields: {
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        partment: { type: GraphQLID },
    },
});
