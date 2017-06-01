import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as taskTypeActions from 'actions/taskTypes';
import { notification } from 'ant-design';
import { needLoadPage } from 'helpers/utils';
import _ from 'lodash';
import TaskTypes from './components';

@dataConnect(
    null,
    (dispatch) => ({
        actions : bindActionCreators(taskTypeActions, dispatch),
    }),
    (props) => ({
        fragments: TaskTypes.fragments,
    })
)
export default class TaskTypesContainer extends React.Component {
    render () {
        return (
            <TaskTypes {...this.props} />
        );
    }
}
