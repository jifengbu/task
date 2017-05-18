import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as partmentActions from 'actions/partments';
import { notification } from 'ant-design';
import { needLoadPage } from 'helpers/utils';
import _ from 'lodash';
import Partments from './components';

@dataConnect(
    (state) => ({ pageSize: 3 }),
    (dispatch) => ({
        actions : bindActionCreators(partmentActions, dispatch),
    }),
    (props) => ({
        fragments: Partments.fragments,
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
export default class PartmentsContainer extends React.Component {
    getPartments (keyword) {
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
                    notification.error({ description: '没有相关货车信息' });
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
            <Partments {...this.props}
                getPartments={::this.getPartments}
                loadListPage={::this.loadListPage} />
        );
    }
}
