import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'actions/users';
import ForgotPwd from './components';

@connect(
    (state) => ({ states: state.users }),
    (dispatch) => ({
        actions : bindActionCreators(userActions, dispatch),
    }),
)
export default class ForgotPwdContainer extends React.Component {
    render () {
        return (
            <ForgotPwd {...this.props} />
        );
    }
}
