import { buildQueryAndVariables } from '../helpers/fragments';
import request from '../helpers/request';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export function apiQuery (options, callback) {
    const mutation = buildQueryAndVariables(options.fragments, options.variables, 'query');
    const params = { ...mutation, headers };
    return (dispatch, getState) => {
        return request(params).then(({ data }) => {
            callback(data, dispatch);
        });
    };
}

export function apiMutation (options, callback) {
    const mutation = buildQueryAndVariables(options.fragments, options.variables, 'mutation');
    const params = { ...mutation, headers };
    return (dispatch, getState) => {
        return request(params).then(({ data }) => {
            callback(data, dispatch);
        });
    };
}
