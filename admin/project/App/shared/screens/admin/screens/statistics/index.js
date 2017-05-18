import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shopActions from 'actions/shops';
import Statistics from './components';

// @connect(
//     (state) => ({ states: state.clients }),
//     (dispatch) => ({
//         actions : bindActionCreators(shopActions, dispatch),
//     }),
// )
export default class StatisticsContainer extends React.Component {
    render () {
        return (
            <Statistics {...this.props} />
        );
    }
}
