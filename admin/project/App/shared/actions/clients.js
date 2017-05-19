import { mutation } from 'relatejs';

export function createClient (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                createClient: { success: 1, msg: 1, context },
            },
            variables: {
                createClient: {
                    data: {
                        value: data,
                        type: 'clientInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.createClient);
        })(dispatch, getState);
    };
}
export function modifyClient (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                modifyClient: { success: 1, msg: 1, context },
            },
            variables: {
                modifyClient: {
                    data: {
                        value: data,
                        type: 'clientInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.modifyClient);
        })(dispatch, getState);
    };
}
export function removeClient (clientId, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                removeClient: { success: 1, msg: 1 },
            },
            variables: {
                removeClient: {
                    clientId: {
                        value: clientId,
                        type: 'ID!',
                    },
                },
            },
        }, (result) => {
            callback(result.removeClient);
        })(dispatch, getState);
    };
}
