import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default (req) => {
    const { store, headers } = req;
    const muiTheme = getMuiTheme({ userAgent: headers['user-agent'] });
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
                <ReduxRouter />
            </Provider>
        </MuiThemeProvider>
    );
};
