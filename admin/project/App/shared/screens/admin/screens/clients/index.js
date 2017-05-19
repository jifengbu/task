import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as clientActions from 'actions/clients';
import { notification } from 'ant-design';
import { needLoadPage } from 'helpers/utils';
import _ from 'lodash';
import Clients from './components';

@dataConnect(
    (state) => ({ pageSize: 3 }),
    (dispatch) => ({
        actions : bindActionCreators(clientActions, dispatch),
    }),
    (props) => ({
        fragments: Clients.fragments,
        variablesTypes: {
            clients: {
                pageNo: 'Int!',
                pageSize: 'Int!',
                keyword: 'String!',
            },
        },
        initialVariables: {
            clients: {
                pageNo: 0,
                pageSize: props.pageSize,
                keyword: '',
            },
        },
    })
)
export default class ClientsContainer extends React.Component {
    getClients (keyword) {
        const { relate, pageSize } = this.props;
        relate.refresh({
            variables: {
                clients: {
                    pageNo: 0,
                    pageSize,
                    keyword,
                },
            },
            callback (data) {
                if (!data.clients) {
                    notification.error({ description: '没有相关货车信息' });
                }
            },
        });
    }
    loadListPage (keyword, pageNo) {
        const { relate, pageSize, clients } = this.props;
        const property = 'clientList';
        if (needLoadPage(clients, property, pageNo, pageSize)) {
            relate.loadPage({
                variables: {
                    clients: {
                        pageNo,
                        pageSize,
                        keyword,
                    },
                },
                property,
            });
        }
    }
    render () {
        return (
            <Clients {...this.props}
                getClients={::this.getClients}
                loadListPage={::this.loadListPage} />
        );
    }
}
