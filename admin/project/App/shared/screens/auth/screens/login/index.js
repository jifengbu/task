import request from 'superagent';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from 'actions/users';
import Login from './components';

@connect(
    (state) => ({ states: state.users, phone: state.router.location.state ? state.router.location.state.phone : '' }),
    (dispatch) => ({
        actions : bindActionCreators(userActions, dispatch),
    }),
)
export default class LoginContainer extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    };
    render () {
        return (
            <Login {...this.props} />
        );
    }
}
