import { Router } from 'express';
import posts from './posts';
import gets from './gets';
import _ from 'lodash';
import { timeout, apiRoot } from '../../config';

const router = new Router();
const LOG_FILTERS = [];

async function DEBUG (func, ...params) {
    try {
        return await func(...params);
    } catch (e) {
        console.log(e);
    }
}

function registerPostRouter (root, posts) {
    _.map(posts, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerPostRouter(url, func);
        } else {
            // console.log('register:', url);
            router.post(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await func(req.body, req.file);
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result);
                    if (typeof result === 'number') {
                        res.sendStatus(result);
                    } else {
                        res.send(result);
                    }
                } else {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.body, req.file || '');
                    let result = await DEBUG(func, req.body, req.file);
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result);
                    setTimeout(() => {
                        if (typeof result === 'number') {
                            res.sendStatus(result);
                        } else {
                            res.send(result);
                        }
                    }, timeout);
                }
            });
        }
    });
}

function registerGetRouter (root, gets) {
    _.map(gets, (func, api) => {
        const url = root + '/' + api;
        if (typeof func === 'object') {
            registerGetRouter(url, func);
        } else {
            // console.log('register:', url);
            router.get(url, async (req, res) => {
                if (process.env.NODE_ENV === 'production') {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.query);
                    let result = await func(req.query);
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result.readable ? 'image' : result);
                    if (result.readable) {
                        result.pipe(res);
                    } else if (typeof result === 'number') {
                        res.sendStatus(result);
                    } else {
                        res.send(result);
                    }
                } else {
                    _.includes(LOG_FILTERS, api) || console.log(url + ' recv:', req.query);
                    // let result = await func(req.query);
                    let result = await DEBUG(func, req.query);
                    _.includes(LOG_FILTERS, api) || console.log(url + ' send:', result.readable ? 'image' : result);
                    setTimeout(() => {
                        if (result.readable) {
                            result.pipe(res);
                        } else if (typeof result === 'number') {
                            res.sendStatus(result);
                        } else {
                            res.send(result);
                        }
                    }, timeout);
                }
            });
        }
    });
}

registerPostRouter(apiRoot, posts);
registerGetRouter(apiRoot, gets);

export default router;
