import React from 'react';
import { Route, IndexRoute } from 'react-router';
import request from 'superagent';
import Admin from 'screens/admin';
import Home from 'screens/admin/screens/home';
import Partments from 'screens/admin/screens/partments';
import PartmentDetail from 'screens/admin/screens/partments/screens/detail';
import Clients from 'screens/admin/screens/clients';
import ClientDetail from 'screens/admin/screens/clients/screens/detail';
import Statistics from 'screens/admin/screens/statistics';
import Feedback from 'screens/admin/screens/feedback';
import TaskType from 'screens/admin/screens/tasktype';
import Notify from 'screens/admin/screens/notify';

let firstEntry = true;

function authenticate (nextState, replaceState, callback) {
    if (typeof window !== 'undefined' && !firstEntry) {
        request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            query: 'query { session }',
        })
        .end((error, result) => {
            if (error || !result.body.data.session) {
                window.location.href = '/admin/login';
            } else {
                callback();
            }
        });
    } else {
        firstEntry = false;
        callback();
    }
}

export default [
    <Route name='admin' path='/admin' component={Admin}>
        <IndexRoute component={Home} onEnter={authenticate} />
        <Route name='adminPartments' path='partments'>
            <IndexRoute component={Partments} onEnter={authenticate} />
            <Route name='adminPartmentDetail' path='detail' component={PartmentDetail} onEnter={authenticate} />
        </Route>
        <Route name='adminClients' path='clients'>
            <IndexRoute component={Clients} onEnter={authenticate} />
            <Route name='adminClientDetail' path='detail' component={ClientDetail} onEnter={authenticate} />
        </Route>
        <Route name='adminTaskType' path='tasktype' component={TaskType} onEnter={authenticate} />
        <Route name='adminStatistics' path='statistics' component={Statistics} onEnter={authenticate} />
        <Route name='adminFeedback' path='feedback' component={Feedback} onEnter={authenticate} />
    </Route>,
];
