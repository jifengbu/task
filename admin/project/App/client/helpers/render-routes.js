import configureStore from 'helpers/configure-store';
import createHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default function renderRoutes (routes) {
    const state = window.__initialState;
    state.router = undefined;
    const store = configureStore(
        reduxReactRouter({ createHistory, routes }),
        state
    );
    const muiTheme = getMuiTheme({ userAgent: navigator.userAgent });

    render(
        <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
                <ReduxRouter routes={routes} />
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('view')
    );
}
