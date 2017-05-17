import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { post, urls } from 'helpers/api';

const personalContextType = new GraphQLObjectType({
    name: 'personalContextType',
    fields: {
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        sign: { type: GraphQLString },
    },
});

export default {
    type: personalContextType,
    args: {
        phone: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        let personal = await post(urls.personal, params, root) || {};
        return personal.context || {};
    },
};
