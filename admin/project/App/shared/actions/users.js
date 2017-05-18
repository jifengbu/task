import { notification } from 'ant-design';
import { apiQuery, apiMutation } from 'relatejs';

export function register (data, callback) {
    return (dispatch, getState) => {
        return apiMutation({
            fragments: {
                register: { success: 1, msg: 1 },
            },
            variables: {
                register: {
                    data: {
                        value: data,
                        type: 'userRegisterType!',
                    },
                },
            },
        }, (result) => {
            callback(result.register);
        })(dispatch, getState);
    };
}
export function login (phone, password, callback) {
    return (dispatch, getState) => {
        return apiQuery({
            fragments: {
                login: { success: 1, msg: 1 },
            },
            variables: {
                login: {
                    phone: {
                        value: phone,
                        type: 'String!',
                    },
                    password: {
                        value: password,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.login);
        })(dispatch, getState);
    };
}
export function forgotPwd (phone, email, callback) {
    return (dispatch, getState) => {
        return apiQuery({
            fragments: {
                forgotPwd: { success: 1, msg: 1 },
            },
            variables: {
                forgotPwd: {
                    phone: {
                        value: phone,
                        type: 'String!',
                    },
                    email: {
                        value: email,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.forgotPwd);
        })(dispatch, getState);
    };
}
export function feedback (content, email, callback) {
    return (dispatch, getState) => {
        return apiMutation({
            fragments: {
                feedback: { success: 1, msg: 1 },
            },
            variables: {
                feedback: {
                    content: {
                        value: content,
                        type: 'String!',
                    },
                    email: {
                        value: email,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.feedback);
        })(dispatch, getState);
    };
}
