import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Statistics from './components';

export default class StatisticsContainer extends React.Component {
    render () {
        return (
            <Statistics {...this.props} />
        );
    }
}
