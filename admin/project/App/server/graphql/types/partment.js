import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} from 'graphql';

import { clientType } from './client';

const simplePartmentType = new GraphQLObjectType({
    name: 'simplePartmentType',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
    },
});

const innerPartmentType = new GraphQLObjectType({
    name: 'innerPartmentType',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
        descript: { type: GraphQLString },
        phoneList: { type: new GraphQLList(GraphQLString) },
        chargeMan: { type: clientType },
        members: { type: new GraphQLList(clientType) },
        membersNum: { type: GraphQLInt },
        superior: { type: simplePartmentType },
        subors: { type: new GraphQLList(simplePartmentType) },
        suborsNum: { type: GraphQLInt },
    },
});

export const partmentType = new GraphQLObjectType({
    name: 'partmentType',
    fields: {
        id: { type: GraphQLID },
        name:  { type: GraphQLString },
        descript: { type: GraphQLString },
        phoneList: { type: new GraphQLList(GraphQLString) },
        chargeMan: { type: clientType },
        members: { type: new GraphQLList(clientType) },
        membersNum: { type: GraphQLInt },
        superior: { type: innerPartmentType },
        subors: { type: new GraphQLList(innerPartmentType) },
        suborsNum: { type: GraphQLInt },
    },
});

export const partmentInputType = new GraphQLInputObjectType({
    name: 'partmentInputType',
    fields: {
        partmentId: { type: GraphQLID },
        name:  { type: GraphQLString },
        descript: { type: GraphQLString },
        phoneList: { type: new GraphQLList(GraphQLString) },
        chargeMan: { type: GraphQLID },
        superior: { type: GraphQLID },
        members: { type: new GraphQLList(GraphQLID) },
        subors: { type: new GraphQLList(GraphQLID) },
    },
});
