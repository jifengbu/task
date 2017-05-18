import request from 'superagent';
import omitBy from 'lodash/omitBy';
import find from 'lodash/find';
import isNil from 'lodash/isNil';
import Q from 'q';

export default function doRequest ({ dispatch, query, variables, type, endpoint, headers, body, ...params }) {
    console.log('[relatejs]: doRequest', { dispatch, query, variables, type, endpoint, headers, body, ...params });
    return new Q()
    .then(() => {
        const deferred = Q.defer();
        let promise = deferred.promise;
        const dataObj = { query, variables, ...body };
        const payload =
        headers['Content-Type'] === 'text/plain' ?
        JSON.stringify(dataObj) :
        dataObj;

        const req = request
        .post(endpoint || '/graphql')
        .set(headers)
        .send(payload);

        if (params.withCredentials) {
            req.withCredentials();
        }

        req
        .end((error, res) => {
            if (error) {
                console.error('[relatejs]:', res.text);
                deferred.reject(error);
            } else {
                console.log('[relatejs]: body', res.body);
                const { errors } = res.body;
                if (errors && errors.length && find(errors, (item) => (item.message === 'unauthorized'))) {
                    window.location.href = '/admin/login';
                } else {
                    deferred.resolve(res.body);
                }
            }
        });

        if (dispatch) {
            console.log('[relatejs]: start dispatch');
            promise = promise.then(({ data, errors }) => {
                console.log('[relatejs]: dispatch', { type, data, errors, ...params });
                dispatch({ type, data:omitBy(data, isNil), errors, ...params });
                return data;
            });
        }

        return promise;
    });
}
