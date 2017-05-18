import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'actions/users';
import Feedback from './components';

@connect(
    null,
    (dispatch) => ({
        actions : bindActionCreators(userActions, dispatch),
    }),
)
export default class FeedbackContainer extends React.Component {
    render () {
        return (
            <Feedback {...this.props} />
        );
    }
}
