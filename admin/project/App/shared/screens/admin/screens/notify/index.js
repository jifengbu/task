import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import { needLoadPage } from 'helpers/utils';
import Notify from './components';

@dataConnect(
    (state) => {
        const { activeType } = state.router.location.state || { activeType: 'news' };
        return {
            activeType,
            pageSize: 10,
        };
    },
    (dispatch) => ({}),
    (props) => ({
        fragments: Notify.fragments,
        variablesTypes: {
            notify: {
                pageNo: 'Int!',
                pageSize: 'Int!',
                type: 'String!',
                keyword: 'String!',
            },
        },
        initialVariables: {
            notify: {
                pageNo: 0,
                pageSize: props.pageSize,
                type: '',
                keyword: '',
            },
        },
    })
)
export default class NotifyContainer extends React.Component {
    getNotify (keyword = '') {
        const { relate, pageSize } = this.props;
        relate.refresh({
            variables: {
                notify: {
                    pageNo: 0,
                    pageSize,
                    type: '',
                    keyword,
                },
            },
        });
    }
    loadListPage (keyword = '', type, pageNo) {
        const { relate, pageSize, notify } = this.props;
        if (needLoadPage(notify[type], pageNo, pageSize)) {
            relate.loadPage({
                variables: {
                    notify: {
                        pageNo,
                        pageSize,
                        type,
                        keyword,
                    },
                },
                property: type + '.list',
            });
        }
    }
    render () {
        return (
            <Notify {...this.props}
                getNotify={::this.getNotify}
                loadListPage={::this.loadListPage} />
        );
    }
}
