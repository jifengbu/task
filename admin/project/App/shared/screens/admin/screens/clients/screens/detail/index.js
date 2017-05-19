import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as clientActions from 'actions/clients';
import { notification } from 'ant-design';
import ClientDetail from './components';

@dataConnect(
    (state) => {
        const { operType, clientId, record, clients } = state.router.location.state || state.router.location.query;
        return { operType: operType * 1, clientId, record, clients, keepLastKeepData: true };
    },
    (dispatch) => ({
        actions : bindActionCreators(clientActions, dispatch),
    }),
    (props) => {
        return {
            manualLoad: !!props.client || !props.clientId,
            fragments: ClientDetail.fragments,
            variablesTypes: {
                client: {
                    clientId: 'ID!',
                },
            },
            initialVariables: {
                client: {
                    clientId: props.clientId,
                },
            },
            mutations: {
                removeClient ({ state, data, _ }) {
                    if (data.success) {
                        props.clients.count--;
                        _.remove(props.clients.clientList, (item) => item.id === props.clientId);
                    }
                },
                modifyClient ({ state, data }) {
                    if (data.success) {
                        const { client } = state;
                        Object.assign(props.record, data.context);
                        Object.assign(client, data.context);
                    }
                },
            },
        };
    }
)
export default class ClientDetailContainer extends React.Component {
    render () {
        return (
            <ClientDetail {...this.props} />
        );
    }
}
