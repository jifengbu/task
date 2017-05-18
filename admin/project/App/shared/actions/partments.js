import { mutation } from 'relatejs';

export function createPartment (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                createPartment: { success: 1, msg: 1, context },
            },
            variables: {
                createPartment: {
                    data: {
                        value: data,
                        type: 'partmentInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.createPartment);
        })(dispatch, getState);
    };
}
export function modifyPartment (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                modifyPartment: { success: 1, msg: 1, context },
            },
            variables: {
                modifyPartment: {
                    data: {
                        value: data,
                        type: 'partmentInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.modifyPartment);
        })(dispatch, getState);
    };
}
export function removePartment (partmentId, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                removePartment: { success: 1, msg: 1 },
            },
            variables: {
                removePartment: {
                    partmentId: {
                        value: partmentId,
                        type: 'ID!',
                    },
                },
            },
        }, (result) => {
            callback(result.removePartment);
        })(dispatch, getState);
    };
}
