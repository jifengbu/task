import {
    GraphQLString,
} from 'graphql';
import passport from 'passport';
import { successType } from '../../types/result';

export default {
    type: successType,
    args: {
        phone: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
    },
    async resolve (root, params, options) {
        return new Promise((resolve) => {
            const { req } = root;
            req.body = params;
            console.log('[login]: start', params);
            passport.authenticate('local', (err, user) => {
                console.log('[login]: authenticate', err, user);
                if (err) {
                    resolve({ msg: err.message });
                } else {
                    req.logIn(user, (error) => {
                        console.log('[login] logIn:', error);
                        if (error) {
                            resolve({ msg: '服务器错误' });
                        } else {
                            resolve({ success: true });
                        }
                    });
                }
            })(req);
        });
    },
};
