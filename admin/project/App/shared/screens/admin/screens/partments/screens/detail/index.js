import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as partmentActions from 'actions/partments';
import { notification } from 'ant-design';
import PartmentDetail from './components';

@dataConnect(
    (state) => {
        const { operType, partmentId, record, partments } = state.router.location.state || state.router.location.query;
        return { operType: operType * 1, partmentId, record, partments, keepLastKeepData: true };
    },
    (dispatch) => ({
        actions : bindActionCreators(partmentActions, dispatch),
    }),
    (props) => {
        return {
            manualLoad: !!props.partment || !props.partmentId,
            fragments: PartmentDetail.fragments,
            variablesTypes: {
                partment: {
                    partmentId: 'ID!',
                },
            },
            initialVariables: {
                partment: {
                    partmentId: props.partmentId,
                },
            },
            mutations: {
                removePartment ({ state, data, _ }) {
                    if (data.success) {
                        props.partments.count--;
                        _.remove(props.partments.partmentList, (item) => item.id === props.partmentId);
                    }
                },
                modifyPartment ({ state, data }) {
                    if (data.success) {
                        const { partment } = state;
                        Object.assign(props.record, data.context);
                        Object.assign(partment, data.context);
                    }
                },
            },
        };
    }
)
export default class PartmentDetailContainer extends React.Component {
    render () {
        return (
            <PartmentDetail {...this.props} />
        );
    }
}
