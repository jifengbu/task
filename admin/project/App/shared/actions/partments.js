import { mutation } from 'relatejs';

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
