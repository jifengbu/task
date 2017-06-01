import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import { notification } from 'ant-design';
import { needLoadPage } from 'helpers/utils';
import _ from 'lodash';
import SelectClient from './components';

@dataConnect(
    (state) => ({ states: state.clients, pageSize: 10, keepLastKeepData: true }),
    (dispatch) => ({}),
    (props) => ({
        fragments: SelectClient.fragments,
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
export default class SelectClientContainer extends React.Component {
    refresh (keyword) {
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
                    notification.error({ description: '没有相关路线' });
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
            <SelectClient {...this.props}
                refresh={::this.refresh}
                loadListPage={::this.loadListPage} />
        );
    }
}
