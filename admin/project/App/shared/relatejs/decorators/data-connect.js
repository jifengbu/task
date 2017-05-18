import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { generateConnectorId } from '../helpers/connectors-ids';
import getVariables from '../helpers/get-variables';
import hoistStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import forEach from 'lodash/forEach';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import removeConnector from '../actions/remove-connector';
import KeepData from '../store/keep-data';

export default function dataConnect (...args) {
    const { length } = args;
    let getReduxState, getReduxDispatches, getBundle;
    invariant(length, 'Relate: a dataConnect does not have arguments specified');
    if (length === 1) {
        getBundle = args[0];
    } else {
        getReduxState = args[0];
        getReduxDispatches = args[1];
        getBundle = args[2];
    }

    return function wrapWithDataConnect (WrappedComponent) {
        class ConnectData extends Component {
            static propTypes = {
                relateConnectorData: PropTypes.object,
                CONNECTOR_ID: PropTypes.string.isRequired,
            };

            static contextTypes = {
                fetchData: PropTypes.func.isRequired,
                store: PropTypes.any.isRequired,
                relate_ssr: PropTypes.func,
            };

            static defaultProps = {
                relateConnectorData: {},
            };

            static relateIdentifier = 'DATA_CONNECT';

            constructor (props, context) {
                super(props, context);

                this.constructor.displayName = WrappedComponent.name;

                // Relate connector info
                this.relate = {
                    setKeepData: ::this.setKeepData,
                    refresh: ::this.refresh,
                    loadMore: ::this.loadMore,
                    loadPage: ::this.loadPage,
                    variables: {},
                    hasMore: true,
                    pageNo: 0,
                };

                // Set keepData
                if (props.keepData) {
                    this.setKeepData(props.keepData);
                }

                // get bundle
                this.initialBundle = this.processBundle(props);
                if (!props.relateConnectorData || Object.keys(props.relateConnectorData).length === 0) {
                    this.initialHasDataToFetch = !!(
                        this.initialBundle &&
                        !this.initialBundle.manualLoad &&
                        this.hasDataToFetch(this.initialBundle.fragments)
                    );
                    if (this.context.relate_ssr) {
                        this.initialFetchData();
                    }
                    // Set initial state
                    this.state = {
                        loading: this.initialHasDataToFetch,
                        error: false,
                    };
                } else {
                    this.state = {
                        loading: false,
                        error: false,
                    };
                }
            }

            componentWillMount () {
                this.initialFetchData();
            }

            shouldComponentUpdate (nextProps, nextState) {
                return (
                    !this.state.loading ||
                    this.state.loading && !nextState.loading ||
                    this.state.error !== nextState.error
                );
            }

            componentWillUnmount () {
                const { pathname } = this.props.location || {};
                // 如果有保留数据，则不删除 CONNECTOR_ID，否则会删除 CONNECTOR_ID， 同时会删除 keepData
                if (!KeepData.getHasKeepData(pathname)) {
                    this.context.store.dispatch(removeConnector(this.props.CONNECTOR_ID));
                }
            }

            /*
            * 如果进入其他页面需要保留该页面的数据的时候，使用该接口
            * keepData 为需要额外保留的数据，如果没有，使用 setKeepData(true);
            * 需要保留的额外数据的情况
            * relate.setKeepData({ lastSelectIndex: index, lastCurrent: current });
            * 如果想要手动删除 keepData, 使用 setKeepData();
            *
            * 如果想设置一个全局的保留数据，需要在 @dataConnect 里面设置，如下：
            * @dataConnect(
            *    (state, props) => ({ states: state.tests, keepData: false })
            * }
            *
            * 如果不设置pathname，则使用 location.pathname， 只有 IndexRoute 的时候才需要设置
            */
            setKeepData (keepData, pathname) {
                KeepData.update(this.props.location.pathname, keepData, this.props.CONNECTOR_ID, this.context.store, pathname);
            }

            initialFetchData () {
                if (this.initialHasDataToFetch) {
                    this.fetchData({
                        fragments: this.initialBundle.fragments,
                        variables: this.initialBundle.initialVariables,
                        mutations: this.initialBundle.mutations,
                    });
                }
            }

            /* 如果没有设置 property，则取 variables 的键值，如果不需要请求参数的时候使用 property ,需要的时候必须使用 variables
            * 不需要参数的情况
            * relate.refresh({
            *     property: 'personal',
            * });
            *
            * 要参数的情况
            * relate.refresh({
            *     variables: {
            *         clients: {
            *             pageNo: 0,
            *             pageSize,
            *             keyword,
            *         },
            *     },
            * });
            */
            refresh ({ variables, property, callback }) {
                const properties = variables ? keys(variables) : property;
                const bundle = this.processBundle(this.props, variables);

                // Fetch data
                if (bundle) {
                    this.setState({
                        loading: true,
                    }, () => {
                        this.fetchData({
                            fragments: pick(bundle.fragments, properties),
                            variables,
                            mutations: bundle.mutations,
                            callback,
                        });
                    });
                }
            }

            // 适合做上拉加载更多的列表
            loadMore ({ variables, property, callback }) {
                const key = keys(variables)[0];
                const bundle = this.processBundle(this.props, variables);
                // Fetch data
                if (bundle && !this.lock) {
                    this.lock = true;
                    this.setState({
                        loading: true,
                        loadingMore: true,
                    }, () => {
                        this.fetchData({
                            fragments: pick(bundle.fragments, key),
                            variables,
                            mutations: bundle.mutations,
                            loadingMoreProperty: property || true,
                            callback,
                        });
                    });
                }
            }

            // 适合做分页的表格
            loadPage ({ variables, property, callback }) {
                const key = keys(variables)[0];
                const bundle = this.processBundle(this.props, variables);
                const { pageNo, pageSize } = variables[key];
                // Fetch data
                if (bundle && !this.lock) {
                    this.lock = true;
                    this.setState({
                        loadingPage: true,
                    }, () => {
                        this.fetchData({
                            fragments: pick(bundle.fragments, key),
                            variables,
                            mutations: bundle.mutations,
                            loadingPageProperty: property || true,
                            loadingPageStartIndex: pageNo * pageSize,
                            callback,
                        });
                    });
                }
            }

            hasDataToFetch (fragments) {
                return typeof fragments === 'object' && Object.keys(fragments).length > 0;
            }

            processBundle (props, variables) {
                const bundle = getBundle && getBundle(props);

                this.variablesTypes = bundle && bundle.variablesTypes || {};
                this.relate.variables = variables || bundle && bundle.initialVariables || {};

                return bundle;
            }

            fetchData ({ fragments, variables, mutations, loadingMoreProperty = false, loadingPageProperty = false, loadingPageStartIndex = 0, callback }) {
                console.log('[relatejs] fetchData:', { fragments, variables, mutations, loadingMoreProperty, loadingPageProperty, loadingPageStartIndex });
                const { fetchData } = this.context;

                if (fetchData && this.hasDataToFetch(fragments)) {
                    const fetchOptions = {
                        fragments,
                        variables: getVariables({
                            variables,
                            variablesTypes: this.variablesTypes,
                            fragments,
                            displayName: typeof WrappedComponent !== 'undefined' && WrappedComponent.displayName,
                        }),
                        ID: this.props.CONNECTOR_ID,
                        mutations,
                        loadingMoreProperty,
                        loadingPageProperty,
                        loadingPageStartIndex,
                    };
                    if (this.context.relate_ssr) {
                        fetchData(fetchOptions);
                    } else {
                        fetchData(fetchOptions)
                        .then((data) => {
                            callback && callback(data);
                            const { loadingMore } = this.state;
                            if (loadingMoreProperty && loadingMore) {
                                const key = keys(variables)[0];
                                const { pageNo, pageSize } = variables[key];
                                const item = (loadingMoreProperty === true) ? data[key] : data[key][loadingMoreProperty];
                                if (item) {
                                    this.relate.hasMore = item.length >= pageSize;
                                    this.relate.pageNo = pageNo;
                                }
                            }

                            this.setState({
                                loading: false,
                                loadingMore: false,
                                loadingPage: false,
                                error: false,
                            });

                            this.lock = false;
                        })
                        .catch(() => {
                            this.setState({
                                loading: false,
                                loadingMore: false,
                                loadingPage: false,
                                error: true,
                            });
                        });
                    }
                } else {
                    if (!this.context.relate_ssr) {
                        this.setState({
                            loading: false,
                            loadingMore: false,
                            loadingPage: false,
                            error: false,
                        });
                    }
                }
            }

            render () {
                const { relateConnectorData, ...otherProps } = this.props;
                const { loading, loadingMore, loadingPage } = this.state;
                return (
                    <WrappedComponent
                        {...otherProps}
                        {...relateConnectorData}
                        relate={this.relate}
                        loading={loading}
                        loadingMore={loadingMore}
                        loadingPage={loadingPage}
                        />
                );
            }
        }

        const Connected = connect(
            () => function map (state, props) {
                const { pathname } = props.location || {};
                const refuxProps = getReduxState && getReduxState(state, props) || {};
                const keepData = KeepData.get(pathname, refuxProps);
                if (!this.CONNECTOR_ID) {
                    this.CONNECTOR_ID = keepData.connectorId;
                }
                if (!this.CONNECTOR_ID) {
                    if (state.relateReducer.server) {
                        const finalProps = Object.assign({}, props, refuxProps);
                        const initialBundle = getBundle(finalProps);
                        const thisCompare = {
                            fragments: initialBundle.fragments,
                            variables: getVariables({
                                variables: initialBundle.initialVariables,
                                variablesTypes: initialBundle.variablesTypes,
                                fragments: initialBundle.fragments,
                            }),
                        };

                        forEach(state.relateReducer.server, (compare, id) => {
                            if (isEqual(compare, thisCompare)) {
                                this.CONNECTOR_ID = id;
                                return false;
                            }
                            return true;
                        });

                        if (!this.CONNECTOR_ID) {
                            this.CONNECTOR_ID = generateConnectorId();
                        }
                    } else {
                        this.CONNECTOR_ID = generateConnectorId();
                    }
                }
                return Object.assign(
                    refuxProps,
                    {
                        relateConnectorData: state.relateReducer[this.CONNECTOR_ID],
                        CONNECTOR_ID: this.CONNECTOR_ID,
                    },
                    keepData.data,
                );
            },
            (dispatch) => Object.assign(
                getReduxDispatches && getReduxDispatches(dispatch) || {},
                {
                    removeConnector: dispatch(removeConnector),
                }
            )
        )(ConnectData);

        return hoistStatics(Connected, WrappedComponent, {
            relateIdentifier: true,
        });
    };
}
