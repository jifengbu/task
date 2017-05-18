import serialize from 'serialize-javascript';
import Html from 'components/html';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function getMarkup (req, res) {
    const { store, headers } = req;
    const state = store.getState();
    const initialState = serialize(state);
    const muiTheme = getMuiTheme({ userAgent: headers['user-agent'] });

    const markup = renderToString(
        <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
                <ReduxRouter />
            </Provider>
        </MuiThemeProvider>
    );

    const htmlMarkup = renderToString(
        <Html
            body={markup}
            props={initialState}
            locals={res.locals}
            />
    );

    return htmlMarkup;
}
