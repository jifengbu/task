import { mutation } from 'relatejs';

export function createTaskType (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                createTaskType: { success: 1, msg: 1, context },
            },
            variables: {
                createTaskType: {
                    data: {
                        value: data,
                        type: 'taskTypeInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.createTaskType);
        })(dispatch, getState);
    };
}
export function modifyTaskType (data, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                modifyTaskType: { success: 1, msg: 1, context },
            },
            variables: {
                modifyTaskType: {
                    data: {
                        value: data,
                        type: 'taskTypeInputType!',
                    },
                },
            },
        }, (result) => {
            callback(result.modifyTaskType);
        })(dispatch, getState);
    };
}
export function removeTaskType (taskTypeId, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                removeTaskType: { success: 1, msg: 1 },
            },
            variables: {
                removeTaskType: {
                    taskTypeId: {
                        value: taskTypeId,
                        type: 'ID!',
                    },
                },
            },
        }, (result) => {
            callback(result.removeTaskType);
        })(dispatch, getState);
    };
}
