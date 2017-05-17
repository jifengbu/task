import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
} from 'graphql';

export default function (name, contextType) {
    const base = {
        success: { type: GraphQLBoolean },
        msg: { type: GraphQLString },
    };
    const fields = contextType ? { ...base, context: { type: contextType } } : base;
    return new GraphQLObjectType({ name, fields });
}

export const successType = new GraphQLObjectType({
    name: 'successType',
    fields: {
        success: { type: GraphQLBoolean },
        msg: { type: GraphQLString },
    },
});
