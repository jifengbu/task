import request from 'superagent';
import _ from 'lodash';
import Q from 'q';


function omitAll(obj) {
    if (_.isPlainObject(obj)) {
        return _.mapValues(obj, (o)=>omitAll(o));
    } else if (_.isArray(obj)) {
        return _.map(obj, (o)=> omitAll(o));
    } else if (obj === null) {
        return undefined;
    }
    return obj;
}

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
                const data = omitAll(res.body)
                console.log('[relatejs]: body', data);
                const { errors } = data;
                if (errors && errors.length && _.find(errors, (item) => (item.message === 'unauthorized'))) {
                    window.location.href = '/admin/login';
                } else {
                    deferred.resolve(data);
                }
            }
        });

        if (dispatch) {
            console.log('[relatejs]: start dispatch');
            promise = promise.then(({ data, errors }) => {
                console.log('[relatejs]: dispatch', { type, data, errors, ...params });
                dispatch({ type, data, errors, ...params });
                return data;
            });
        }

        return promise;
    });
}
