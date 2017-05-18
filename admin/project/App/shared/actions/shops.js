import { mutation } from 'relatejs';

export function acceptPublishCardApply (shopId, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                acceptPublishCardApply: { success: 1, msg: 1 },
            },
            variables: {
                acceptPublishCardApply: {
                    shopId: {
                        value: shopId,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.acceptPublishCardApply);
        })(dispatch, getState);
    };
}
export function refusePublishCardApply (shopId, reason, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                refusePublishCardApply: { success: 1, msg: 1 },
            },
            variables: {
                refusePublishCardApply: {
                    shopId: {
                        value: shopId,
                        type: 'String!',
                    },
                    reason: {
                        value: reason,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.refusePublishCardApply);
        })(dispatch, getState);
    };
}
export function updateShopAlarmLevel (shopId, alarmLevel, context, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                updateShopAlarmLevel: { success: 1, msg: 1, context },
            },
            variables: {
                updateShopAlarmLevel: {
                    shopId: {
                        value: shopId,
                        type: 'String!',
                    },
                    alarmLevel: {
                        value: alarmLevel,
                        type: 'Int!',
                    },
                },
            },
        }, (result) => {
            callback(result.updateShopAlarmLevel);
        })(dispatch, getState);
    };
}

export function accepRemoveAlarmApply (shopId, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                acceptRemoveAlarmApply: { success: 1, msg: 1 },
            },
            variables: {
                acceptRemoveAlarmApply: {
                    shopId: {
                        value: shopId,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.acceptRemoveAlarmApply);
        })(dispatch, getState);
    };
}
export function refuseRemoveAlarmApply (shopId, reason, callback) {
    return (dispatch, getState) => {
        return mutation({
            fragments: {
                refuseRemoveAlarmApply: { success: 1, msg: 1 },
            },
            variables: {
                refuseRemoveAlarmApply: {
                    shopId: {
                        value: shopId,
                        type: 'String!',
                    },
                    reason: {
                        value: reason,
                        type: 'String!',
                    },
                },
            },
        }, (result) => {
            callback(result.refuseRemoveAlarmApply);
        })(dispatch, getState);
    };
}
