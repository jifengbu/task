import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import { notification } from 'ant-design';
import { needLoadPage } from 'helpers/utils';
import _ from 'lodash';
import SelectPartment from './components';

@dataConnect(
    (state) => ({ states: state.partments, pageSize: 3, keepLastKeepData: true }),
    (dispatch) => ({}),
    (props) => ({
        fragments: SelectPartment.fragments,
        variablesTypes: {
            partments: {
                pageNo: 'Int!',
                pageSize: 'Int!',
                keyword: 'String!',
            },
        },
        initialVariables: {
            partments: {
                pageNo: 0,
                pageSize: props.pageSize,
                keyword: '',
            },
        },
    })
)
export default class SelectPartmentContainer extends React.Component {
    refresh (keyword) {
        const { relate, pageSize } = this.props;
        relate.refresh({
            variables: {
                partments: {
                    pageNo: 0,
                    pageSize,
                    keyword,
                },
            },
            callback (data) {
                if (!data.partments) {
                    notification.error({ description: '没有相关路线' });
                }
            },
        });
    }
    loadListPage (keyword, pageNo) {
        const { relate, pageSize, partments } = this.props;
        const property = 'partmentList';
        if (needLoadPage(partments, property, pageNo, pageSize)) {
            relate.loadPage({
                variables: {
                    partments: {
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
            <SelectPartment {...this.props}
                refresh={::this.refresh}
                loadListPage={::this.loadListPage} />
        );
    }
}
